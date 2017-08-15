---
title: API Gateway 의 인증 및 API 요청에 대한 검증
date: 2015-09-11 11:49:55
categories: devops
---

현재 진행하고 있는 프로젝트에서는 클라이언트(단말기)가 요청하는 다양한 PG수단에 대한 인증 및 승인 요청에 대하여 일관적인 API를 제공하여야 한다. API 요청에 대한 인증 및 검증 그리고 로그 정보를 관리할 필요가 있어 앞단에 API Gateway를 아키텍쳐를 구상하였다.

먼저 API Gateway에서 안정적인 보안을 위해서 HTTP 프로토콜에서의 다양한 인증 방식을 리뷰해 보았다.

#### HTTP Authentication

일반적인 웹 페이지에서 많이 사용되며 매 요청마다 인증 정보를 HTTP Header에 첨부하는 방법이다.

- 사용자의 아이디와 패스워드를 직접 첨부
- RFC2045-MIME variant of Base64 방식으로 Encoding한다

`HTTP Header`
```
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

#### SSL

단방향 HTTPS 프로토콜 제공. 서버에서 SSL 인증서를 설치하고 HTTPS 프로토콜을 제공한다.

#### OAuth 2.0

클라이언트의 인증을 위해 클라이언트 ID와 클라이언트 Secret과 같은 키를 발급하고 이를 통해 토큰을 발급하는 방법. 사용자에 대한 인증을 시작으로 사용에 대한 각 API마다 Authorization(허가)를 관리 할 수도 있다. OPEN API를 제공하는 많은 API Provider가 사용하고 있는 방식이다.

- 서비스가 제공하는 API에 일관적인 인증방법을 제시한다.
- 인증시에 참조됐던 정보는 이후 API 호출에 중복적으로 호출하지 않아도 된다.

#### RSA 암호화 및 Signature 검증

API Key를 발급하고 요청파라미터와 조합하여 Hashing 한 값을 비교하는 방법

- 서비스가 제공하는 API중 보안이 강력하게 필요한 API에 선택적으로 적용할 수 있다.
- API Key를 이용한 Signature 생성을 클라이언트에 위임하게 된다.

#### 요청 정보 암호화

HTTP Request에 포함되는 요청정보를 암호화해서 전달하도록 한다.

- UTF-8 Encoding
- 암호화

#### ACL기법

특정 API는 private 하게 제공할 수 있어야 한다.

- 지정된 Domain만 접근 가능
- 지정된 IP만 접근 가능

> API 요청에 대한 검증을 위해 API Key(대칭키)는 각 시스템 상호간의 서버에서만 알 수 있는 정보이여야만 한다. 클라이언트/서버간 요청/응답 정보에서는 Sniping 으로 인해 탈취될 수 있기 때문에 API Key를 첨부해서는 안된다.

> API Key는 노출될 수 없기 때문에 인증대상(값)을 선별하고 API Key와 조합하여 해싱된 Signature를 생성할수 있어야 한다.

## API Gateway의 인증

#### API 검증을 위한 인증 수단 제공

기본적으로 API Gateway에서는 클라이언트의 요청에 대해서 아래와 같이 다양한 PG Provider와 연동할수 있도록 일관적인 API를 제공한다.

내부적으로 각 PG Provider와 승인내역에 대한 검증절차를 가지지만 PG Provider별로 인증/보안스펙이 상이하고 API Gateway에서 2차적으로 일관적인 API 검증방식을 제공하면 좋을 것이다.

<img src='http://image.toast.com/aaaacd/Dongle/api_gateway.png' />

#### Signature 생성을 위한 알고리즘

인증 대상값을 통해 String Data를 생성하고 API Key를 통해 아래와 같이 Hashing 하도록 한다.

<img src='http://photo.toast.com/aaaacd/Dongle/hashing_flow.png' />

`String Data 생성`

`UTF-8 Encoding`

`HMAC (해시 기반 메세지 인증 코드)`

- 짧고 고정 길이이다.
- 중복을 방지할 수 있다.
- 메세지 구조를 숨길 수 있다.

`SHA-256`

SHA256을 통한 HMAC 해싱값이 현재 MD5 / SHA1에 비해 보안적으로 유리하다.

```
HMAC_MD5("key", "The quick brown fox jumps over the lazy dog")    = 0x80070713463e7749b90c2dc24911e275
HMAC_SHA1("key", "The quick brown fox jumps over the lazy dog")   = 0xde7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9
HMAC_SHA256("key", "The quick brown fox jumps over the lazy dog") = 0xf7bc83f43053
```

`Base64 Encoding - RFC 4648`

최종적으로 해싱이 완료된 Binary를 최종적으로 클라이언트/서버간 전달할수 있도록 Base64로 인코딩하여 문자열을 획득한다.

#### API 요청 및 Signature 생성에 대한 가이드

클라이언트 개발자가 만약 위와 같은 API 명세를 참고하여 API를 클라이언트와 연동한다면 API Reference를 통해 가이드를 하면 모든것이 해결될까? 개인적인 경험으로는 REST API 뿐만 아니라, 이외의 API를 배포할 때에는 상세한 API Reference보다는 아래의 방식이 가장 효과가 좋았다.

- 각 플랫폼별 클라이언트에서 사용할수 있는 SDK를 개발하여 배포하면 가장 좋지만, 비용이 많이 든다.
- 클라이언트의 플랫폼이 다양해 SDK배포에 제한이 있다면, API Reference에서는 상세한 예제 및 샘플코드를 첨부하도록 한다.

예를들면 위의 Signature 문자열을 생성하기 위한 예제를 살펴보면 아래와 같다.
- Signature을 생성하기 위한 절차를 처음 소개할때부터 그림으로 한눈에 볼수 있으면 좋을것 이다.

`Signature 생성규약`

<img src='http://photo.toast.com/aaaacd/Dongle/hashing_flow.png' />

<br/>

예를 들어, 아래와 같이 API Key를 문자열인 `4044cac130913f94a5d4979e0401500e` 라고 가정하고, 인증이 필요한 요청정보는 Alphabetical 순서로 append 하여 조합합니다.

API Key | 4044cac130913f94a5d4979e0401500e
--|--
API Parameter 중 인증대상정보를 Append | 944542050178560694342P1510100001

데이터 문자열인 `944542050178560694342P1510100001` 를 UTF-8 Encoding을 이용해 Binary 로 변환하면 아래와 같은 값(HEX 문자열)이 됩니다.

```
3934343534323035303137383536303639343334325031353130313030303031
```

`3934343534323035303137383536303639343334325031353130313030303031` 값(HEX 문자열)을 위의 API Key 문자열인 `4044cac130913f94a5d4979e0401500e` 을 통해 HMAC-SHA256로 해싱하면, 아래와 같은 값(HEX 문자열)이 되며,

```
a6f6c3bfb4d30326db6285c0488e67616b2754f23c946582734d157501cd2c77
```

해싱된 바이너리를 Base64 Encoding 하면 아래와 같은 Signature 문자열을 획득할수 있습니다.

```
pvbDv7TTAybbYoXASI5nYWsnVPI8lGWCc00VdQHNLHc=
```

정리를 하면, `944542050178560694342P1510100001` 인 String Data를 위와 같은 규약으로 `4044cac130913f94a5d4979e0401500e` 문자열의 API Key와 HMAC-SHA256 방식으로 해싱하게 되면 아래와 같은 Signature 문자열을 얻을 수 있어야 합니다.

```
pvbDv7TTAybbYoXASI5nYWsnVPI8lGWCc00VdQHNLHc=
```

> 문서 내에서는 'RFC4648 방식으로 Base64 인코딩하라'라고 간단히 기술했으나, 이것의 내부적인 의미는 다음과 같습니다.
- http://www.ietf.org/rfc/rfc4648.txt

위와 같이 각 플랫폼별로 SDK 및 샘플코드를 제공하는것이 제한된다면, Signature 생성을 위해 필요한 값의 예제를 주고 각 Step별로 기대값을 가이드하면 클라이언트 개발자가 API를 보다 효율적으로 연동하는 사례가 많았다.

## 구현하기

지금까지는 API 요청에 대한 검증을 위한 스펙을 간단하게 정의해보았고, 외부에 이를 공유하기 위한 효율적인 방법을 제시해 보았다. 이어서 Spring MVC를 통해 애플리케이션을 개발한다면 API요청에 대한 검증을 어떻게 처리하며, 각 API에 공통적으로 적용하기 위한 예제를 살펴보도록 하겠다.

#### API검증을 위한 공통 비지니스로직 적용

현재 API Gateway에는 아래와 같은 공통적인 요구사항이 있다고 가정해보자.

- API 요청 클라이언트가 인증된 클라이언트인지 체크
- 각 API 요청정보를 명세된 Signature 값을 통해 검증
- 클라이언트에 대한 인증이 성공적이라면, 자주 참조하는 클라이언트의 세션정보를 캐싱한다.

<img src='http://photo.toast.com/aaaacd/Dongle/call_stack.png' />

<img src='http://photo.toast.com/aaaacd/Dongle/app_stack.PNG' />

아래와 같이 Controller의 Method Parameter에 @ValidSignature 어노테이션과 DeviceSession 클래스를 정의하면, API요청에 대한 Signature 검증을 하고 정상적이면 DeviceSession에 필요한 Cached Data를 간단하게 전달받을 수 있습니다.

```java
@RequestMapping(value = "/auth/v1/authentication", method = RequestMethod.POST, headers = {"Content-Type=application/json"})
public Response authentication(@RequestBody AuthenticationRequest request, @ValidSignature DeviceSession deviceSession) {
    LOGGER.info(request.toString());
     
    AuthenticationResponse response = authenticationService.authentication(request);
    return new ResponseObject<>(response);
}
```

`MDCFilter / DeviceInterceptor`

요청 정보에 대한 MDC 값을 획득하고, IP정보와 같은 공통적인 수집사항은 Inteceptor를 정의하여 확인할수 있도록 한다.

`HandlerMethodArgumentResolver 등록`

`org.springframework.web.method.support.HandlerMethodArgumentResolver` 인터페이스를 구현한 Bean을 등록한다.

`@ValidSignature`

API 요청에 대한 Signature를 검증한다.

`DeviceSession`

인증이 성공된 요청에 대해 캐싱된 세션정보 Controller의 Method Argument를 통해 전달한다.

## Summary

지금까지 클라이언트에서 다양한 Back-End 시스템에 직접 연동하는것이 제한이 될때 필요한 시스템 구성을 살펴보았고 이를 API Gateway의 역할이라고 설명하였다. API Gateway에서 일관적인 API를 제공할 때 API 요청에 대한 검증을 위한 스펙은 각 시스템의 상황에 맞게 정의하면 될 것 이다.

중요한 것은 유행하는 아키텍쳐를 수립하기 보다는 어떠한 문제가 있으며 이를 해결해나가기 위한 방법이 어떠한 것들이 있는지 작은 단위부터 접근해 나가는것이 좋을듯 하다.

## References

> https://en.wikipedia.org/wiki/Hash-based_message_authentication_code
http://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/