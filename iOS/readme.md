## 목차

### #1. <span style="color:#eb6420">Swift 학습을 위한 개발환경 준비 그리고 TDD 맛보기</span>

#2. Github 와 SourceTree 로 프로젝트 관리하기

#3. 더욱 다양한 테스트 시나리오를 통해서 Swift 학습하기

#4. Swift에 대해 더 알아보기전에 무엇을 개발하고 싶으신가요?

#5. 프로토타이핑, UI 툴을 통해 Product에 적용하기


## 누구를 위한 문서인가요?

Swift를 통해 iOS 애플리케이션 개발을 시작하면서 학습한 내용을 정리하고자 합니다. 이 문서는 저와 같이 처음 Swift를 통해 iOS 개발을 시작하시는 분들에게 도움이 되었으면 합니다.

- Swift 3를 통해 iOS 개발을 처음 시작 하는 분
- 기본적인 프로그래밍 경험이 있으신분

먼저 iOS 애플리케이션 개발을 하기 위한 환경을 준비하는 것으로 시작으로 Swift 3의 기본적인 개념을 살펴볼까 합니다.

## Swift 3 학습하기 

먼저, iOS 애플리케이션 개발을 위해서는 Objective-C 또는 Swift 언어에 대한 학습이 선행되어야 하는데, iOS개발을 처음시작하는 사람이라면 Swift를 통해 개발을 시작하는 것이 유리하다. 

- https://swift.org/
- https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309
- https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/Lesson1.html

### What is Test Driven Development?

Test Driven Development (or TDD ) 는  소프트웨어를 개발하는 하나의 방법이다. 우리가 작성하게 되는 모든 코드는 정상적으로 작동하는지에 대한 테스트가 필요한데, 코드를 구현하기 이전에 테스트 케이스를 정의하고, 테스트코드를 먼저 작성하는 방법이다. 

### 현재 Swift 3가 최신의 버전이며, TDD를 통해 새로운 언어를 학습하는 것이 아래와 같은 장점이 있을 것으로 판단했다.

- 새로운 언어를 습득하기 위해서는 쉽고 편하게 내가 작성한 코드에 대한 결과물을 확인해 볼 수 있어야 한다.
- 테스트 케이스를 먼저 구현해보면, 언어를 학습하는데에 필요한 구성요소를 쉽게 찾을 수 있어 학습에 대한 스트레스를 줄여줄 수 있다.
- 다른 언어에서 이미 경험해본 TDD를 기반으로, 새로운 언어의 개발환경에 쉽게 익숙해 질수 있다.

지금부터 Xcode 설치를 시작으로 개발에 필요한 환경들을 준비해보도록 하겠다.


## Xcode 설치

### Apple 개발자센터에서 다운받기

#### Apple Download 사이트로 이동한다.

- https://developer.apple.com/download/more

#### Apple ID를 통해 로그인 합니다. (if requested).

#### 리스트에서 Xcode 8을 다운로드 한다.
- 2016.10.19 기준, 2016/09/12 Lastest Updated

### App Store에서 다운받기

#### App Store 에서 Xcode를 검색하면 최신의 버전을 다운로드 할 수 있다.


## 프로젝트 생성하기

### Xcode를 실행하고 'Create a new Xcode Project' 를 통해 새 프로젝트를 생성한다.

![create-project](http://image.toast.com/aaaaahq/xcode-create-project-1.png)

### Single View Application 을 선택


![create-project](http://image.toast.com/aaaaahq/xcode-create-project-2.png)


### 프로젝트 정보를 입력한다.

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

## 첫 테스트케이스 만들기

##### Good Practices
- https://github.com/futurice/ios-good-practices#architecture/
- https://realm.io/news/gotocph-ash-furrow-best-practices-swift/
- https://medium.com/@ynzc/part-2-brains-before-beauty-410fb41f6ae3#.nsgg40fu1
