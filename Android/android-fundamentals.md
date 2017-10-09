---
title: 안드로이드 애플리케이션의 구성 요소
date: 2013-03-27 15:24:49
categories: android
---

## Application Fundamentals 

Android SDK Tools는 소스코드, 데이터, 리소스 파일 등을 컴파일 하고 `.apk` 확장자의 아카이브 파일에 패키징 하게 된다. 하나의 APK 파일에는 어플리케이션의 모든 내용이 포함되며, 이 파일을 통해 Android 디바이스에 설치 할 수 있게 된다.

Android App은 아래와 같은 Security SANDBOX 소유권 내에서 존재 하게 되는데, 

- Android operating system 은 각 어플리케이션이 각각의 multi-user 로 관리되는 Linux-System 이다. 시스템은 각 어플리케이션 마다 고유한 유저 ID를 부여 하고, 이로 인해 오직 어플리케이션에 부여된 유저 ID 에게만 어플리케이션 내부의 모든 파일에 접근 할 수 있는 권한을 부여 한다.
- 각 Process(애플리케이션)은 자신의 Virtual Machine을 소유 하며, 다른 어플리케이션에 대한 접근을 제한 하게 된다. 
- 기본적으로, 모든 어플리케이션은 자신이 소유 하고 있는 Linux 내 Process 안에서 실행 되고, 특정 어플리케이션의 실행이 필요 할 때 Android는 해당 Process를 시작한다. 이후에 다른 어플리케이션을 위해 메모리를 반환 해야 할 때 또는 더 이상 필요하지 않을 때 Process는 종료 된다.

이러한 방법으로 Android System은 The principle of least privilege 를 수행한다. 각 어플리케이션은 기본적으로는 오직 필요로 하는 Component 에게만 접근 권한을 부여 함으로서, 매우 강력 하게 안전한 환경을 제공 하게 된다.

그러나, 아래와 같은 방법으로 어플리케이션 간에 데이터를 공유하거나 System Service 에 접근이 가능 하다.

- 두 어플리케이션 간에 동일한 ID를 공유 함으로서 서로 파일을 공유 하는 것이 가능 하다. System Resource 를 아끼기 위해 같은 ID를 사용 함으로서 같은 Linux Process 와 VM를 공유 하게 된다.
- 어플리케이션은 주소록 정보, SMS 정보, SD Card, 카메라, Blue-Tooth 등과 같은 디바이스 의 정보에 접근 하기 위해 요청 하게 되는데, 이러한 모든 Permission 은 설치 시 에 유저에 의해 부여 되어야 한다.

## App Components

App Component 들은 Android 어플리케이션의 기본적인 구성 요소 이다. 각 Component 는 각각의 역할을 가지고 있는데, 모든 Component 가 직접적으로 유저와 관계 되거나 또는 서로 의존 관계를 가지는 것은 아니다. 그러나 각각의 Component는 모두 구별되는 특정한 역할이 존재 하며, 어플리케이션을 정의하는데 도움을 준다. 

아래에 4가지의 Component 에 대해 간단히 설명 하도록 하겠다. 각각의 Component의 타입은 목적에 따라 구별되는 Life-Cycle을 가지고 있다.

#### Activities

activity는 유저 인터페이스를 포함하는 화면 단위 이다. 예를 들면 e-mail 어플리케이션에 이메일 목록을 나타내기 위한 activity가 존재하고, 다른 activity를 통해 이메일의 상세한 내용을 읽을 수 있다는 것이다. 만약 e-mail 어플리케이션이 권한을 허용 한다면, 다른 어플리케이션 에서도 e-mail 목록을 위한 activity 를 호출 할 수가 있는데, 좀 더 구체적으로 말하면 이메일 작성 시 사진을 공유하기 위해 사진 어플리케이션을 실행 해 선택 하는 것 같은 행위 말이다. 

Activity 는 Activity 의 하위 클래스를 생성해 구현 하며,  자세한 개발자 References 는 아래와 같다.

> http://developer.android.com/guide/components/activities.html 


#### Services

