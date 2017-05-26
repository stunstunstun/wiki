---
title: Spring MVC에서 ContentNegotiatingViewResolver의 역할
date: 2012-01-29 15:14:40
desc: ContentNegotiatingViewResolver를 통해 다양한 Response 응답 구현하기
categories: spring-framework
---

Spring MVC에서 HTTP 요청(Request)이 발생하면 Controller를 거쳐 비지니스 로직에 따라 적절한 HTTP 응답(Response)을 사용자에게 전달하게 됩니다.

이 때 사용자에게 전달되는 HTTP Response 컨텐츠(Content-Type)의 타입은 기본적인 HTML 페이지부터 JSON 객체를 전달하기 모습일지도 모릅니다. 거기에 웹 브라우져에서 사용하는 API인 경우에는 크로스 도메인에 대처하기 위해 JSONP가 필요할지도 모르겠네요.

예를 들어 아래와 같이 사용자의 정보를 보여주는 URI가 있다고 가정합시다.

```
GET /members/{memberId}
```

동일한 URI를 활용에서 아래와 같이 다양한 Content-Type을 제공해야 하는 상황이구요

Method | URI | 설명
--|--|--
GET | /members/{memberId} | HTML 페이지를 응답합니다
GET | /members/{memberId}.json | JSON 객체로서 응답합니다
GET | /members/{memberId}.jsonp | JSON 객체를 Padding과 함께 응답합니다

#### ContentNegotiatingViewResolver 클래스


`org.springframework.web.servlet.view.ContentNegotiatingViewResolver` 클래스는 위와 같이 하나의 URI를 통해 다양한 contentType 으로 응답을 할 수 있도록 도와줍니다. ContentNegotiatingViewResolver의 사용 방법을 살펴보겠습니다.

먼저 아래와 같이 ContentNegotiatingViewResolver 클래스을 활용한 Bean을 등록합니다.

```xml
<bean class=" org.springframework.web.servlet.view.contentnegotiatingviewresolver">
	    <!-- ViewResolver 우선순위 설정 -->
	    <property name="order" value="1" />
	    <property name="mediaTypes">
	        <!-- 맵핑될 확장자 정의 -->
	        <map>
	            <entry key="json" value="application/json" />
	            <entry key="jsonp" value="javascript/jsonp" />
	        </map>
	    </property>
	    <property name="defaultViews">
	        <list>
	            <!-- JSON 요청을 처리할 뷰 -->
	            <bean class="org.springframework.web.servlet.view.json.MappingJacksonJsonView"/>

	            <!-- JSONP 요청을 처리할 뷰 -->
	            <bean class="com.jce.commons.controller.JSONPView">
	                <property name="contentType" value="javascript/jsonp"/>
	            </bean>
	        </list>
	    </property>
	    <property name="ignoreAcceptHeader" value="true" />
</bean>
```

ContentNegotiatingViewResolver 클래스를 통해 설정 할 수 있는 값들은 아래와 같습니다.

Variables | Description |
--|--
order | Spring MVC에 등록된 View Resolver 중 우선순위
mediaTypes | HTTP Response의 Content-Type의 리스트
defaultViews | Content-Type에 따라 기본으로 제공되는 View 클래스를 지정 할 수 있습니다


#### 새로운 mediaTypes을 정의하기

Spring MVC에서는 mediaType이 `json`이면 MappingJacksonJsonView 클래스를 통해 Response 객체를 처리할 수 있도록 도와줍니다. 하지만 기본적으로 제공하지 않는 mediaType이라면 아래와 같이 AbstractView를 상속받아 새로운 View 클래스를 구현해야 합니다.

mediaType이 jsonp 일 때 처리 할 수 있는 View 클래스를 아래와 같이 구현이 가능합니다.

```java

public class JSONPView extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		String callback = request.getParameter("callback")!=null?request.getParameter("callback"):"?";
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(model);

		response.setContentType("javascript/jsonp");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(callback+"("+json+");");
	}
}
```

#### 테스트를 위한 Controller 구현

```java
@Controller
@RequestMapping("/members")
public class MemberContoller {

	@RequestMapping(value="/{memberId}", method=RequestMethod.GET)
	public Map<String, Object> profile(@PathVariable String memberId) throws Exception {
		Map<String, Object> member = new HashMap<String, Object>();
		member.put("name", "stunstun");
		member.put("level", 10);

        	return member;
	}
}
```

#### 결과

Content-Type이 HTML
```
GET /members/{memberId}
```

```html
stunstun's level is 10
```

Content-Type이 JSON
```
GET /members/{memberId}.json
```
```
{"name":"stunstun", "level":10}
```

Content-Type이 JSONP
```
GET /members/{memberId}.jsonp
```
```
callback({"name":"stunstun", "level":10});
```
