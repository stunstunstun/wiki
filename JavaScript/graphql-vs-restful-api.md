---
title: GraphQL 과 RESTful API
date: 2018-01-20 22:00:00
categories: nodejs
image: http://graphql.org/img/logo.svg
profile: https://avatars3.githubusercontent.com/u/12473268?s=400&u=3337a754192e339ee81bc1b4e8a9d223412c6f33&v=4
profile_url: https://github.com/ailrun
desc: GraphQL 대 Restful API?
---

<img src="http://graphql.org/img/logo.svg" />

GraphQL 은 Server API 를 구성하기 위해 Facebook 에서 만든 Query Language 이다.
이 글에서는 Server API 가 무엇인지, 그리고 GraphQL 이 어떤 역할을 하는지에 대해서 알아볼 것이다.

## Server API
Server API (혹은 Server-side web API) 는 적절한 요청을 하였을 때,
그에 맞는 응답을 되돌려주는 창구 (Endpoint) 를 Web 을 통해 노출한 것을 말한다.

이런 Server API 는 어떤 정보들(환율, 주식 시세, 뉴스 ...)을 요청하고 수정하기 위해서 만들어지는 경우가 많다.
Facebook 의 경우에도 글을 쓰면 https://www.facebook.com/webgraphql/mutation/ 과 같은 Domain 으로 요청이 가고,
그 요청에 의해서 Facebook 에 글이 써지게 된다.

이 Server API 를 만드는 방법론 중 하나로 REST 라는 것이 있으며,
이 방법론은 많은 Server API 들을 구성하기 위해 사용되어왔고, 또 현재도 많이 사용되고 있다.

## REST 와 RESTful
[REST] 는 [Roy Fielding] 의
"Architectural Styles and the Design of Network-based Software Architectures" 라는 책에서 소개된 방법론으로,
REpresentational State Transfer 의 줄임말이다.
이 내용이 정확히 무슨 뜻이며, REST 가 무슨 개념을 다 포함하는지 설명하기에는 너무 내용이 길어지게 된다.
따라서 간단히만 설명하면,
모든 Resource (자료, User, ...) 들을 하나의 Endpoint 에 연결해놓고,
각 Endpoint 는 그 Resource 와 관련된 내용만 관리하게 하자는 방법론이다.

예시로 어떤 API 가 Community site 용 API 이며,
이 API 를 사용해 사용자들이 글을 작성/수정/삭제 할 수 있고,
각 글에 댓글을 작성/수정/삭제할 수 있다고 해보자.

이때, API 의 Endpoint 를 다음과 같이 구성하면 REST 의 조건을 간략히는 만족하게 된다.

1. 글 관련 API = /posts
    1. 글 작성 = POST /posts
    2. 글 수정 = PATCH /posts/[postid]
    3. 글 삭제 = DELETE /posts/[postid]
2. 댓글 관련 API = /posts/[postid]/comments
    1. 댓글 작성 = POST /posts/[postid]/comments
    2. 댓글 수정 = PATCH /posts/[postid]/comments/[commentid]
    3. 댓글 삭제 = DELETE /posts/[postid]/comments/[commentid]

(물론 실제 API 에는 이보다 더 많은 것들 (글 가져오기, 회원가입하기, 회원인증하기, 회원정보 확인하기, ...) 이 필요할 것이다.)

이런 REST 의 조건을 만족하는 API 를 RESTful API 라고 부르고, 이런 방식으로 API 를 작성하는 것을 RESTful 하다고 한다.

[REST]: https://en.wikipedia.org/wiki/Representational_state_transfer
[Roy Fielding]: https://en.wikipedia.org/wiki/Roy_Fielding

## GraphQL
GraphQL 은 Graph Query Language 의 줄임말이다.
Query Language 란 무엇인가?
Query Language 는 정보를 얻기 위해 보내는 질의문(Query)을 만들기 위해 사용되는 Computer 언어의 일종이다.
GraphQL 은 이런 Query Language 중에서도 Server API 를 통해 정보를 주고받기 위해 사용하는 Query Language 이다.

GraphQL 은 왜 탄생해야했는가?
다시말해, REST 방법론이 있는데도 새로운 언어인 GraphQL 이 탄생해야했던 배경은 무엇인가?
Facebook 의 [GraphQL blog] 에서는 다음과 같이 이유를 밝히고 있다.

- RESTful API 로는 다양한 기종에서 필요한 정보들을 일일히 구현하는 것이 힘들었다.
- 예로, iOS 와 Android 에서 필요한 정보들이 조금씩 달랐고, 그 다른 부분마다 API 를 구현하는 것이 힘들었다.