Service는 원격으로 수행 되거나 장시간 동안 수행되어야 하는 행동을 background 에서 실행 가능 하도록 하는 Component 이다. Service 는 유저 인터페이스를 제공 하지는 않는데, 예를 들면 다른 어플리케이션을 사용하면서 background 에서 음악을 재생 하거나 activity 와의 인터렉션 없이 네트워크를 통해 특정 데이터를 전달 받는 것과 같은 역할은 한다. activity와 같은 다른 Component 가 Service를 실행 할 수도 있다.  

Service는 Service의 하위 클래스를 생성해 구현 되며, 자세한 개발자 References 는 아래와 같다.

> http://developer.android.com/reference/android/app/Service.html 

#### Content Providers

Content Provider는 어플리케이션의 데이터를 공유하는 역할을 한다. 어플리케이션이 접근 가능한 물리적인 저장 공간 - SQL Lite 또는 파일 시스템을 통해 데이터를 저장 할 수가 있는데, Content Provider는 다른 어플리케이션이 데이터를 수정하는 것 조차도 요청할 수 있다.

예를 들면, Android system은 주소록 정보를 제공 하는데, 어떠한 어플리케이션이 권한을 명시 한다면, Content provider를 통해 특정한 사람들의 주소록 정보를 읽거나 작성 할 수 있게 된다. Content Provider 는 ContentProvider 의 하위 클래스를 통해 구현 되며, 꼭 다른 어플리케이션과 동일한 Standard API를 사용 하여야 된다. 자세한 정보는 아래의 개발자 References 를 확인 하도록 하자.

> http://developer.android.com/guide/topics/providers/content-providers.html 

#### Broadcast receivers

Broadcast 는 system 전반에서 특정 이벤트에 대해 응답하는 역할을 한다. 스크린이 꺼진다던가 배터리가 부족 한다던가 화면이 캡쳐 된다면 이러한 행위가 broadcast receiver를 통해 응답 받을 수 있다고 보면 된다. 비록 broadcast receiver 는 유저 인터페이스를 통해 노출 되지 않지만, broadcast 이벤트를 감지해 Notification Status 를 통해 유저에게 알려 줄 수 있다. 추가적으로 broadcast receiver 는 단지 다른 Component를 위한 gateway 역할을 한다는 것이고, Event를 기반으로 실제 service 를 시작하게 해 수행하게 되는 예를 들 수가 있겠다.

더 구체적으로 예를 들면 Google Cloud Messaging 서비스를 통해 푸시에 대한 Event 를 broadcast receiver가 감지 했다면, 실제 이러한 이벤트를 service에 전달하고, service에서 유저에게 알리기 위한 Notification Status를 노출 하게 된다.

BroadcastReceiver는 BroadcastReceiver의 하위 클래스를 통해 구현 되며, 각 broadcast 는 Intent를 통해 전달 된다. 자세한 개발자 References 를 통해 구체적으로 구현 해보도록 하자.

> http://developer.android.com/reference/android/content/BroadcastReceiver.html 

#### Apps provides mutiple entry

Android system design은 구별되는 점은 위와 같이 Android 어플리케이션 은 구분되는 각각의 Component로 구성 되어 있는데, 예를 들면 각각의 activity 는 UI를 위해 단일 화면을 제공 하게 되고, service 는 background 에서 실행 되는 동작을 수행 하게 된다는 것이다. Intent 를 사용 해 특정 Component 로 부터 다른 Component 를 실행 할 수 있게 되고, 다른 어플리케이션 내의 Component 조차도 실행 할 수 있게 된다. 이러한 모델로 인해 어플리케이션은 다양한 경로를 통해 실행 될 수 있게 되고, 다른 어플리케이션을 통한 실행(Default) 도 허락 할 수도 있다는 것이다.

#### Activating Components(Intent)

Component 중 activities, services, broadcast receiver 는 `Intent`라고 불리는 비동기 메세지로 인해 활성화 되게 되는데, Intent는 각 Component를 Runtime에 Bind 한다.

> 다른 Component로 부터 요청되어지는 행동을 전달 한다고 이해 하면 된다

Intent는 Intent object 로 부터 생성되는데, Intent 는 각각 명시적(explicit) 또는 암시적(implicit) Intent 로 구분 된다.

