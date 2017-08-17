---
title: OpenJDK 적용시 고려해야 할 점
date: 2014-09-24 00:49:31
categories: java
---

Sun(현재 Oracle)이 JDK 7을 개발하기 시작할 때 이전과 다른 점이 하나 있었는데, Sun이 JDK를 오픈소스화 하기 위해 2007년 OpenJDK를 만들었다는 것이다. (OpenJDK는 완전한 Free의 오픈소스 코드를 기반으로 Fully buildable한 Java Development Kit을 배포하기 위한 Sun의 노력이다.)

Sun이 3rd-Party 라이브러리의 저작권자에게 오픈소스로 공개할 수 있도록 설득하고자 했으나 잘되지 않았고, 저작권자가 오픈소스화를 거부한 일부 컴포넌트를 제외한 나머지 JDK 소스코드 전부를 OpenJDK에 제공했고, OpenJDK는 이를 기반으로 이외의 컴포넌트들의 대안 코드를 마련하면서 JDK7 프로젝트를 시작했다.

## Oracle's Plan for OpenJDK

아래는 OpenJDK FAQ (http://openjdk.java.net/faq/) 의 주요 내용을 요약한 내용 이다.

#### Oracle은 OpenJDK에 참여하는가?

Oracle은 OpenJDK 프로젝트를 주도하는 주체이며, 오픈소스모델은 기술적인 발전을 위한 가장 좋은 방법이기 때문에 OpenJDK를 향상시키기 위한 노력을 계속 할 것이다.

#### OpenJDK의 License 모델을 변경될수 있는가?

OpenJDK Community는 지속적으로 Oracle에 의해 운영되며, 뿐만 아니라 이외의 기업, 연구원 또는 개인에 의해 GPL-based 라이센스를 가지며, 변경될 계획은 없다.

#### OpenJDK Users & Contributors

Ubuntu / Fedora / Red Hat Enterprise 와 같은 메이저 리눅스 제공자는 배포시에 OpenJDK를 기본 Java SE 구현체로 제공하고 있다. 추가적으로 Eclipse Community의 2010 설문에서는 개발자의 21%가 OpenJDK를 사용하고 있다고 응답하였다.

## OpenJDK 와 OracleJDK 스펙

#### Oracle JDK는 OpenJDK를 기본으로 하는가?

그렇다. Oracle JDK는 OpenJDK의 JDK7 기반에 추가로 OpenJDK에 포함되지 않은 Component까지 모두 갖춘 프로젝트이다.

아래와 같이 Vendor에 의한 분리된 Version이 존재하는데,

- Oracle's JDK (Commertial support from oracle)
- OpenJDK, the open source java

JDK7 이전에는 두 Version간 큰 차이가 존재해 OpenJDK는 Oracle JDK에 비해 누락된 기능 및 성능이슈가 존재 했으나 현재는 java-web-plugin(http://en.wikipedia.org/wiki/IcedTea - 저작권이 있는 라이브러리의 대안으로 작성된)을 제외하고는 정확하게 같다고 볼 수 있다. 몇몇 사람들은 아직도 OpenJDK가 Oracle JDK에 비해 성능이 떨어진다고 하지만, 이것은 근거없는 말이다.

- 두 Version은 모두 Java SE 7 JSR(JSR 336) 스펙을 동일하게 구현하였다.

#### Dodgy Version History

<img src='http://image.toast.com/aaaaahq/OpenJDK6-genealogy.png' width='400' />

Open JDK7를 사용 한다면 Oracle JDK7와 동일하게 안전하다고 볼 수 있지만, 그에 비해 OpenJDK6은 안정적이지 않는 History가 있는데, 진행 중인 프로젝트인 OpenJDK7를 기초로 JDK7 스펙을 제거하는 방식으로 JDK6과 Compatible 하도록 진행 됐기 때문이다.

Open JDK6에서는 파일 처리와 같은 기본적인 OS-Integration 관련 기능과 네트워크 처리 및 Swing 에서 몇몇 문제점이 Report 되고 있다고 한다. Open JDK를 사용시에는 꼭 Open JDK7를 사용하도록 한다.

JDK6을 사용하고 있을 때, OpenJDK로 이관한다면 JDK6 -> JDK7로의 변경시의 이슈가 더욱 중요해 보인다.

> All new JDK7 features - http://openjdk.java.net/projects/jdk7/features/

#### JVM

OpenJDK 프로젝트는 아래와 같은 몇몇 Component로 구성되어 있는데,

- HotSpot VM
- The Java Class Library
- Java Compiler

VM 역시 Oracle에 의해 제공되는 HotSpot VM Spec과 동일하다.

> OpenJDK는 오픈소스이기 때문에 RedHat과 같은 Vendors에 의해서 Customized 되어 배포된다면 VM에 차이가 있을 수 있다. 하지만 물론 Vendor's VM은 배포시에 Java Trademark를 사용하기를 원한다면 Java TCK에 일치하는 것을 증명해야 한다.
http://openjdk.java.net/groups/conformance/JckAccess/jck-access.html

#### Source 빌드 및 Binary 배포 이슈

OpenJDK는 소스코드만 배포하고 있어, 직접 빌드해야하나라는 의문이 생길수 있지만 아래와 같이 리눅스에서 rpm 패키지로 다운로드 및 설치가 가능하다.

- http://openjdk.java.net/install/

`Debian, Ubuntu`

```
$ sudo apt-get install openjdk-7-jre
```


`Fedora, Oracle Linux, Red Hat Enterprise Linux`
```
su -c "yum install java-1.7.0-openjdk"
```

## OpenJDK Quality Metrics

- http://openjdk.java.net/groups/quality/metrics/

## OpenJDK의 사용 범위

OpenJDK를 통해 JVM 기반의 오픈 소스를 이용하여 서비스 및 플랫폼 운영시에 성능 이슈가 있는지 확인한다.

<img src='http://image.toast.com/aaaaahq/OpenJDK_AS.png' />


#### JVM 기반의 오픈소스 플랫폼 및 Spring과 같은 Java 기반의 오픈소스

JVM기반의 오픈소스 사용시에는 Requirements 스펙에 JDK Version이 명시되어 있는지 확인한다.

- Apache Kafka / Netty / MongoDB / Cassandra / Etc
- https://github.com/apache/cassandra 페이지를 예를 들면 Requirements 항목에 Java >= 1.7 (OpenJDK and Oracle JVMS have been tested) 라고 명시되어 있는 것을 볼 수 있다.

#### CI / Build
 
- Java 기반의 Ant/Maven/Gradle 과 같은 빌드 도구를 사용하는 빌드서버는 OpenJDK를 이용한다.

#### WAS / Application

- Tomcat 및 Application 레벨에서 OpenJDK를 이용한다.


## OpenJDK 설치

#### JDK Download
   JDK6 : http://download.java.net/openjdk/jdk6
   JDK7 : http://download.java.net/openjdk/jdk7
   JDK8 : http://download.java.net/openjdk/jdk8

#### JDK 설치 및 Tomcat 설치 Script
 
```
su -c "yum install java-1.7.0-openjdk"
```

- http://openjdk.java.net/install/
- http://jmnote.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_JDK_%EC%84%A4%EC%B9%98
- Unofficial installer - https://github.com/alexkasko/openjdk-unofficial-builds

## 결론 & OpenJDK 이관시 Risk

위의 내용을 바탕으로 OpenJDK 는 Java 플랫폼의 Next Version인 JDK7의 근간이 되는 프로젝트로서, JDK7를 기준으로 Oracle 에서 Binary로 배포되는 JDK와 OpenJDK는 차이가 없다고 봐도 무방하다.
하지만 실제 서비스에 적용하기 위해서는 사내에 OpenJDK 적용 사례가 있는지 확인 할 필요가 있어보이고, 서비스에 직접적으로 영향을 미치지 않는 관리자도구 등에 시범적으로 적용하여 레퍼런스를 쌓아가는 것도 바람직해보인다.

만약 JDK6 기반에서 운영하는 서비스가 있다면 JDK7으로의 변경으로 인한 이슈를 살펴 볼 필요가 있다.
추가적으로 어플리케이션/빌드 및 배포/플랫폼 전반에 JVM기반의 오픈소스를 사용시에는 OpenJDK의 지원여부 및 성능 및 안정성에 대한 이슈를 자세히 체크 해야 한다.

## 참고

#### References
> http://openjdk.java.net/
   http://openjdk.java.net/projects/jdk6/
   http://openjdk.java.net/projects/jdk7/
   http://openjdk.java.net/projects/jdk8/
   http://helloworld.naver.com/helloworld/1219
   http://www.slideshare.net/PrincipledTechnologies/comparing-java-performance-red-hat-enterprise-linux-6-and-openjdk-vs-microsoft-windows-server-2012-and-oracle-java-hotspot

#### FAQ
> http://stackoverflow.com/questions/22358071/differences-between-oracle-jdk-and-open-jdk-and-garbage-collection
   http://stackoverflow.com/questions/11547458/what-is-the-difference-between-jvm-jdk-jre-openjdk
   https://blogs.oracle.com/henrik/entry/moving_to_openjdk_as_the
   https://blogs.oracle.com/henrik/entry/java_7_questions_answers
   https://blogs.oracle.com/jtc/entry/comparing_jvms_on_arm_linux
   https://blogs.oracle.com/jtc/entry/comparing_arm_linux_jvms_revisited
   http://superuser.com/questions/593954/performance-oraclejdk-or-openjdk
   http://www.reddit.com/r/Clojure/comments/1v9a86/openjdk_vs_oracle_jdk/
   http://www.coderanch.com/t/611388/java/java/OpenJDK-OracleJDK-Performance
   http://askubuntu.com/questions/437752/openjdk-oracle-is-better


