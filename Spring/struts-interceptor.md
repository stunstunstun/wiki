---
title: Struts 2의 Interceptor의 역할
date: 2012-01-12 22:37:31
categories: spring-framework
---

웹 애플리케이션에 대한 다양한 HTTP Request에 공통적으로 처리 해야하는 관심사가 있을 수 있다.

예를 들면:

0. HTTP Request, Response 객체의 상태를 변경하고자 할 때
1. HTTP 요청에 대해 로그 정보를 남기고 싶을 때
2. 특정 요청에 대해서는 공통적으로 사용자 정보를 체크하고 싶을 때

<img src='https://img.viralpatel.net/2009/12/struts-2-request-cycle.png' />

Struts 2에서는 Controller에서 이와 같이 공통적인 비지니스 로직은 `Interceptor`를 통해 정의 할 수 있다.

## Interceptor의 구현

공통 로직을 처리할 Interceptor는 AbstractInterceptor 클래스를 상속받아 구현한다.

```java
public class RequestInterceptor extends AbstractInterceptor {

 	@Override
 	public String intercept(ActionInvocation invocation) throws Exception {
 		String result = null;

 		HttpServletRequest request = ServletActionContext.getRequest();
 		HttpServletResponse response = ServletActionContext.getResponse();

 		request.setCharacterEncoding("UTF-8");
 		response.setHeader("Cache-Control", "no-cache");
 		response.setHeader("Pragma", "no-cache");
 		response.setHeader("Expires", "0");		

 		result = invocation.invoke();

 		return result;
 	}
}
```

위와 같이 Interceptor 구현 후 아래와 같은 설정 정보를 추가해야 한다.

```xml
<interceptors>
 	<interceptor name="requestInit" class="struts.test.RequestInterceptor"/>	 			
 	<interceptor-stack name="Init">
 			<interceptor-ref name="modelDriven"/>
 			<interceptor-ref name="basicStack"/>
 			<interceptor-ref name="requestInit"/>
 	</interceptor-stack>
</interceptors>
```

`struts-default`를 extends한 사용자 지정 struts package에 위의 interceptor 구문을 넣어줍니다. 사용자가 지정한 각 action에서는 interceptor들의 모임 단위인 interceptor-stack를 실질적으로 사용하게 되는데, 형식은 이렇습니다.

```xml
<package name="main" extends="default" namespace="/main">
      <action name="main"  method="mainAction" class="MainAction">
 		   <result type="freemarker" name="success">/_template/main.ftl</result>
 		   <interceptor-ref name="Init" />
      </action>
</package>
```

모든 action에 공통으로 사용하고 싶다면, 위의 package는 default를 extends 하고 있는데 해당 default package에 아래의 내용을 추가하면 공통으로 사용 가능 합니다.

```xml
<default-interceptor-ref name="Init" />
```

추가적으로, 이렇게 상위에 default라는 이름을 가진 package를 두고 상속받아 사용한다면, interceptor뿐만 아니라 result까지 전역으로 사용가능합니다.

```xml
<package name="default" extends="struts-default">
<global-results >
 	<result type="freemarker" name="login">/common/login.ftl</result>
 	<result type="freemarker" name="error">/common/error.ftl</result>
 	<result type="freemarker" name="traffic">/common/traffic.ftl</result>
  <result type="freemarker" name="json">/common/jsonResponse.ftl</result>
 </global-results>
</package>
```