Activities 그리고 Services를 위해서는 Intent는 행동( 예를 들면 “view” / “send” 와 같은)을 정의 하고 그리고 특정 데이터의 URI를 통해 서도 행동을 정의 하게 된다. 예를 들면 activitiy 에서 이미지를 보여 주기 위한 요청을 전달 한다던가 웹 페이지를 보여 주기 위한 행동들 말이다. 몇몇 상황 에서는 결과를 받기 위해 activity 를 실행 할 수도 있다. 예를 들면 Intent를 통해 사용자가 주소록에서 선택한 특정 주소록 정보를 전달 받을 수 있다.

Broadcast receiver를 위해서는 단순 하고 명확하게 현재 상태를 전달 하게 된다. (예를 들면 디바이스의 배터리가 15% 이하 일때, “battery is low” 와 비슷한 string 을 통해 행동을 전달 한다.


다른 Component 타입인 Content Provider 는 Intent에 의해 활성화 되지 않는데, 대신 ContentResolver 로 부터 요청 되어 질때 활성화 되며,, Content Resolver 는 Content Provider 와의 직접 적인 모든 행동을 처리한다. 

#### The Manifest File

Android system 이 어플리케이션의 Component 를 시작 할 수 있기 전에, 시스템은 AndroidManifest.xml 파일을 통해 해당 Component가 존재 하는지 알 수 있어야 한다. 어플리케이션은 모든 Component를 AndroidManifest.xml 파일을 통해 선언 하게 되며  이 파일은 프로젝트의 최상단에 위치 하여야 한다.

매니페스트는 추가적으로 아래와 같은 component에 대해 선언할 수 있다.

- Internet access 와 같은 어플리케이션이 요구하는 유저의 권한에 대한 확인
- 최소 API Level에 대한 선언과 어플리케이션이 기반하는 API Level
- 카메라, 블루투스 접근과 같은 hardware / software 에 대한 접근 권한
- 어플리케이션이 필요로 하는 Google Maps Library 와 같은 추가적인 API Libraries 에 대한 정보

`Declaring components`

- activities
- service
- receivers
- content providers 

`Declaring component capabilities`

- intent, intent-filter

`Declaring app requirements`

- uses-feature, uses-sdk

## App Resources

Android 어플리케이션은 단지 코드로만 구성 되어 지지 않는데, 이것은 어플리케이션 내부에서 코드와 이미지, 오디오 파일, View를 위한 XML 같은 것들이 분리 되어 관리 되도록 요구 한다는 것이다.

예를 들면 activity 에서 유저 인터페이스를 위한 layout 구성 또는 animations, menus, k styles, colors 과 같은 값을 XML File을 통해 정의 할 수 있고, 이러한 어플리케이션 리소스 관리는 code 수정 없이 특정 영역을 보다 더 쉽게 관리 할 수 있도록 도와 준다.

Android 프로젝트에 포함 된 모든 리소스는 SDK의 build tools 를 통해 고유한 ID가 부여 되며, XML 또는 code 레벨 에서 ID를 통해 리소스를 참조 할 수 있게 된다. 예를 들면 만약 logo.png 라는 이름을 가진 이미지 파일을 어플리케이션 프로젝트의 res/drawable/ 디렉토리에 저장 한다면 SDK tools 는 R.drawable.logo 라는 리소스 ID를 생성 하게 된다. 


중요한 요소 중 하나는 이러한 리소스 분리가 각각의 디바이스의 설정에 맞게 대체되어 제공 될 수 있다는 것이다. 예를 들면 string 에 정의된 언어를 다른 언어로 제공 해야 한다면, res/values-ko 와 같이 디렉토리를 생성 해 저장 한다면, 해당 국가에 맞는 언어로 UI에 제공 되게 된다.
이러한 구분 또는 식별은 언어 뿐만 아니라 다비이스의 여러가지 설정에 수반 되는데, 디바이스의 해상도, 디바이스의 가로 또는 세로 모드 여부에 따라 식별되는 어플리케이션 리소스 경로를 통해 손쉽게 관리 할 수 있게 된다. 더욱 자세한 References 는 아래의 경로를 통해 확인 할 수 있다.

> http://developer.android.com/guide/topics/resources/providing-resources.html 

## References

- http://developer.android.com/guide/components/fundamentals.html 