이 때문에 정보를 사용하는 측에서 원하는 대로 정보를 가져올 수 있고,
보다 편하게 정보를 수정할 수 있도록 하는 표준화된 Query language 를 만들게 되었다.
이것이 GraphQL 이다.

[GraphQL blog]: http://graphql.org/blog/graphql-a-query-language/

## GraphQL 과 RESTful 의 차이점
GraphQL 을 통한 API 는 RESTful API 와는 다른 측면을 보인다.

1. GraphQL API 는 주로 하나의 Endpoint 를 사용한다.
2. GraphQL API 는 요청할 때 사용한 Query 문에 따라 응답의 구조가 달라진다.

하나하나 살펴보자.

#### API 의 Endpoint
위에서 말했듯 RESTful API 는 Resource 마다 하나의 Endpoint 를 가지고,
그 Endpoint 에서 그 Resource 에 대한 (거의) 모든 것을 담당한다.
반면, GraphQL 은 전체 API 를 위해서 단 하나의 Endpoint 만을 사용한다.

다음의 Github API v3 과 v4 이 좋은 예시가 될 것이다.

- [Github API v3]
- [Github API v4]

각각 [v3 root endpoint] 와 [v4 root endpoint] 로 Endpoint 를 제공하지만,
v4 의 경우 Root endpoint 를 제외한 어떤 Endpoint 도 없는 반면,
v3 의 경우는 각 Resource 마다 수많은 Endpoint 들을 제공한다.

[Github API v3]: https://developer.github.com/v3
[Github API v4]: https://developer.github.com/v4
[v3 root endpoint]: https://developer.github.com/v3/#root-endpoint
[v4 root endpoint]: https://developer.github.com/v4/guides/forming-calls/#the-graphql-endpoint

#### API 응답의 구조
RESTful API 는 하나의 Endpoint 에서 돌려줄 수 있는 응답의 구조가 정해져 있는 경우가 많다.
API 를 작성할 때 이미 정해놓은 구조로만 응답이 오게 되는 것이다.
반면, GraphQL 은 사용자가 응답의 구조를 자신이 원하는 방식으로 바꿀 수 있다.

마찬가지로 Github API 를 예시로 보면,
[v3 repository api] 는 구조가 예시에 나온 모양으로 고정되어 있는 반면,
[v4 api] 의 경우는

```graphql
query { 
  repository(owner: "Ailrun" name: "rxan") {
    nameWithOwner
  }
}
```

를 사용하느냐,

```graphql
query { 
  repository(owner: "Ailrun" name: "rxan") {
    languages(first: 2) {
      nodes {
        name
      }
    }
  }
}
```

를 사용하느냐에 따라서 응답의 구조가 완전히 다르게 된다.
[v3 repository api]: https://developer.github.com/v3/repos/#list-your-repositories
[v4 api]: https://developer.github.com/v4/explorer/

#### GraphQL vs RESTful
이런 차이로 인해 생기는 장단점은 무엇이 있는가?

GraphQL 은 다음과 같은 장점을 가진다.

1. HTTP 요청의 횟수를 줄일 수 있다.
   - RESTful 은 각 Resource 종류 별로 요청을 해야하고, 따라서 요청 횟수가 필요한 Resource 의 종류에 비례한다.
     반면 GraphQL 은 원하는 정보를 하나의 Query 에 모두 담아 요청하는 것이 가능하다.
2. HTTP 응답의 Size 를 줄일 수 있다.
   - RESTful 은 응답의 형태가 정해져있고, 따라서 필요한 정보만 부분적으로 요청하는 것이 힘들다.
     반면 GraphQL 은 원하는 대로 정보를 요청하는 것이 가능하다.
     
두 장점을 예시를 통해 알아보자.
우리가 글의 목록과 각 글에 쓰인 댓글의 목록을 가져올 수 있는 API 가 있다고 해보자.
이 API 가 RESTful 하게 작성되었다면 글과 댓글의 목록을 가져오기 위해서 다음 중 한 가지 방법을 선택해야 할 것이다.

1. 글의 목록을 가져오는 Endpoint 와 댓글의 목록을 가져오는 Endpoint 에 각각 요청을 여러 번 한다.
  글이 5 개 있다고 해보자.
  이 경우에는 글의 목록을 가져오는 Endpoint 에 요청을 하고,
  각 글마다 댓글의 목록을 가져오는 Endpoint 에 요청을 5 번 해야 글과 댓글의 목록을 모두 가져올 수 있을 것이다. (1. 장점)
