---
title: API Gateway 패턴
date: 2015-08-24 11:49:55
categories: devops
---

이 문서는 API Gateway 패턴에 대해 키워드 위주로 요약하였다.

## Monolithic Architecture 와 Micro Service Architecture

API Gateway Design이 왜필요한지를 이해하려면 Monolithic Architecture 와 Micro Service Architecture에 대한 이해가 먼저 필요하다. 아래의 조대협씨의 블로그에 매우 잘정리해가 되어있으니, 참고하면 좋을듯 하다.

- http://bcho.tistory.com/948

#### Monolithic Architecture

하나의 애플리케이션에 모든 기능이 구현되어 있는 아키텍쳐

#### Micro Service Architecture

하나의 애플리케이션을 구성하기 위한 기능을 여러 컴포넌트/서비스로 분리한 구조이다.
컴포넌트/서비스 단위로 데이터가 분리되고 빌드 또는 Deploy시에도 서로 영향이 없어야 한다.

## API Gateway?

Micro Service Architecture 가 탄생하면서 이를 보다 효율적으로 이용하기 위해 나타난 Design이다.
하나의 애플리케이션에서 여러 분산된 서비스를 이용하다보니 다양한 문제들이 발생되는데 이를 해결하기 위해 API Gateway가 탄생되었다.

Micro Service Architecture 에서 이슈되는 문제와 API Gateway를 통해 이를 어떻게 해결해나가는지 살펴보도록 하자.

## API Gateway의 공통기능

<img src='http://photo.toast.com/aaaacd/Dongle/api_gateway_common.png' />

#### Authentication / Authorization

- ~~OAuth2.0 : accessToken / refreshToken~~
- One Time Token
- JSON Web Token : http://jwt.io/
- Spring Security

#### Logging
- API Request Logging / Audit
- Metering / Charge
- QoS (Limit)

#### Orchestration(Mash-Up)
- 여러개의 API를 하나로 묶어 Mash-Up에 구성할수 있는 기능

#### And so on...
- Message Transformation
- Message Format (Protocol) Transformation

#### API Gateway로 얻을수 있는것

`클라이언트 이슈`
- 각 클라이언트에 최적화된 API를 제공할 수 있다.
- 여러 서비스를 호출하는 로직을 클라이언트에서 API 게이트웨이로 옮겨 클라이언트를 간소화할 수 있다.
- 요청, 라운드 트립(round-trip)의 수를 줄일 수 있다. 예를 들어, API 게이트웨이는 클라이언트가 한 번의 라운드 트립으로 여러 서비스에서 데이터를 받아올 수 있다. 더 적은 요청은 부하를 줄이고 사용자 경험을 높힐 수 있다는 의미다. API 게이트웨이는 모바일 애플리케이션에서는 필수다.

`벡엔드`
- 분산시스템. 집중적으로 트래픽이 몰리는 서비스만 스케일 아웃 할 수 있다.
- 독립적으로 서비스별로 유연하게 배포가 가능하다.
- 특정 서비스의 배포로 인한 다른 서비스에 대한 영향도가 줄어든다.
- 컴포넌트 확장에도 유연
- 조직이 일하는 프로세스나 규칙에도 영향을 미칠 수 있다.

#### 주의해야할점

- 추가적인 API 콜로 인한 네트워크 성능 이슈
- 서비스간 트랜잭션 처리
- 테스팅의 복잡도


## References

> http://microservices.io/patterns/apigateway.html
http://techblog.netflix.com/2012/07/embracing-differences-inside-netflix.html
http://devcafe.nhncorp.com/index.php?mid=intro&act=dispWikiContent&vid=APIgateway
http://wiki-camp.appspot.com/%5B%EB%B2%88%EC%97%AD%5D_%ED%8C%A8%ED%84%B4%3A_API_Gateway
http://bcho.tistory.com/948
http://bcho.tistory.com/1005
http://bcho.tistory.com/999
https://www.polarisoffice.com/d/2RP8vZUY


