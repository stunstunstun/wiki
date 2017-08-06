---
title: 헬로 서블릿
date: 2012-12-17 00:49:31
categories: java
---

Spring Framework에 대한 교육은 웹 개발에 필요한 서블릿으로 시작하려고 한다. 간단하게 정리를 해보는걸로.

## 웹서버 혼자서는 할 수 없는 일

사용자의 브라우저로부터 HTTP 요청이 오기 전까지 존재하지 않았던 페이지를 그 자리에 만들고자 할 경우 즉 아래와 같이 정직인 페이지가 아닌,

```html
<html>
<head></head>
<body>
The current time is 4:20 PM
</body>
</html> 
```

아래와 같이 특정 조건에 따라 페이지의 결과가 달라져야 할 경우를 말한다.

```html
<html>
<head></head>
<body>
The current time is [time on server]
</body>
</html>
```

파일이나 데이터베이스에 데이터를 저장하고자 하는 경우를 생각해보자. 사용자는 데이터를 입력하기 위한 폼을 통해 전송 버튼을 누른다. 그리고 나서 웹서버는 고민에 빠집니다.....

```
"어떠하라구!! 나중에 이 데이터를 사용하려면 파일이던 데이터베이스던 저장을 해야하는데 난 그런거 못하는데.."
```

이때 웹서버는 도우미 어플리케이션에게 SOS 요청을 합니다!

## 도와줘요 서블릿(Servlet)

서블릿은 위와 같은 역할을 하기 위한 도우미 어플리케이션이다.

- CGI는 매 요청 마다 무거운 프로세스를 띄워야 하지만 Servlet 오직 한번만 구동하면 된다.
- Servlet 은 요청이 오면 요청을 처리할 새로운 쓰레드를 생성한다.


#### 서블릿 예제


`Java Servlet Class`
```java

public class HelloServlet extends HttpServelt {

	protected void doGet(HttpServletRequest req, HttpServeltResponse res) throws ServeltException, IOException {
		String htmlContent = "Hello! I'm from sevlet.<br/>Current Time is " + new Date();
		String htmlTemplate = "<html><head></head><body>" + htmlContent + "</body></html>";	
		resp.getWriter().println(htmlTemplate);
	}
}
```

`Configure by XML`
```xml
<welcome-file-list>
    <welcome-file>index.html</welcome-file>
</welcome-file-list>

<servlet>
    <servlet-name>helloServlet</servlet-name>
    <servlet-class>com.jce.servlet.HelloServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>helloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
</servlet-mapping>
```


#### 테스트

브라우저에서 아래의 주소로 서블릿을 통한 HTTP 요청을 해본다.
- http://localhost/HelloServlet/hello

```
Hello! I'm from sevlet.

Current Time is Mon Dec 17 10:28:08 KST 2012
```


#### 그렇다면 서블릿은 누가 관리하나요?


웹 서버에 HTTP를 통한 요청이 들어오면 누군가는 서블릿을 초기화해서 요청을 처리할 쓰레드를 만들고 서블릿의 `doPost()` 또는 `doGet()` 메소드를 호출해야 한다. 여기에 덧붙혀 두 메소드의 인자로서 `HttpServletRequest` 와 `HttpServletResponse` 객체를 누군가 생성해서 서블릿 클래스로 넘겨줘야 할텐데! 

또한 여기에 서블릿이 생성/소멸하는 시점에 자원 관리도 해야 하고 어쩌구..도 해야 하고.. *@#*@#9. 자 여기서 이러한 역할은 컨테이너(J2EE)라는 녀석이 하게 되는 컨테이너와 서블릿간의 흐름 관계를 살펴보도록 하자.


#### Flow

`요청`

클라이언트(브라우져) - 요청(GET) - 웹서버 - (GET) - 컨테이너 - (GET) - 서블릿 

`응답`

클라이언트(브라우져) - 응답 - 웹서버 - 응답 - 컨테이너 - 서블릿


#### 컨테이너가 하는 역할?

- 컨테이너는 서블릿과 웹서버가 서로 통신 할 수 있는 손쉬운 방법을 제공합니다. 다시 말하면, 서버와 대화하기 위해 개발자가 직접 ServerSocket 을 만들고, 특정 포트에 리스닝하고, 연결 요청이 들어 왔을때, stream을 생성하는 등의 복잡한 과정을 할 필요가 없습니다.

- 컨테이너는 서블릿의 생성과 소멸을 관리합니다. 서블릿 Class를 로딩하여 인스턴스화하고, 초기화 메소드를 호출하고, 요청이 들어오면 적절한 Servlet 메소드를 호출하는 일을 컨테이너가 합니다.

- 컨테이너는 요청이 들어올때마다 새로운 자바 쓰레드를 생성합니다. 클라이언트 요청에 따라 적절한 HTTP 서비스 메소드를 실행하면 그것으로 쓰레드의 작업은 끝이 납니다. 개발자가 직접 쓰레드의 안전성에 대하여 고민할 필요가 없습니다.















