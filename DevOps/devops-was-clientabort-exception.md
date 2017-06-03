---
title : Tomcat에서 발생하는 ClientAbortException
date: 2013-01-10 10:14:40
desc : 운영환경에서 발생하는 다양한 이슈들
categories : devops
---

사내에서 운영중인 웹서비스의 로그에서 아래와 같은 Exception이 다량으로 발견되는 것을 확인하였다. 혹시 서비스에 중요한 영향을 미치지 않을까하는 걱정이 앞서 예외가 발생하는 원인을 살펴보았다.

```java
java.lang.Object
  ㄴ java.lang.Throwable
      ㄴ java.lang.Exception
          ㄴ java.io.IOException
             ㄴ org.apache.catalina.connector.ClientAbortException
```

#### org.apache.catalina.connector.ClientAbortException

ClientAbortException은 애플리케이션에서 발생하는 것이 아닌, Tomcat 컨테이너에서 특정 상황에서 발생하는 예외였는데 특이한 부분은 HTTP Request의 Header를 살펴보니 Agent값을 통해 모바일 환경의 클라이언트 요청에서 많이 발생되고 있었다. 아래는 abort는 라는 단어의 뜻인데,

```
abort 미국식 [ə|bɔ:rt] 발음듣기 영국식 [ə|bɔ:t] 발음듣기 예문보기
1. 유산시키다   2. 유산하다   3. (일을) 도중하차하다
```

단어의 의미에서 예외가 발생하는 원인을 유추해볼 수 있었는데, 클라이언트에서 서버로 요청을 한 뒤 응답을 받기전에 요청이 중단되었을 경우 발생 되는 예외라는 것을 확인 할 수 있었다.

실제로 재현해보는 과정이 필요해 보았고 `ClientAbortException`을 발생시키기 위한 재현 시나리오는 아래와 같다.

- 클라이언트에서 서버에 HTTP 요청이 된다
- HTTP 응답을 받기 전에 동일한 클라이언트에서 다시 HTTP 요청을 한다

#### 어떻게 해결해야 할까?

먼저 ClientAbortException은 서버 애플리케이션에서 발생하는 버그가 아니다. 서버 애플리케이션에서는 ClientAbortException을 로그 범위에서 WARN 레벨로 변경하는 것 정도이며, 클라이언트에서 위와 같은 시나리오가 발생되는 것은 정상적인 케이스가 아니기 때문에 클라이언트에서 HTTP 응답을 받기 전에 동일한 HTTP 요청을 하는 것에 대한 Secure 대책이 필요해 보인다.


