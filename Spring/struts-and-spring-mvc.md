---
title: Struts와 Spring MVC의 Controller 클래스의 차이는?
date: 2012-01-12 15:14:40
desc: Struts에서 Spring MVC로 이동하기
categories: spring-framework
---

Struts 2를 이용해 Controller 클래스를 구성할 때에는 Controller 클래스의 생명주기가 prototype으로 생성되어 요청에 대한 각 Thread별로 메모리의 Heap공간에 객체를 동적으로 할당하는 것으로 알고 있습니다.

이로 인해 요청이 올때 마다 메모리에 대한 부담이 클것이라고 생각했는데, Spring MVC의 Controller 클래스는 테스트 도중 singleton 클래스로 생성되는 것을 서비스 운영중에 발견하게 되었습니다. 해서 Contoller를 구성하는데 이 두가지 방식에 차이가 있지 않을까 라는 궁금증이 생겼습니다.

지금껏 알고 있던 웹 애플리케이션의 Contoller 클래스는 HTTP 요청시 마다 쓰레드별로 Heap 공간에 객체를 생성하여 쓰레드 Safe하게 작동되고 있다라고 생각했는데 Spring MVC에서의 Controller는 클래스는 Singleton이라니..

## Controller 클래스가 Singleton 일때 고려해야 할 점

Spring MVC를 통해 Controller 클래스를 관리해야 한다면 가장 주의해야 할 점이 있습니다. 단일 객체가 여러 요청에 대한 각 Thread에게 제공되기 때문에 Thread Safe하지 않다는 것입니다. 이 말은 많은 요청이 일어나는 경우 예상치 못한 상태가 사용자에게 전달되는 경우가 생길수도 있다는 의미 입니다.

#### 그렇다면 Controller 객체내의 상태 관리를 어떻게 해야 할까요?

Spring MVC의 Controller 클래스는 아래와 같은 기준을 두고 관리하는 것이 좋습니다.

- 생성되는 인스턴스 내에 공유되는 상태가 없는 경우
- 생성되는 인스턴스 내에 read-only 상태만 있는 경우
- 생성되는 인스턴스 내에 공유되는 상태가 있더라도 상태를 변경할 때 동기화를 보장 할 수 있는 경우

#### Spring의 singetone 인스턴스

Spring에서 지원하는 singleton 인스턴스는 Non EJB 아키텍쳐에서 많이 사용한 singleton 디자인 패턴을 이용하여 구현하는 것이 아니라 어플리케이션 저장소(Registry)를 이용하여 구현하는 방식을 이용하고 있다고 합니다.

Spring에서 Registry 역할을 하는 클래스는 ApplicationContext 이고, singleton 인스턴스로 관리되는 모든 POJO기반의 Bean 클래스는 ApplicationContext내에 있는 HashMap에 Key & Value 로 저장해 두기 때문에 bean에 접근하고자 할때에는 HashMap에서 등록된 bean 인스턴스를 얻게 되는 것이지요.

> singleton 디자인 패턴의 문제점에 대한 자세한 내용은 http://wiki.javajigi.net/pages/viewpage.action?pageId=527&decorator=printable 에 잘 정리되 있습니다.
