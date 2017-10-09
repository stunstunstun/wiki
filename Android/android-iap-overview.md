---
title: Google 인앱 결제 Overview
date: 2014-05-09 15:24:49
categories: android
---

Google 인앱 결제 연동을 위해 관련 문서를 번역해 보았다.

<!-- more -->

> 원문 - http://developer.android.com/google/play/billing/billing_overview.html

이 문서는 안드로이드 플랫폼 에서 어플리케이션에 결제 모듈을 추가 하기 위한 In-App Billing 라이브러리의 기본적인 특징을 설명 하고 있다.

`QUICKVIEW`

> In-App Billing 은 Digital 상의 단일 아이템 또는 정기 구독 아이템을 포함하는 상품을 판매하기 위해 사용 된다.
> Google Play 에 서비스 하는 어플리케이션을 지원 하며, 오직 Google Play Developer Console 계정과 Google Wallet merchant 계정 만을 필요로 한다.
> 결제 처리는 자동으로 Google Play 앱 이 처리하며, 모든 어플리케이션 에서 구매를 위한 동일한 환경의 Look-and-feel을 제공 한다.


## In-App Billing API 
      
<img src='https://docs.google.com/drawings/d/sTlkxrtizHcN0IkagSTlIiA/image?w=313&h=158&rev=132&ac=1' />

어플리케이션은 내부적으로 디바이스에 설치된 Google Play App을 통해 In-App Billing 서비스 API를 접근 하게 된다. 이후 Google Play 앱은 Google Play 서버와 In-App Billing 라이브러리가 적용된 어플리케이션 간 결제를 위한 요청과 응답을 관장 한다.

실제 In-App Billing 이 적용되는 어플리케이션 에서는 Google Play 서버와 직접적으로 통신을 해서는 안되는데, 대신 어플리케이션은 IPC ( Inter Process Communication ) 방식으로 Google Play App과 연결되어 결제 요청을 하게 되며,  요청에 대한 응답 결과를 전달 받게 된다. 정리하면, 결제 프로세스를 적용 하는 어플리케이션은 Google Play 서버 와의 어떠한 네트워크 연결도 관리 하지 않는다.

In-App Billing 는 오직 Google Play 를 통해 발매되는 어플리케이션 에서만 구현 할 수 있으며, 결제 요청을 완료 하기 위해서는 Google Play App이 Google Play 서버에 네트워크를 통해 접근 가능한 상태 여야만 한다.

`In-App Billing의 최신 Version은 Library Version 3` 이며, 안드로이드 대부분의 디바이스 에서의 호환성을 위해 유지 보수 되고 있다. In-App Billing Version 3은 안드로이드 2.2 또는 Google Play 스토어에 설치 된 최신 Version을 지원 하고 있다.  

현재 Android OS Version 분포에 대한 통계 자료는 아래와 같다.

> http://developer.android.com/about/dashboards/index.html	

## Version 3 ‘s  features

* Google Play 에서의 인 앱 결제, 유저의 상품 소유권에 대한 복구에 대한 요청은 보다 더 간결 하고 쉬운 API를 통해 이루어 진다.
* 주문 정보는 구매 완료와 함께 동시에( synchronously ) 디바이스에 전달 된다.
* 모든 구매는 Google Play을 통해 관리 가능 하게 된다. ( 이것을 자세하게 설명 하면 Google Play 가 직접 인 앱 상품의 소유권에 대해서 파악 한다는 것이다. ) 유저는 2개 이상의 동일한 아이템 단위를 소유 할 수 없으며, 오직   구매 시에 하나의 아이템을 구입 할 수 있다.
* 구매한 아이템은 소비 되어 질 수 있는데, 소비 될 때 아이템은 “unowned” 상태로 되돌아 가며, Google Play를 통해서 다시 구매 할 수 있다.
* Subscriptions (정기 구매 상품) 을 지원 


## In-App Products

인앱 상품은 어플리케이션에서 판매 하기 위해 유저에게 제공 되어 지는 Digital 상품 이다. 예를 들면 게임 내 유저의 경험치 또는 새로운 컨텐츠를 업그레이드 하는데 쓰이는 게임 내 통화를 포함 한다.

개발자는 오직 Digital 컨텐츠를 판매 하기 위해 In-App Billling 을 사용 할 수 있으며, 오프라인 상품 또는 개인 서비스 그리고 배송을 포함하는 어떠한 것도 판매하기 위한 용도로는 사용 할 수 없다. 그리고 유료 어플리케이션과 다르게 유저가 구입한 인 앱 상품에 대해서는 환불 창을 제공하지 않는다.

Google Play 는 컨텐츠 제공을 위해 어떠한 양식도 제공 하지 않는다. 어플리케이션에서 판매 하는 Digital 컨텐츠에 대한 모든 책임은 개발자에게 있으며,  인 앱 상품은 언제나 단일 어플리케이션에서만 사용 되어 진다. 이것은 특정 어플리케이션 에서 구매 된 상품은 다른 어플리케이션에서 사용 될 수 없으며, 같은 개발자가 개발한 어플리케이션의 경우라도 마찬가지 이다.

 
#### Product types

