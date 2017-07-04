---
title: 소중한 정보를 지키는 습관 Logging
date: 2016-03-29 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

## Java 진영의 Logger 인터페이스의 역사

#### 클래스에서 직접 사용하기

#### AOP

#### logback과 같은 라이브러리 활용하기

## 로그 정보를 관리하기 위한 유형

#### Console

#### 파일

#### 기타 Appender

## Logger에 대한 오해와 진실

#### Logger의 인스턴스를 static으로 선언하는 것이 유리할까?

```java
private static final Logger logger = LoggerFactory.getLogger(Foo.class);
```

```java
private Logger logger = LoggerFactory.getLogger(Foo.class);
```

#### debug 레벨일 경우 아래와 같은 체크가 필요할까?

```java
if (logger.isDebuggable()) {
	logger.debug("Something");
}
```

#### Logger를 테스트 범위해 포함시켜야 할까?

#### References

> https://www.slf4j.org/docs.html
https://www.facebook.com/tobyilee/posts/10210853744514228
https://github.com/kwon37xi/gradle-tutorial
http://rolf-engelhard.de/2013/03/logging-anti-patterns-part-i/
https://www.javacodegeeks.com/2011/01/10-tips-proper-application-logging.html