---
title: 안드로이드 플랫폼에서 TDD와 효율적인 테스트
date: 2014-12-29 15:24:49
categories: android
---

## Overview

TDD는 테스트코드를 작성하면서 유연한 인터페이스 설계를 하도록 도와준다면, 단위테스트는 TDD라는 틀 안에서 자신이 개발한 결과를 빠르게 확인할수 있는 가장 효율적인 도구라고 생각한다.

더욱이 Android와 같은 클라이언트 환경에서 테스트 케이스가 존재 하지 않는다면 어플리케이션을 실행하기 위한 빌드와 테스트를 위한 화면에 진입하는 단계까지의 과정은 꽤나 번거롭다고 할 수 있겠다.Spring 기반의 웹어플리케이션 뿐만 아니라 Android 개발시에도 단위테스트는 선택이 아니라 필수라고 한다면, 효율적으로 테스트하기 위한 전략은 어떠한 것들이 있는지 살펴 보도록 하자.

## 효율적인 테스트를 위한 전략

#### 디바이스 환경 vs 로컬 환경

Android SDK를 통해 개발되는 애플리케이션은 크게 아래와 같이 두가지 방법을 통해 단위테스트가 가능하다.

- DalvikVM 기반의 테스트
- JVM기반의 테스트

Android에서 기본적으로 제공되는 테스트 프레임워크를 사용하게 되면 DalvikVM에서 테스트를 실행 할 수 있지만 아래와 같은 몇몇 제약사항이 존재한다.

- 느린 테스트 실행 속도
- Mock을 위한 클래스에 대한 제약사항
- JUnit3 기반의 테스트 프레임워크

이중 무엇보다 느린 테스트 실행 속도는 TDD를 위한 테스트코드를 작성하는데 가장 의욕을 꺽이게 하는 부분이다. Android의 실행환경에서는 DalvikVM 기반이기 때문에 테스트코드도 시뮬레이터 또는 디바이스에서 실행되어야 한다.

그래서 만약 테스트시에 코드를 한줄만 수정을 한다고 하더라도, 애플리케이션의 실행을 위해 빌드 및 APK생성, 설치, 실행이 테스트 프로세스에 포함되어 상당히 많은 시간이 소요된다. 이 문서에서는 이러한 문제를 해결하기 위해 JVM환경에서 테스트하기 위한 기법들을 중점적으로 정리해보려고 한다.

#### 테스트 코드를 통한 API Reference

특정 범위에 대한 테스트 뿐만 아니라, 테스트코드를 통해 다수의 개발자에게 API Reference 역할을 할 수도 있을 것이다.

- 애플리케이션이 아닌 특정 서비스 연동을 위한 SDK형태로 제공한다면, SDK내의 API를 가이드하는 훌륭한 Reference가 될 수 있다.
- 서버API에 대한 명세도 테스트 코드를 통해 훌륭한 예제가 될수 있다.

#### 테스트 자동화

- Ant/Gradle과 같은 빌드 도구를 이용해 빌드/배포 프로세스에 테스트 프로세스를 포함 시킨다.
- 서버 API의 변경 내역에 대한 탐지가 가능하다.

#### 오픈소스 사용에 대한 고려

JVM 기반에서 테스트하기 위해서는 DI와 의존클래스에 대한 Mock구현이 중요하다. 이를 위해서 아래와 같은 오픈소스 적용을 고려한다.

구분 | 이름	| Reference
--|--|--
DI | Roboguice | https://github.com/roboguice/roboguice
DI | Android Annotations | http://androidannotations.org/
Mock | PowerMock / Mockito | https://code.google.com/p/powermock/
테스트	| Robolectric | http://robolectric.org/

## 로컬 환경에서 테스트를 위한 Android 프로젝트 구조

JVM기반에서 테스트 하기 위해서는 DalvikVM 환경의 디바이스 또는 Android 프레임워크에 의존적인 클래스와 분리된 테스트 프로젝트를 생성하여야 한다.

#### 테스트 프로젝트 생성 및 설정
   
- Android Project의 Root 경로에 /tests 폴더를 생성한다.
- 이클립스 > File > New > Java Project 선택
- Project Name 입력 후 Use default location 체크 해제 후 Android Project의 /tests 폴더의 경로를 지정
- 생성된 테스트 프로젝트에서 Configure Build Path > Projects > Add 를 통해 Android Project 추가

<img src='http://image.toast.com/aaaaahq/android-tdd-0.png' />

<img src='http://image.toast.com/aaaaahq/android-tdd-1.png' />

#### 테스트 코드 작성

- JVM기반의 테스트환경에서 실행하기 위한 클래스는 /src 폴더에 작성한다.
- @Test를 통한 테스트코드는 /test 폴더에 작성한다.

<img src='http://image.toast.com/aaaaahq/android-tdd-2.png' />

#### Run Configurations

DalvikVM 환경이 아닌 로컬에서의 테스트를 위해 Eclipse JUnit Launcher를 선택하여 테스트실행

<img src='http://image.toast.com/aaaaahq/android-tdd-3.png' />

## 테스트 기법 & TDD를 통한 인터페이스 설계

위에서는 DalvikVM 환경에서 안드로이드의 기본 테스트프레임워크를 사용했을때의 문제점을 알아보았다. 이를 해결하기 위해 JVM기반에서 효율적으로 테스트 할수 있는 방법에는 어떠한 것들이 있는지 알아보도록 하겠다.

#### @Test 를 위한 인터페이스 설계

Android의 기본프레임워크 구조에서는 Activity 또는 Context와 같은 슈퍼클래스가 많은 역할을 하고 있다. Android에서는 테스트용 Mock객체를 활용하기 위해서는 강력한 상속관계 때문에 상위 클래스의 동작을 가로채야 하는데, 이러한 부분이 테스트 범위를 고려하는데 있어서 걸림돌이 될수 있다.

