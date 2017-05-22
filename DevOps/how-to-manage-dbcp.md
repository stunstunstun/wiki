---
title: DB Connection Pool에 대한 이야기
date: 2013-01-10 10:31:26
desc: DB Connection Pool은 왜 필요할까?
categories: devops
---

웹 애플리케이션을 운영하다 보면 에러 로그로는 식별 할 수 없는 잠재적인 이슈가 발생 할 때가 있다. 애플리케이션내의 오류가 명확히 확인이 되지 않은 상태에서 `Out of memory`가 발생 하거나, DB 서버에서부터 발생한 장애로 인해 웹 서버가 뻗어 버리는 경우 말이다.

실제로 서비스 운영 중에 문제가 발생 했을 때 원인을 파악하고 조치한 내용을 정리해 보려고 한다. 결론부터 말하면 이러한 문제는 대부분 애플리케이션의 비지니스 로직의 오류가 아닌 `WAS와 DB 서버간`의 이슈로 DB Connection Pool에 대한 이해가 필요한 내용이였다.

#### 왜 이러한 문제가 발생하게 될까?

먼저, 웹 어플리케이션을 지탱하는 WAS에서 DB 서버에 접근을 시작하고 데이터를 가져오기까지의 단계에서 가장 비용이 드는 부분이 어디일까? 소스 코드를 보면서 살펴 보자.

```java
String driverPath = "net.sourceforge.jtds.jdbc.Driver";
String address = "jdbc:jtds:sqlserver://IP/DB";
String userName = "user";
String password = "password";
String query = "SELECT ... where id = ?";
try {
 Class.forName(driverPath);
 Connection connection = DriverManager.getConnection(address, userName, password);
 PreparedStatement ps = con.prepareStatement(query);
 ps.setString(1, id);
 ResultSet rs = get.executeQuery();
 // ....
} catch (Exception e) { }
} finally {
 rs.close();
 ps.close();
}
```

위의 예제를 살펴보면 아래와 같다:

1. DB 서버 접속을 위해 JDBC 드라이버를 로드한다.
2. DB 접속 정보와 DriverManager.getConnection() Method를 통해 DB Connection 객체를 얻는다.
3. Connection 객체로 부터 쿼리를 수행하기 위한 PreparedStatement 객체를 받는다.
4. executeQuery를 수행하여 그 결과로 ResultSet 객체를 받아서 데이터를 처리한다.
5. 처리가 완료되면 처리에 사용된 리소스들을 close하여 반환한다.

위의 예제를 통래서 쿼리에 대한 처리 시간이 0.1초가 소요된다면, 어느 부분에서 가장 느릴까? 가장 느린 부분은 웹 서버에서 물리적으로 연결을 해야하는 DB 서버에 최초로 Connection을 맺는 부분이다.

<img src='https://image.toast.com/aaaaahq/was-and-db.png' />

웹 애플리케이션은 HTTP 요청에 따라 Thread를 생성하게 되고 대부분의 비지니스 로직은 DB 서버로 부터 데이터를 얻게 된다. 만약 위와 같이 모든 요청에 대해 DB접속을 위한 Driver를 로드하고 Connection 객체를 생성하여 연결한다면 물리적으로 DB 서버에 지속적으로 접근해야 될 것이다.

이러한 상황에서 DB Connection 객체를 생성하는 부분에 대한 비용과 대기 시간을 줄이고, 네트워크 연결에 대한 부담을 줄일수 있는 방법이 있는데 바로, DBCP(Database Connection Pool)를 이용하면 이러한 문제를 해결할 수가 있다.

#### DBCP?

DBCP(Database Connection Pool)은 HTTP 요청에 매번 위의 `1-5의 단계`를 거치치 않기 위한 방법이다. Connection Pool을 이용하면 다수의 HTTP 요청에 대한 Thread를 효율적으로 처리할 수 있게 된다.

> WAS가 실행 될 때 애플리케이션에서는 Connection Pool 라이브러리를 통해 Connection Pool 구현체를 사용할 수가 있는데, Apache의 Commons DBCP가 오픈소스 라이브러리로 제공되고 있다.
http://commons.apache.org/

Connection Pool의 구현체의 역할은 이렇다:

1. WAS가 실행되면서 미리 일정량의 DB Connection 객체를 생성하고 `Pool` 이라는 공간에 저장해 둔다.
2. HTTP 요청에 따라 필요할 때 Pool에서 Connection 객체를 가져다 쓰고 반환한다.
3. 이와 같은 방식으로 HTTP 요청 마다 DB Driver를 로드하고 물리적인 연결에 의한 Connection 객체를 생성하는 비용이 줄어들게 된다.

<img src='https://docs.oracle.com/cd/B12037_01/appdev.101/b10779/lnoci043.gif' />

더 구체적으로 살펴보자:

Connection Pool를 효율적으로 관리하기 위한 값들이 존재하는데 이러한 값들은 DBCP 구현체를 제공하는 라이브러리를 통해 설정 할 수가 있다.

Value | Description
--|--
maxActive | 동시에 사용할 수 있는 최대 커넥션 개수
maxIdle | Connection Pool에 반납할 때 최대로 유지될 수 있는 커넥션 개수
minIdle | 최소한으로 유지할 커넥션 개수
initialSize | 최초로 getConnection() Method를 통해 커넥션 풀에 채워 넣을 커넥션 개수

