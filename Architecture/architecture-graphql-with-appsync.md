---
title: AWS AppSync 을 활용한 GraphQL
date: 2021-01-31 11:49:55
categories: GRAPHQL
---

## REST 가 편하잖아?

- 모든 기술은 Trade-off 라는 것이 존재한다.
- API 는 오직 다른 클라이언트에 데이터를 제공하기 위해 존재한다
- REST API 는 클라이언트 입장에서 원하는 목표(데이터)를 명확하게 정의할 수 있는가?

## Thinking in GraphQL

- GraphQL은 클라이언트에서 데이터를 가져오는 새로운 방식을 제시한다
- GraphQL 클라이언트는 `@apollo/client` 를 사용하는 것이 일반적이다
- Facebook 은 Relay 를 왜 만들었을까?

> https://www.apollographql.com/docs/react/
> https://relay.dev/docs/en/thinking-in-graphql/
> https://blog.sapzil.org/2015/10/07/thinking-in-graphql/

## Declarative Programming

- 서버 엔드포인트가 정확한 데이터를 돌려주는 것에 의존하는 대신 클라이언트가 필요한 데이터를 명시한다

## 클라이언트 측 캐싱과 데이터 일관성

```
query { story(id: "123") { id, text, likeCount } }
```

## AWS AppSync

AWS AppSync은 실시간 데이터 동기화 및 오프라인 프로그래밍 기능이 포함된 엔터프라이즈급 완전 관리형 GraphQL 서비스입니다.