2. 글의 목록을 가져오는 Endpoint 의 응답에 댓글의 목록을 포함한다.
  글이 5 개 있다고 해보자.
  이 경우에는 글의 목록을 가져오는 Endpoint 에 요청을 1 번 하면 끝이지만,
  글의 목록만 가져와야 하는 경우나 몇몇 글의 댓글만 가져와야 하는 경우가 있다면
  필요한 정보에 비해서 응답의 크기가 쓸데없이 큰 경우가 발생할 것이다. (2. 장점)
3. 글의 목록을 가져오는 요청에 조건을 달아서 댓글의 목록을 포함할 수도, 포함하지 않을 수도 있게 한다.
  API 에 Endpoint 가 많을 경우, API 를 만드는 것이 점점 더 복잡해지고,
  결국 Facebook 에서 GraphQL 을 만든 이유와 비슷한 상황에 처하게 된다.
  
반면 같은 API 를 GraphQL 로 작성하였다면

1. 글의 목록만을 가져와야 할 경우에는 글의 목록만을 가져오는 Query 를 작성하여 서버에 요청을 보낸다.
2. 글의 목록과 댓글을 모두 가져와야 할 경우에는 글의 목록과 댓글을 모두 가져오는 Query 를 작성하여 서버에 요청을 보낸다.

등을 할 수 있다.

그렇다면 GraphQL 은 장점만 가지는가? 물론 단점도 있다.
GraphQL 은 다음과 같은 단점을 가진다.

1. File 전송 등 Text 만으로 하기 힘든 내용들을 처리하기 복잡하다.
2. 고정된 요청과 응답만 필요할 경우에는 Query 로 인해 요청의 크기가 RESTful API 의 경우보다 더 커진다.
3. 재귀적인 Query 가 불가능하다. (결과에 따라 응답의 깊이가 얼마든지 깊어질 수 있는 API 를 만들 수 없다.)

물론 GraphQL 에서 File 전송을 할 수 없는 것은 아니나,
일반적인 GraphQL API 에 비해서 복잡해지거나 외부의 Service 에 의존해야하는 등 문제가 발생한다.

#### GraphQL or RESTful?
그렇다면 GraphQL 과 RESTful 중 어떤 것을 선택해서 사용해야하는가?
다음과 같은 기준으로 선택하면 될 것이다.

1. GraphQL
    - 서로 다른 모양의 다양한 요청들에 대해 응답할 수 있어야 할 때
    - 대부분의 요청이 CRUD(Create-Read-Update-Delete) 에 해당할 때
2. RESTful
    - HTTP 와 HTTPs 에 의한 Caching 을 잘 사용하고 싶을 때
    - File 전송 등 단순한 Text 로 처리되지 않는 요청들이 있을 때
    - 요청의 구조가 정해져 있을 때
    
그러나 더 중요한 것은, **둘 중 하나를 선택할 필요는 없다**는 것이다.

#### GraphQL and RESTful!
File 전송과 같이 RESTful 이 더 유리한 API 가 있을 수 있고,
다양한 정보를 주고받는 것 같이 GraphQL 이 더 유리한 API 가 있을 수 있다.

이럴 때 둘 중 하나만 선택해야할 필요는 없다.
하나의 Endpoint 를 GraphQL 용으로 만들고,
다른 RESTful endpoint 들을 만들어 놓는 것은 API 개발자의 자유다.
주의해야할 것은 하나의 목표를 위해 두 API structure 를 섞어놓는 것은 API 의 품질을 떨어트릴 수 있다는 점이다.
(예: 사용자 정보를 등록하는 것은 RESTful API 로, 사용자 정보를 수정하는 것은 GraphQL API 로 한다면 끔찍할 것이다.)

## 결론
GraphQL 은 여러 장점을 가지고 Server 의 구조를 단순화 시켜줄 수 있는 좋은 Query Language 이다.
다만, GraphQL 의 장점이 언제나 의미를 가지는 것은 아니며, 어떤 조건에서 사용하는지, 어떤 목표로 사용하는지에 따라서
장점으로 작용하기도, 단점으로 작용하기도 한다.
훌륭한 API 개발자가 되기 위해서는
이런 장단점을 잘 파악하여 GraphQL 만 쓸 것인지,
RESTful structure 또한 사용할 것인지,
혹은 RESTful structure 만 사용할 것인지를 결정하는 것이 중요하다.