이러한 부분에 대한 해결책으로 상속보다는 위임을 통해 구현할수 있다면, DI를 이용해 의존관계를 구성하여 테스트시에 유연하게 활용 할수 있게 된다.

`Example) SQLite 를 사용하는 Interface에 대한 설계`

<img src='http://image.toast.com/aaaaahq/android-tdd-4.png' />

- 위와 같이 SQLite를 통해 결제내역을 관리하는 PurchaseLogDao 라는 인터페이스를 통해 테스트환경과 디바이스환경의 구현클래스를 별도로 구현하도록 한다.
- 디바이스 환경에서는 PurchaseLogDaoImpl 을 통해 SQLite에 접근하게 되지만, 테스트 환경에서는 PurchaseLogDaoMock를 통해 JVM환경에서 실행되게 된다.

#### android.util.Log

Android 프레임워크에서는 디버깅을 위해서 Log클래스를 사용하게 되는데, JVM 테스트 실행환경에서는 android.util.Log 접근시에 RuntimeError를 발생하게 된다. 이를 위해서는 로그를 위한 Wrapper 클래스를 구현하도록 한다.

`DalvikVM에서의 로그를 위한 Logger 클래스`

```java
public class Logger {
    public static void i(String format, Object... args) {
       Log.i(TAG, String.format(format, args));
    }
}
```
> Android Project에 위치하게 된다.

`JVM에서의 로그를 위한 Logger 클래스`

```java
public class Logger {
    public static void i(String format, Object... args) {
       System.out.println(TAG + String.format(format, args));
    }
}
```
   
> 테스트 Project에 위치하게 된다.


#### Asynchronous 구현에 대한 테스트

보통 어플리케이션 또는 어플리케이션을 위한 SDK는 서버 API연동을 위해 새로운 Thread를 생성해 Asynchronous한 구현을 하게 된다. 하지만, JUnit을 통한 단위테스트에서는 새롭게 생성된 다른 Thread에 대한 테스트를 하는데 제약사항이 존재한다. 이와 같은 경우에도 interface를 통해 실행환경에 따라 참조 또는 DI 할수있도록 구현한다.

`HTTP 요청을 interface`

```java
public interface class RequestRunner<T> {
     abstract public void call(ResponseListener<T> listener);
}
```

`실제 환경에서의 Asynchronous한 구현`

```java
public class AsyncRequestRunner extends RequestRunner<String> {
     
     @Override
     public void call(ResponseListener<String> listener) {
     // TODO: Asynchronous...
     }
}
```

`테스트 환경에서의 Synchronous한 구현`
public class AsyncRequestRunner extends RequestRunner<String> {
     
     @Override
     public void call(ResponseListener<String> listener) {
     // TODO: Synchronous...
     }
}


#### 예제를 통한 API 테스트

서버 API를 위한 테스트를 JSON 형태의 정적파일을 통해 하게되면 아래와 같은 장점이 생긴다.

- 서버 API가 구현되지 않아도, 실제 네트워크 연결 없이 테스트 가능하다.
- 훌륭한 API Reference 역할을 하게 된다.

`파일처리를 위한 클래스 구현`

```java
public class FileUtils {
      public static String getJsonFromFile(@SuppressWarnings("rawtypes") Class clazz, String fileName) throws IOException {
          ............
      }
}
```

`테스트코드`

```java
@Test
public void reserveApiTest() {
     String responseBody = FileUtils.getJsonFromFile(getClass(), "json/reserve_response_body.json");
     Request request = new Request(new ResponseCallback() {
          @Override
          public void onCallback(String response) {
               ......
          }
     });
     request.setResponseForTest(responseBody);
     request.run();
}
```
`reserve_request_body.json`
```
{
 "userKey":"GUEST58e452c3b3",
 "appSeq":1000030,
 "itemSeq":1000048,
 "userChannel":"GF",
 "currency":"N/A",
 "price":0
}
   reserve_response_body.json
{
   "result":{
     "marketId": "TEST",
     "paymentSeq": "2014122910105580",
     "marketItemId": "gas"
   },
   "message": "success",
   "code": 0
}
```

#### SQLite과 같은 디바이스 종속적인 테스트 범위 / Activity, Context 객체와 같은 Android와 의존적인 클래스가 포함된 영역

이와 같은 경우에도 android.util.Log 클래스와 같이 JVM기반의 테스트환경에서는 RuntimeError를 발생하게 되는데, 테스트를 위해서는 아래와 같은 방법을 고려할수 있다.

- interface를 통한 실행 환경별 구현
- PowerMock / Mokito 를 활용한 Mocking을 통한 테스트
- JVM기반에서 테스트 할 수있는 환경을 제공하는 Robolectric같은 테스트 프레임워크의 사용

## 결론

- Android 플랫폼에서 신속하고 빠르게 테스트 하기 위해서는 선택과 집중이 필요하다.
- 가장 자주 사용되는 서버 API를 테스트 하기 위한 효율적인 전략을 수립하도록 한다.
- Presentation Layer까지 테스트 자동화하는 것은 오히려 비효율적일 수도 있다.
- TDD를 적극적으로 도입하여 인터페이스 기반의 유연한 구현이 가능하도록 설계한다.

정리하면, Android 플랫폼에서의 단위테스트의 필요성을 느끼고, 기본적인 내용에 충실히 하여 이러한 문제를 해결하기 위한 효율적인 방법을 고민하면 어떨까 합니다. 나아가서는 오픈소스 기반의 테스트 프레임워크를 사용하여 조금 더 효율적으로 테스트할 수도 있을 것 입니다.










