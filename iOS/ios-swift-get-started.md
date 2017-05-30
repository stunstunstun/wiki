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


#### Build Setting & 하위 호환성 유지


#### 첫 테스트케이스 만들기


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