In-App Billing 은 어플리케이션을 상품화 하기 위한 방법을 유연하게 제공 하기 위해 다른 타입의 상품을 정의 할 수 있도록 제공 한다. 모든 케이스 에서 Google Play Developer Console 을 통하여 상품을 정의해 생성 할 수 있다.

개발자는 In-App Billing 어플리케이션 에서 상품의 각각의 타입을 명세 할 수 있는데 Google Play 는 어플리케이션의 인 앱 상품 또는 Subscriptions(정기구매 상품) 을 위한 소유권을 하나의 유저 계정 단위로 처리하게 된다.

Product types에 대한 상세한 정보는 In-App Billing Version 3 로 정의된 아래의 링크에서 확인 할 수 있다.

> http://developer.android.com/google/play/billing/api.html#producttypes 


## Google Play Developer Console

Developer Console 은 어플리케이션에서 구매 가능한 다양한 인 앱 상품을 관리 하고 어플리케이션을 발매 할 수 있게 하는 도구 이다. 

개발자는 단일 아이템 또는 정기 구매 아이템을 포함하는 어플리케이션과 연동된 Digital 상품의 Product 리스트를 생성 할 수 있으며,  각 아이템을 위해 product ID (Called its SKU), product Type, Pricing, Description 등과 같은 상세한 정보를 정의 할 수 있다.

개발자는 또한 어플리케이션의 결제 테스트를 위해 Google Play Store 에 발매 하지 않은 테스트 어플리케이션과 테스트 계정을 생성 할 수 있다.

어플리케이션의 상품 리스트를 설정 하게 되는 Developer Console 을 사용 하기 위한 자세한 방법은 아래의 링크를 참조 하도록 한다.

> http://developer.android.com/google/play/billing/billing_admin.html 
 

## Google Play Purchase Flow

Google Play 는 어플리케이션 에서의 구매를 위해 동일한 결제 back-end 서비스가 사용된다. 그래서 각각의 어플리케이션의 유저는 일관되고 친숙한 결제 프로세스를 경험 하게 된다.

> Google Play 에서 In-App Billing 을 사용 하기 위해서는 개발자 또는 관리자는 반드시 Google Wallet merchant 계정을 가지고 있어야 한다.

구매를 시작 하기 위해서는 어플리케이션은 특정 앱 내 상품을 위해 결제 요청을 하게 되고, Google Play 는 그리고 나서 결재 양식을 검증하기 위한 요청을 포함하는 거래를 위한 디테일한 모든 사항을 검증 하는 처리를 하게 된다.

결제 프로세스가 완료 됐을 때, Google Play 는 어플리케이션에 주문 번호, 주문 시간, 상품 가격과 같은 자세한 구매 정보를 전달 한다. 중요한 점은 어떠한 전자 결재에 대한 처리도 당신의 어플리케이션에서 처리 되지 않는 다는 점 이며, 이 역할은 Google Play 에서 하게 된다. 

## Sample Application

개발자의 In-App Billing 의 어플리케이션 연동을 돕기 위해서 Android SDK는 인 앱 상품 또는 정기 구매 상품을 판매 하기 위한 방법을 설명하고 있는 샘플 어플리케이션을 제공 하고 있다.

The TrivialDrive samples for the Version 3 API 샘플은 Driving Game 을 위한 앱 내 상품 그리고 정기 구매 상품을 구현하기 위해 In-App Billing Version 3 API 을 사용 하는 방법을 보여 준다. 이 샘플 어플리케이션은 결제 요청이 어떠한 방법으로 전달 되는지, Google Play 앱 으로 부터의 응답을 어떻게 동시에 처리하는지 설명 하고 있다. 그리고 또한 API를 통한 아이템 소비에 대한 기록은 어떻게 하는 지도 설명 한다. The Version 3 샘플은 인 앱 결제의 동작 과정의 편의를 위한 클래스를 포함하고 있다.

개발자는 어플리케이션에서의 애매 모호한 코드를 주의 해야 한다. 이에 대한 자세한 정보는 `Security and Design` 에서 확인 해 볼 수 있다.

> https://developer.android.com/google/play/billing/billing_best_practices.html

## Etc

#### Purchase Status API

- 개별 아이템에 대한 상태를 확인 할 때에만 API를 사용 할 수 있다. 
- `2013/06/12` 이후의 주문에 대해서만 확인 할 수 있다. 
- 인 앱 결제 Version 3 API로 구매된 모든 아이템 또는 인 앱 결제 Version 1 / Version 2로 구매한 Managed item 에 대해서만 확인 할 수 있다. 인 앱 결제 Version 1 / Version 2로 구매한 Unmanaged Item에 대해서는 Status API를 사용 할 수 없다.


