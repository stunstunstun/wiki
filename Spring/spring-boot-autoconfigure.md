---
title: Spring Boot의 자동 구성과 주요 기능
date: 2016-12-20 15:14:40
desc: Spring Boot 레시피
categories: spring-boot
---

#### Bean

- 특정 역할을 하는 Bean을 정의하고
- Bean에 필요한 Properties를 정의
- Bean과 Bean간의 의존 관계를 정의

#### Spring Framework가 다이어트가 성공한 이유

`starters`

`org.springframework.boot.autoconfigure`

`default`

그저 애플리케이션에 필요한 Properties를 정의하는 것만으로 무난히 잘 돌아감

#### 단점 예시

- 애플리케이션에서 복수의 Datasource를 운용하고자 할 때

#### References

- https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#using-boot-auto-configuration