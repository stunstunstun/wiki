---
title: Spring Loaded로 로컬 개발환경 개선하기
date: 2015-05-29 15:14:40
desc: 예제 중심의 Spring Boot 시작하기
categories: spring-boot
---

Spring Boot을 통해 개발 초기에 복잡한 프로젝트의 초기 설정의 지옥에서 벗어날 수 있다는 사실을 알았습니다. 이번에는 로컬의 개발환경에 대해 살펴보려고 합니다.

Java를 통해 개발한 웹 애플리케이션은 소스코드의 수정내역을 반영할 때마다 Tomcat과 같은 WAS를 재시작할 수 밖에 없는데요, 이 과정은 Spring Boot의 간편하게 개발하자!라는 철학에서 벗어나게 됩니다.

Spring Boot과 함께 Spring Loaded를 사용하면 이 문제에서 벗어날 수가 있습니다.

## 컨테이너의 재시작없이 Java 클래스를 재로드하기

Spring Loaded를 사용하면 자바 클래스 파일을 변경해도 Tomcat과 같은 컨테이너 재시작없이 수정한 코드의 변경내역을 반영할 수 있습니다. 이런 문제에서 벗어나기 위해서 JRebel과 같은 유료 솔루션을 사용하는 개발자들도 있을 정도죠.

#### spring-loaded
>https://github.com/spring-projects/spring-loaded

이와 같은 기능은 `Hot Swapping`이라고 하는데 아래의 Reference를 통해 더욱 자세히 확인할수 있습니다.

> http://docs.spring.io/spring-boot/docs/current/reference/html/howto-hotswapping.html


#### Hot Swapping을 통해 재시작없이 반영 가능한 범위는 아래와 같습니다

- Reload Java Classes
- Reload Freemarker Templates
- Reload Thymeleaf
- Reload Groovy Templates
- Reload Static Resources

## spring-loaded를 프로젝트에 적용하기

#### Maven에서 설정하기

`pom.xml`의 Spring Boot 플러그인내에 spring-loaded를 추가합니다.

```
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>springloaded</artifactId>
            <version>1.2.5.RELEASE</version>
        </dependency>
    </dependencies>
</plugin>
```

#### IntelliJ IDEA와 Gradle에서 설정하기

Spring Loaded는 IntelliJ IDEA와 Gradle환경에서 더 효과적으로 작동합니다. `build.gradle`에 spring-loaded를 추가하고 idea 플러그인을 아래와 같이 설정합니다.

```xml
buildscript {
    repositories { 
        jcenter() 
    }
    dependencies {
        classpath 'org.springframework.boot:spring-boot-gradle-plugin:1.5.3.RELEASE'
        classpath 'org.springframework:springloaded:1.2.5.RELEASE'
    }
}

apply plugin: 'idea'
 
idea {
    module {
        inheritOutputDirs = false
        outputDir = file("$buildDir/classes/main/")
    }
}
```


## 테스트

IntelliJ IDEA에서 Gradle 프로젝트를 통해 테스트 해보겠습니다. 먼저 Gradle Task를 통해 아래와 같이 Spring Boot 애플리케이션을 실행합니다.

```
$ gradle my-app:bootRun
```

#### 테스트를 위한 Controller를 아래와 같다고 합니다.

```java
@RestController
public class ExampleController {
 
    @RequestMapping("/example-page")
    public String index() {
        return "Hello World!";
    }
}
```

#### Browser에서 아래와 같이 접속해 보았습니다.

```
GET http://localhost:8080/example-page
```

#### Browser에서는 아래와 같이 출력이 됩니다.

```
Hello World!
```

### 이번에는 spring-loaded 테스트를 위해 Java 클래스를 수정하고 Compile 합니다.

```java
@RestController
public class ExampleController {
 
    @RequestMapping("/example-page")
    public String index() {
        return "Hello World With Spring Loaded!";
    }
}
```

> Compile을 IDE에서 자동으로 하기 위해서는 Build Automatically를 체크하거나 STS 메뉴에서 Project - Build All 또는 Project - Build Project를 선택합니다.

#### Tomcat의 재시작 없이 아래와 같이 컴파일된 변경내역이 반영되는 것을 확인하였습니다 

```
Hello World With Spring Loaded!
```

#### References

> http://docs.spring.io/spring-boot/docs/current/reference/html/howto-hotswapping.html
http://blog.netgloo.com/2014/05/21/hot-swapping-in-spring-boot-with-eclipse-sts/



