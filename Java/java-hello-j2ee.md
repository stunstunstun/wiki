---
title: 웹 개발을 위한 프레임워크는 어떻게 탄생하였는가?
date: 2012-12-18 00:49:31
categories: java
---

현재 Java 기반으로 JSP & Servlet 을 통해 웹 개발을 하는 경우는 일반적이라고 할 수 있다. 하지만 브라우져 또는 다른 클라이언트의 HTTP 요청을 Servlet Container를 통해 어떠한 방식으로 처리되고 이러한 과정을 통해 요청한 브라우져에 응답을 주게되는지 이해를 정확하게 하지 못하는 경우가 많다고 생각한다. 

이러한 현상에 대한 가장 큰 이유는 Servelt 기반의 웹개발을 하는데 있어 Struts / Spring / Play Framework 와 같은 웹개발을 하는데 있어 개발 효율성을 높여주는 프레임워크의 사용에 대한 부작용도 있다고 생각한다. 

이러한 프레임워크가 어떤 기술을 기반으로 탄생 했으며, 어떠한 과정을 통해 필요로 하게 되었는가 라는 질문 없이, 프레임워크 사용에 대한 학습이 주가 되어 웹개발을 하다보면 정작 기본적으로 알아야 되는 부분을 놓치기 쉬울 수 있다고 생각 한다.

일단 이러한 생각이 들어 급하게나마 간단하게 정리를 해보면 어떨까 싶었다.