아래의 그림을 살펴보면 Pool에 Connection 을 Idle(대기) 상태로 두었다고, 실제 사용하는(Active) 모습인데 DBCP를 관리하기 위한 올바른 설정 값에 대해 살펴 보도록 하자.

<img src='https://lh5.googleusercontent.com/0yuTW7sJhPs3K6fRqg1bYZS74uFQCgDbvwBUKsvLyQdKctq2T2EySjv4C3NST49mDFEI6CzYcu7S0OiNTFgbUc_KjC8XxYRnYlQ0T7-zwaTOm8Fh0VZcPizon7WQUpwejQ' />

#### maxActive >= initialSize

#### maxActive = maxIdle

maxActive 값과 maxIdle 값은 같은 것이 바람직하다. 만약 둘의 값이 아래와 같다고 가정해보자.

```
maxActive = 10
maxIdle = 5
```

항상 커넥션을 동시에 5개는 사용하고 있는 상황에서 1개의 커넥션이 추가로 요청된다면 maxActive = 10이므로 1개의 추가 커넥션을 데이터베이스에 연결한 후 Pool은 비즈니스 로직으로 커넥션을 전달한다. 이후 비즈니스 로직이 커넥션을 사용 후 풀에 반납할 경우, maxIdle=5에 영향을 받아 커넥션을 실제로 닫아버리므로, 일부 커넥션을 매번 생성했다 닫는 비용이 발생할 수 있다.

#### initialSize와 maxActive, maxIdle, minIdle 항목을 동일한 값으로 통일해도 무방하다.

커넥션 개수와 관련된 가장 중요한 성능 요소는 일반적으로 커넥션의 최대 개수다. 4개 항목의 설정 값 차이는 성능을 좌우하는 중요 변수는 아니다.

maxActive 값은 DBMS의 설정과 애플리케이션 서버의 개수, Apache, Tomcat에서 동시에 처리할 수 있는 사용자 수 등을 고려해서 설정해야 한다. DBMS가 수용할 수 있는 커넥션 개수를 확인한 후에 애플리케이션 서버 인스턴스 1개가 사용하기에 적절한 개수를 설정한다. 사용자가 몰려서 커넥션을 많이 사용할 때는 maxActive 값이 충분히 크지 않다면 병목 지점이 될 수 있다. 반대로 사용자가 적어서 사용 중인 커넥션이 많지 않은 시스템에서는 maxActive 값을 지나치게 작게 설정하지 않는 한 성능에 큰 영향이 없다.

Commons DBCP에서는 DBMS에 로그인을 시도하고 있는 커넥션도 사용 중인 것으로 간주한다. 만약 DBMS에 로그인을 시도하고 있는 상태에서 무한으로 대기하고 있다면, 애플리케이션에서 모든 커넥션이 사용 중인 상태가 돼 새로운 요청을 처리하지 못할 수도 있다. 이런 경우 장애 확산을 최소화하려면 Microsoft SQL Server의 JDBC 드라이버에서 설정하는 loginTimeOut 속성같은 JDBC 드라이버별 타임아웃 속성을 설정하는 것이 좋다.

#### WAS의 Thread 수와 Connection Pool 수의 관계

WAS에서 설정해야 하는 값이 굉장히 많지만, 그 중 가장 성능에 많은 영향을 주는 부분은 Thread와 Connection Pool의 개수 이다.

이들 값은 직접적으로 메모리와 관련이 있기 때문에, 많이 사용하면 할 수록 메모리를 많이 점유하게 된다. 그렇다고 반대로 메모리를 위해 적게 지정한다면, 서버에서는 많은 요청을 처리하지 못하고 대기 할 수 밖에 없다.

#### DB Connection Pool 관리 어떻게 하면 좋을까?

가장 좋은 방법은 애플리케이션을 실제 운영할 시스템 환경에서 성능 테스트를 진행하는 것이다. 성능 테스트를 진행하면서 지금까지 살펴본 DBCP에 대한 원리와 설정을 위한 값들을 복기하면서 시스템 환경에 최적화된 값을 찾아 내는 것이 좋겠다.

> 실제 운영중인 서비스에서 DBCP 값이 200에 가까운 수치가 설정되어 있어, 문제가 발생된 경우를 보았다. 무엇보다, WAS Thread 수는 DB Connection Pool의 갯수보다 더 적게 설정 되어 있었는데, 이러한 점을 효율적이지 못하다.

그렇다면, WAS의 Thread의 개수가 DB의 Connection Pool의 갯수 보다 많아야 하는 이유는 무엇일까? 그 이유는 모든 어플리케이션이 DB에 접근하는것이 아니기 때문에 WAS의 Thread는 Connection Pool의 갯수보다 여유있게 설정해두는 것이 좋다.

Connection Pool은 시스템의 환경에 따라 다르지만 보통 40~50개로 지정하면 Thread는 이보다 10개 정도 더 지정하는 것이 바람직하다. 하지만 최적의 성능의 위해서는 실제 요청이 얼마나 들어오는지 파악하는게 중요하며 가장 좋은 방법은 앞서 말한것 처럼 성능 테스트를 통해 최적화된 값을 구하는 것이다.

## References

- https://commons.apache.org/proper/commons-dbcp/
- [자바 성능을 결정 짓는 코딩 습관과 튜닝 이야기](http://www.hanbit.co.kr/store/books/look.php?p_code=B6098766835)
