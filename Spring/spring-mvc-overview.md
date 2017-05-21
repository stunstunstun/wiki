---
title: Spring MVC 살펴보기
date: 2011-10-11 15:14:40
desc: Struts에서 Spring MVC로 이동하기
categories: spring-framework
---

저는 현재 실무에 갓 투입된 신입 프로그래머인데요, 주로 사내에서 웹 애플리케이션을 개발하면서 아래와 같은 Java 기반의 프레임워크를 사용하고 있습니다. 이 글은 Struts2에서 Spring MVC로 이동하기 위한 짧은 과정을 설명하고 있습니다.

<!--more-->

- Struts 2
- Spring Framework 2.5


`Struts2`는 웹 애플리케이션의 MVC 구조 중에 주로 View, Controller에 해당되는 부분을 담당하며 Java 웹 애플리케이션의 기본이 되는 Servlet의 Context 등을 주로 다루며, HTTP 요청에 대한 URL을 매핑(Mapping) 하는 역할을 합니다. 

`Spring Framework`의 경우에는 애플리케이션의 Model에 해당하는 POJO를 기반으로 비지니스 로직에 필요한 클래스들을 정의하고 이러한 클래스들간의 의존관계를 효율적으로 관리하기 위해 사용합니다. Spring Framework에서는 이러한 목적을 위해서 DI, AOP와 같은 기술들을 제공하고 있습니다.

## Struts 2가 정말 최선일까?

사내에서는 웹 애플리케이션의 Controller 부분을 이미 Struts 2를 통해 개발해오고 있었고, 저 역시 자연스럽게 Struts 2를 사용해오고 있었습니다. HTTP 요청에 대한 Mapping이 Spring MVC에 비해 간결하고 사용하기 쉽다고 알고 있었지만 `Spring Framework 단일 구성으로 개발할 수는 없을까?`라는 의문이 생기게 되었습니다.

거기다 최근에 Spring Framework의 새로운 Version인 3.0이 발표되면서 Controller를 Spring MVC를 사용할 수는 없을까라는  실제로 구현해 보기로 했습니다. 결론적으로 Struts 2에서 Spring MVC로 이식하여 웹 애플리케이션을 구현하였을때 생각했던 것과는 달리 Struts 2에 비해서 큰 불편한 점은 느끼지 못했습니다.


그 이유로는.

- Spring MVC은 Struts 2가 제공하는 있는 주요 기능인 Servelet에 대한 추상화로 시작되는 Request Mapping, Custromized Inteceptor등을 제공하고 있을 뿐만 아니라, 더욱 심플하고 강력한 Validation을 제공합니다.

- Struts 2는 HTTP의 요청 단위마다 `struts.xml`파일에 등록해줘야 되는 번거러움이 있습니다.(와일드카드 맵핑을 통해 어느 정도는 해소 되었지만)

- Spring MVC는 Version 2.5 부터 xml 설정 파일 없이 어노테이션(annotation)기반으로 Controller가 구현이 가능하고 Spring 3.0 부터는 `mvc namespace`를 제공해서 더욱 간편하게 설정이 가능합니다.

mvc namespace에 대한 한가지 예로는 아래와 같이 비지니스 로직이 없는 단순한 정적 페이지를 위해서 Controller 클래스 생성 없이 설정 가능하다는 것 입니다.

```xml
<mvc:view-controller path="/event/thanks" view-name="/event/thanks"/>
```

지금까지 Spring MVC를 통해 직접 구현하고 테스트한 후의 결과는 굳이 Struts2와 같이 다른 Framework를 혼합해서 사용할 필요가 있을까라는 의문이 들기 시작했습니다. 실제로 해외 오픈소스커뮤니티, 국내의 개발 관련 커뮤니티를 상주해 본 결과 Spring을 사용하면서 Contoller단을 Struts 2로 구현하는 경우는 레거시 시스템의 유지보수를 제외하고는 Spring기반의 Maven 프로젝트가 대부분이라고 합니다. 

> Maven이라..공부 할 것이 더욱 늘어나네요.. Maven이라는 도구는 어떠한 계기로 탄생이 되었고, 왜 현재 많이 사용되고 있는지 궁금하네요!


Google Trends 에서도 아래와 같이 Struts 2에 대한 관심은 점점 줄어드는 추세입니다.

<img src='https://lh4.googleusercontent.com/aevOwAQR2iWFGvFUCTiiWDy5nD8SxaP46NyuzeNa8zfSYrnFjGmmOiJAFd8Kz-EnY-riWjg1fH5IW0NOW-zqk1bV-dy7yGwB2Oj0I1a3SvMT-7eqYlTsi61I' />


## SPRING MVC 구현하기

아래의 내용은 제가 실제로 Spring MVC를 통해 간단한 Controller를 구현해 본 결과입니다.

#### DispatcherServlet

<img src='https://lh6.googleusercontent.com/W12x6PhemHrljV76l0mR1Zj90jQd5L7eiFyl47xrVrMkL-ucxa0DvOccmBsR5R7_9tVIofxKFkiuV4RcMGurT_u_O-sGxbR7aSHN1PkXtZ7PwQp-v_0kc5hW' />

Spring MVC는 HTTP Request, Response와 같은 서버-클라이언트간의 상호작용 뿐만 아니라 Controller, View 모델에 대한 동작을 모두 DispatcherServlet이 맨 앞에서 처리하고 있기 때문에 DispatchServlet을 위한 설정이 필요합니다.

**web.xml**

```xml
 <servlet>
  <servlet-name>SpringApplication</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <init-param>
  	<param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/classes/spring/spring-servlet.xml</param-value>
  </init-param>
  <load-on-startup>1</load-on-startup>
 </servlet>
 
 <servlet-mapping>
  <servlet-name>SpringApplication</servlet-name>
  <url-pattern>/</url-pattern>
 </servlet-mapping>
```

Spring MVC는 Struts 2 그리고 템플릿 엔진인 Freemarker와 관련된 설정 없이 DispatcherServlet만 등록하면 MVC 구현이 바로 가능합니다. 

> spring-servlet.xml은 애플리케이션에 필요한 스프링 환경 설정이 포함됩니다.
- 애플리케이션의 Model 식별을 위한 component scan package를 지정
- JSP나 Freemarker로 View를 표현하기 위해 viewResolver 등록
- AOP에 대하 설정
- Constants
- Datasource에 대한 설정


#### ViewResolver 지정

HTTP 요청에 대한 Contoller의 처리 결과를 생성할 view를 지정합니다. view단의 template로 freemarker를 사용하기 위해서 viewResolver를 등록합니다. 

```xml
<context:component-scan base-package="com.jce.api" />

<!-- freemarker config -->
<bean class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
	<property name="defaultEncoding" value="UTF-8"/>
    <property name="templateLoaderPath" value="/template/"/>
</bean>

<bean class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver">
    <property name="contentType" value="text/html; charset-UTF-8"/>
    <property name="suffix" value=".ftl"/>
</bean>

```

### Controller 클래스 생성


```java
@Controller
@RequestMapping(value="/members")
public class MemberController {

    @Autowired
    private MemberService memberService;
    
    @RequestMapping(value="/welcome", method=RequestMethod.GET)
    public void main (Model model) throws Exception {
    	model.add("title", "Hello Spring MVC!");	
    }
}
```
 
> @requestMapping
HTTP 요청에 대한 URL Mapping 을 위한 Java 어노테이션(annotation), 클래스에 지정하면 해당 클래스 메소드에 모두 적용
                               
- value : HTTP 요청 URL                               
- method : 허용 가능한 HTTP Method 지정                     