![servlet](https://docs.google.com/drawings/d/sn-k1pLA-Z1wX-ZD_1gcp5g/image?w=403&h=206&rev=1&ac=1)

#### 서블릿

정적인 웹에 동적으로 컨텐츠를 생성하고 싶다! 라는 호기심에 시작되었을 것이다.

사용자는 데이터를 입력하기 위한 폼을 통해 전송 버튼을 누른다. 그리고 나서 웹서버는 고민에 빠진다~ 어떠하라구(?) 나중에 이 데이터를 사용하려면 파일이던 데이터베이스 던가 어딘가에 저장을 해야 하는데 난 그런거 못하는데.. "이때 웹서버는 도우미 어플리케이션에 SOS 요청을 하게 된다.

Servlet은 위와 같은 역할을 하기 위한 도우미 어플리케이션 이라고 보면 된다.

 - CGI : 1 process per request 
 - Servlet : 1 thread per request

#### Servlet 만을 사용해 보니(...)

- Java 코딩은 편합니다.
- HTML을 작성하기 매우 불편합니다.
- 페이지 또는 기능 단위에 매번 ServletMapping 을 추가하는 것 이 불편합니다.


#### JSP을 사용해보면 어떨까요 ? 

![](https://lh6.googleusercontent.com/PwaYGFymrNkaHtg7g4urVL4-NwsLCgo22UwEhZg6lw4owpRHWmo4JmDyG6yO_RRg2G0l77rOFVXDlad6IrvjQg_hzcKohzOko66iiSXnMREGJx7iYPopM2-WrQ)

- HTML 화면을 쉽게 작성 할 수 있다. 
- web.xml 에 servlet 을 등록하지 않아도 된다.
- Java 코딩이 힘들다!


#### Servlet 과 JSP를 같이 사용해 볼까요? (Model 2)

 
`Servlet Class`

![](https://lh4.googleusercontent.com/q1xdmJ1_6GlJcVKEkohi5Auy6vtzfXu3UCXeqxApZX4O-0CafPOg7LaBQdVXa0KEgox4uoBA-2cxPTCU3Mqr2dntQryfgiaTGiExiJKBqTVETF3LalU-p0lA2w)


`JSP`

![](https://lh6.googleusercontent.com/AvHm5d_zE6lQrfG69I8_2ys1TSXKDNGCDOLWBaqkEKzjcAoB7vEPENpLk9PnUJXEy8bDYK_uneCzkHl3ju3-NqQkS-g_q-pwkN0iD4ZEnrKpZcd5afLpKZ8dbQ)



#### Model2를 사용해보니 (...)


- Servlet으로 Java 코딩이 편하다
- JSP를 이용해 HTML 화면 구현이 용이하다.

#### 자 이렇게 MVC Pattern 이 되었습니다.

- Model ( Java Bean ) - 아직 출현 안했어요 ( Spring  bean을 생각하시면 됩니다. )
- View ( JSP )
- Controller ( Servlet ) 

비지니스 로직과 프리젠테이션의 분리!

![](https://docs.google.com/drawings/d/sG7W8eN8lRAE9AsBUjTDHrw/image?w=345&h=235&rev=1&ac=1)

#### 정말 이것으로 충분 한가?

- Servlet 을 실행하기 전에 공통적인 전/후 처리를 추가 하고 싶다.
- Servlet 클래스 너무 많다. Controller 하나로 모든 요청을 처리 할 수 없을까?
- 요청에 대한 처리가 끝나고 보여줄 뷰를 조금 더 편하게 제공 할 수 없을까?
- 응답에 대한 contentType을 html 이외에 xml 이나 json 형태로 손쉽게 변환 할 수 없을까?
- 예외처리를 좀 더 손쉽게 할수 없을까?
- 테스트를 좀 더 손쉽게 할수 없을까? 


## J2EE 패턴


#### 전/후 처리가 필요하다면?

Decoration Filter 패턴 - 기존 코드를 수정하지 않고 부가 기능을 추가

![](https://docs.google.com/drawings/d/s7twb8b1oUparyH0-rqlbGQ/image?w=522&h=114&rev=1&ac=1)


`Servlet Filter 를 사용해 보니`

- Servlet 클래스 내의 코드를 수정하지 않고, 부가기능을 추가 할 수 있어 좋다.
- 하나의 Filter 를 여러 URL 에 추가가 가능 하다.
- web.xml 매번 설정하는 것이 번거롭다.
- init() destroy()를 매번 구현하는 것이 번거 롭다.


#### 컨트롤러 하나로 모든 요청을 처리하고 싶다면 ?

Front Controller 패턴 ( 1:1 -> 1:N per page ) - 일관된 뷰 관리, 네비게이션 , 요청 처리 기능을 한 곳으로 모을 수 있다. 

![](https://docs.google.com/drawings/d/sDFGzUDfeJtwCE3Eyn4BAFA/image?w=503&h=160&rev=1&ac=1)


#### 뷰를 보다 손쉽게 제공하고 싶다면 ?

Dispatcher View 패턴 - 뷰를 사용할 리소스 를 관리하고 찾아주는 매커니즘을 제공한다.

![](https://docs.google.com/drawings/d/sr1D9NNt0brjvVIl1AUQJEw/image?w=570&h=186&rev=1&ac=1)


## Hello Framework 

위의 내용을 바탕으로 간단한 웹프레임워크를 만들어 보자.

![](https://lh3.googleusercontent.com/ylXkcplJjj6Ld6uFaTirSSWNlet3rDmiDPnIZXB-JaEux_aYykPYGJjglElv0VOZZqFMzrMHCbJBmZfEygvVf57lFaMoov8-b2nX3NaTMQO5sGLVuFaQItbuGw)

- 요청을 처리할 Handler Controller를 찾아 실행한다. 
- Handler가 반환하는 문자열을 찾아 view를 제공

#### Hello Framework가 부족한 점

 - Handler Mapping 로직을 변경 할 수 없다.
 - Handler (Controller ) 를 여러 형태로 만들 수 없다.
 - 예외 처리 로직을 제공하지 않는다.
 - 뷰를 찾는 로직을 변경 할 수 없다.

![](https://lh3.googleusercontent.com/768Rd3TvsmJgPy2Aa8cgP5_IrI-FMVQ4WZEd-o0h0ZvIMMh2-GPUGrNzPV0WXjDGh7wknRXyWSvM1pADUFyyiCEmmxFNkQ-cATPV_qAJymY7_uuyZCG8gzmSNw)


#### Spring MVC

 - 현존 하는 가장 유연한 프레임워크
 - Handler Mapping 로직을 변경 할 수 있다.
 - Hander (Controller) 를 여러 형태로 만들 수 있다. 
 - 다양한 예외처리 로직을 제공 한다.
 - View를 찾는 로직을 변경 할 수 있다.


`Dispatcher Servlet`

![](https://lh5.googleusercontent.com/W0rQUvhcG0URB2RcdV0LFxovZ42UDOhxJna0adeHkhRzlnRLo6rRUGW3lRbS55rFbbDY9O2jlDMDNp8YpXUguICkh8Ju9utqc1MUilcKvbHzOhsYowP8tWjVmg)


#### prototype vs singleton
  
Struts2 를 이용해 Controller 를 구성할때는 해당 Controller가 prototype 으로 생성되 각 쓰레드별로 Heap 메모리에 객체를 동적으로 생성하게 됩니다.

반면, Spring MVC 의  Controller는 singleton으로 생성되는 것을 알게 되었는데, 그렇다면 Contoller를 구성하는데 이 두가지 방식에 차이가 있지 않을까 라는 궁금증이 생겼습니다.

Struts 에서의 Contoller 라는 녀석은 요청시마다 쓰레드별로 heap메모리에 객체를 생성해, 쓰레드 Safe한 상태라고 생각했는데 Spring MVC에서의 contoller는 singleton이기 때문에, Controller 에 선언되는 변수는 thread safe 하지 못합니다. 

스프링의 singleton은...

Spring 에서 지원하는 singleton 인스턴스는 Non EJB 아키텍쳐에서 많이 사용한 singleton 디자인 패턴을 이용하여 구현하는 것이 아니라 어플리케이션 저장소(Registry)를 이용하여 구현하는 방식을 이용하고 있다고 합니다.

Spring에서 Registry 역할을 하는 클래스는 ApplicationContext이고, singleton 인스턴스로 관리되는 모든 POJO빈은 ApplicationContext내에 있는 HashMap에 Key & Value 로 저장해두기때문에 bean에 접근하고자 할때 HashMap에서 bean 인스턴스를 얻게 되기때문에, singleton 디자인 패턴을 이용할 경우 발생되는 문제점을 해결하는 것이 가능하다 라고 합니다.

* singleton 디자인 패턴의 문제점에 대한 자세한 내용은 
- http://wiki.javajigi.net/pages/viewpage.action?pageId=527&decorator=printable  에 잘 정리되 있습니다.

추가적으로 다음과 같은 경우 singleton 인스턴스로 관리 가능합니다.

- 생성되는 인스턴스 내에 공유되는 상태가 없는 경우 
- 생성되는 인스턴스 내에 read-only 상태만 있는 경우
- 생성되는 인스턴스 내에 공유되는 상태가 있더라도 상태를 변경할 때 동기화를 보장 할 수 있는 경우

![](https://lh6.googleusercontent.com/trEDupxF8bTCvk0GwST9Iw4w9WMP9GKLCjE4DmVpVFi0Sl-a1H5KY-MsTe_sSsaNWT_ni3mxZEIXYSuGA6GqnD20i6yv30QnrC4mFPRyE6CWx1E-QWAKGMTCBA)










