---
title: Swift 학습을 위한 개발환경 준비 그리고 TDD 맛보기
date: 2016-10-09 15:14:40
desc: Swift로 시작하는 iOS 애플리케이션
categories: ios
---

#### Swift Documents

- https://swift.org/
- https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Lesson1.html

#### What is TDD?

필자는 새로운 언어를 학습하기 위해서 가장 먼저 개발환경을 설치하고 그 이후에는 TDD(Test Driven Development) 하기 위한 환경을 준비한다. TDD는 소프트웨어를 개발하는 하나의 방법이다. 우리가 작성하게 되는 모든 코드는 정상적으로 작동하는지에 대한 테스트가 필요한데, 코드를 구현하기 이전에 테스트 케이스를 정의하고, 테스트코드를 먼저 작성하는 방법이다.

> TDD에 대해 더욱 자세히 알고 싶다면 Kent Beck의 Test Driven Development By Example 이라는 저서를 추천한다.
TDDBE - https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530

## Xcode 설치

#### Apple 개발자센터에서 다운받기

- [Apple Download site](https://developer.apple.com/download/more)로 이동한다
- Apple ID를 통한 로그인이 필요할 수 있다.
- 리스트에서 Xcode를 다운로드 한다.

#### App Store에서 다운받기

- App Store 에서 Xcode를 검색하면 최신의 버전을 다운로드 할 수 있다.

## 프로젝트 생성하기

#### Xcode를 실행하고 'Create a new Xcode Project' 를 통해 새 프로젝트를 생성한다.

![create-project](http://image.toast.com/aaaaahq/xcode-create-project-1.png)

#### Single View Application 을 선택

![create-project](http://image.toast.com/aaaaahq/xcode-create-project-2.png)

#### 프로젝트 정보를 입력한다.

| 속성 | 설명  |
|-|-|
| Product Name | 프로젝트명 |
| Team | 개인 또는 조직 |
| Organization Name | 조직 이름
| Organization Identifier | 조직 Identifier
| Language | Swift를 선택
| Devices | Universal을 선택 |
| 테스트 환경 설정 | Include Unit Tests, Include UI Tests를 체크한다 |

![create-project](http://image.toast.com/aaaaahq/xcode-create-project-3.png)


입력이 완료되면 Next를 클릭하면 아래와 같은 구조로 최종적으로 프로젝트가 생성된다.

![create-project](http://image.toast.com/aaaaahq/xcode-create-project-4.png)


## Build Setting & 하위 호환성 유지

iOS 애플리케이션은 Android 와 유사하게 SDK Version의 Target을 지정하여 빌드하게 된다. 하지만 Target에 대한 빌드 뿐만 아니라 하위 Version에 대한 Compatibility 보장해야 하기 때문에 이를 위한 방법을 간략하게 요약해 보았다.

먼저, Compatibility 를 보장하기 위해서는 Weak Link 와 String Link에 대한 개념을 이해해야 한다.

#### Weak Link
Link시에 Symbol이 없어도 에러가 발생하지 않는다. 해서 Runtime시에 Symbol이 있는지 확인하고 써야한다.

#### Strong Link
Link할때 Symbol이 없으면 에러가 발생한다. 호환성 유지를 위한 최소 OS Version에 대해서 String Link한다고 이해하면 된다.

#### Base SDK
애플리케이션이 호환되는 가장 상위 Level의 iOS SDK의 Version을 가르킨다.

#### Deployment Target
애플리케이션이 지원하는 가장 낮은 OS Version을 가르킨다. Deployment Target의 Version보다 상위 Version의 SDK의 API는 Weak Link되게 된다.

#### Compatibilty Guide
iOS 개발시 Compatibility 고려를 위한 Reference 이다.

- https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/cross_development/Introduction/Introduction.html

#### 결론

애플리케이션의 Build Settings 시에는 Base SDK는 가장 최신의 Version을 지정해야 한다. Deployment Target은 최저 Version으로 지정해도 되지만 Compatibility 보장하기 위한 비용이 들게 될것이다.
애플리케이션이 어떠한 iOS Version까지 지원할지 판단후에 지정하면 좋을 것이다.

> 간단한 Tip으로 특정 하위 Version에서 발생할수 있는 문제점을 컴파일시 발생시키려면 Base SDK를 해당 OS Version으로 지정하여 빌드해보면 좋을 것 이다.

## Github Repository

Objective-C 학습을 하면서 학습내용에 대한 소스코드 산출물은 git을 통해 관리하도록한다. git에 대한 자세한 설명은 아래의 링크를 참고하도록 하고 여기에서는 SourceTree를 통해 git을 간단히 다루는 방법에 대해 설명한다.

- http://git-scm.com/

#### SourceTree

git를 다루기 위해서는 git에 대한 개념뿐만 아니라 커맨드를 통해 Repository에 push/commit를 통해 관리를 해야한다. 하지만 SourceTree는 간편한 UI를 바탕으로 git에 쉽게 접근할수 있는 환경을 제공해주고 있다.

- Download : https://www.sourcetreeapp.com/

## Aboud Testing With XCode

iOS에서는 애플리케이션 테스트를 위해 테스트프레임워크를 제공하고 있다. XCode5부터 기존의 OCUnit을 대체하는 XCTest 프레임워크를 통해 TDD를 적용하여 학습해 나가는것이 어떨까 한다.

#### iOS Testing Reference

- https://developer.apple.com/library/prerelease/ios/documentation/DeveloperTools/Conceptual/testing_with_xcode/Introduction/Introduction.html#//apple_ref/doc/uid/TP40014132-CH1-SW1

#### 간단한 계산기 프로그램

- 계산을 위한 스택을 구현할것
- 스택은 기본형이외의 제네릭한 instancetype을 수용할수 있어야 한다.
- 화면으로부터 0~9부터의 숫자와 +, -, *, /, = 와 같은 기본적인 사칙연산을 통해 계산할수 있어야 한다.
- 스택을 초기화하여 계산을 새로 시작할수 있어야 한다.

#### 앞으로는 무엇을 테스트할 것인가?
애플리케이션을 개발하다보면 자주사용하게 되는 기능이 있을것이다. 예를 들어 나열해보면 아래와 같은 것들인데,

- String을 효율적으로 다루기 위한 유틸리티
- JSON <-> Object
- 암호화를 위한 모듈
- 서버와 통신을 하기위한 네트워크모듈
- 디바이스정보를 효율적으로 다루기위한 유틸리티
- 외부 SNS와의 연동

iOS플랫폼을 통해 UI기반의 애플리케이션을 개발하기 앞서, 위와 같은 모듈을 개발해보면서 Objective-C에 익숙해지고, 이렇게 생산된 공통적인 모듈은 한프로젝트에 독립적으로 사용되지 않고 지속적으로 재사용될 수가 있다. 점차 개선해나가고 이를 바탕으로 사용자 애플리케이션을 개발할때 반복적인 구현을 피할 수 있을것이다.

#### Useful Links

- https://github.com/raywenderlich/swift-style-guide
- https://www.gitbook.com/book/devxoul/ios-with-swift-in-40-hours/details
- http://swift3tutorials.com/ 
- https://www.coursera.org/learn/swift-programming
- http://www.learnswift.tips/
- https://classroom.udacity.com/me
- https://github.com/devxoul/Todobox
- https://cocoapods.org/?q=swift
- https://www.gitbook.com/book/opchen/swift-style-guide2/details
- https://github.com/StyleShare/swift-style-guide


##### Good Practices

- https://github.com/futurice/ios-good-practices#architecture/
- https://realm.io/news/gotocph-ash-furrow-best-practices-swift/
- https://medium.com/@ynzc/part-2-brains-before-beauty-410fb41f6ae3#.nsgg40fu1
- https://medium.com/the-traveled-ios-developers-guide/protocol-oriented-programming-9e1641946b5c#.3quklnxis
- http://toby.epril.com/?p=424