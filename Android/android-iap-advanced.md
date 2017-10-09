---
title: Google 인앱 결제 상품 등록과 보안 이슈 정리
date: 2014-05-09 15:24:49
categories: android
---

Google In-App Billing 연동을 위한 관리자 계정의 생성이 완료 되었다면, 어플리케이션에서 관리 할 상품을 등록 하고, 상품의 결제를 위한 프로세스 정의가 필요 했습니다. 그 과정과 보안 이슈에 대해서 정리 해 보았습니다.

## Google Developer Console (Google 어플리케이션 관리 페이지)                                
Developer Console 은 어플리케이션에서 구매 가능한 다양한 인 앱 상품을 관리 하고 어플리케이션을 발매 할 수 있게 하는 도구 이다. 결제를 위해 관리자 및 개발자가 파악 해야 할 요소는 아래와 같습니다.

- Developer Console을 통한 어플리케이션 등록
- Developer Console을 통한 어플리케이션 APK 마켓에 업데이트 ( 테스트를 위한 알파/베타 Version 등록 가능 ) 
- Google IAB 연동을 위한 프로세스 및 키워드 파악
- Google IAB 연동 이후 서버에 저장 해야 하는 데이터 정의

#### Developer Console 관리 페이지

<img src='https://lh4.googleusercontent.com/Mf-qBDJ76lS8VLMhnWbKgDP0JVTJH_hIcttbTko8ZFwWGaXDomPlXgHC66GXXhL_5uiFP64mZ_tzffLBS-YzEkz7y1y-_iOa6qcSXoCcKKTlteO3u4_VrG9QySqw-Abxow' />

개발자는 단일 아이템 또는 정기 구매 아이템을 포함하는 어플리케이션과 연동된 Digital 상품의 Product 리스트를 생성 할 수 있으며,  각 아이템을 위해 Product ID (Called its SKU), Product Type, Pricing, Description 등과 같은 상세한 정보를 정의 할 수 있습니다.

> Administering In-App Billing - Detail Guide - http://developer.android.com/google/play/billing/billing_admin.html

## 애플리케이션 내 상품 타입

Google Play 는 잡지 어플리케이션 과 같은 정기 구독을 위한 유료화 상품과 게임 서비스 에서 주로 사용 하고 있는 부분 유료화 상품을 제공 합니다. 저희 서비스 특성에 맞게 정기 구독을 제외한 상품에 대해 설명 하도록 하겠습니다.

애플리케이션내에 상품을 등록 하기 위해서는 아래와 같은 메뉴를 통해 등록 할 수 있는데 크게 관리되는 제품과 관리되지 않는 제품으로 나뉘게 됩니다.


#### Google Play에서 관리되는 상품

<img src='https://lh5.googleusercontent.com/WN4Gr1cEJVVd7i1XNu30ykndOBTpqicQgfdeAsCvC03nm0aIkZJkH9kGjVxTeDoaGsAB4KqCCeB8BemWP1k_j9rVBauv8ZnppZrCc0gksGvt-zB3zIlR9OJrPb294WoLSg' />

관리되는 상품은 Google Play 가 유저의 각 아이템 구매 내역에 대한 정보를 저장 하고 관리 해 줍니다. 이후 아이템에 대한 상태 변경을 가능 하도록 해주고, 만약 어플리케이션이 삭제되거나 다른 디바이스에서도 Google Play Server 를 통해 관련 정보를 조회 할 수 있습니다.


## 제품 ID

상품 등록 시 제품 ID는 어플케이션 내의 상품을 구분 하는 고유한 ID 이며, ID 등록을 위해 Google 에서는 아래와 같은 가이드 라인을 제공 하고 있습니다.

`인앱 제품 ID 생성 가이드라인`

중요사항: 제품 ID는 같은 애플리케이션의 모든 항목에서 고유하며 이후에 다시 사용할 수 없습니다.

- ID는 애플리케이션 네임스페이스에서 고유합니다. 예를 들어 애플리케이션 A와 B는 ID가 있는 인앱 제품 '소드(sword)'를 개별적으로 소유할 수 있습니다. 두 '소드'는 서로 독립적입니다. 하지만 애플리케이션 A는 ID가 같은 두 개의 다른 소드를 판매할 수 없습니다.

- ID는 영문 소문자(a-z), 숫자(0-9), 밑줄(_) 및 점(.)으로만 구성되어야 합니다. 또한 영문 소문자 또는 숫자로 시작해야 합니다. 예를 들어 'some_id', '1_2_3' 또는 'a.sword'는 사용할 수 있지만 'SOME_ID', '_1_2_3' 또는 '.a.sword'는 사용할 수 없습니다.

- 이후에 수정하거나 다시 사용할 수 없습니다.


#### Google Play에서 관리되지 않는 상품

관리 되지 않는 상품으로 등록 시 에는 Google Play에서 상품에 대한 정보를 관리 하지 않아, 거래 정보를 직접 구현해야 합니다. 하지만 V3 API 에서는 보안 상 의 이슈로 관리되지 않는 제품으로 등록 시에도 관리되는 제품으로 처리되어 사용 되어 지고 있습니다.


## 아이템 구매 프로세스 & 해킹 이슈

현재 출시되고 있는 대부분의 게임 서비스들은 인 앱 구매를 통한 아이템 상품을 제공 하고 있는데, 클라이언트 취약점으로 인한 해킹과 Freedom 과 같은 결제 해킹 어플리케이션 으로 인한 피해가 상당한 상태 입니다.

안드로이드 디바이스 같은 경우에는 누구나 손쉽게 Rooting 이 가능 해 관리자 권한을 쉽게 획득 가능 하기 때문에, 결제를 위한 개발 시에 이와 같은 점을 고려해 프로세스를 설계 하여야 합니다. Google In-App 결제 연동 프로세스를 살펴 보면서 해킹으로 으로 부터 수익을 지키기 위한 방법을 정리 하였습니다.

Developer Console 을 통해 등록한 상품을 크게 아래와 같은 순서로 결제 및 아이템 지급이 이루어 집니다.

> 상품 정보 조회 & 상세 정보 조회 - 상품 구입 요청 - 상품 구입 완료 - 상품 소진 - 아이템 지급 

<img src='https://lh3.googleusercontent.com/vPNljgYJOfwIp1KwjaIpJnQ-bBNGaXd9Tl-bmIVKv_eHmP85CV1YMDLRzDYadH-G5O5RNpxjeZtP3tROLiYYLR8WV_qquBtGovrhQYA6UiK5BDW-y_aTiBm7ILAWlqjOOQ' />

> http://theeye.pe.kr/archives/2130

결제 요청 부터 상품 지급 까지 의 프로세스를 살펴 보면서 Google 에서 제공 하는 결제 보안을 위한 내용과 추가적으로 피해를 최소화 하기 위한 개선 방법을 알아 보도록 하겠습니다.

#### 어플리케이션의 Public KEY 암호화

In-App 결제 라이브러리를 사용하고 초기화하기 위해서는 아래와 같이 Developer Console 에서 제공 하는 API Key를 이용 해야 하는데,

<img src='https://lh6.googleusercontent.com/uozKg0WISfQkW63IP6W2oX91oX-eyLoewl94PCDXvtm__mTIW3aEqDGyb9c3Y7lLlaXg7GJAwP3PrvZNdtshOKUcaLHug8pDUhWQC_FIVluGrvMESs5PbPfKnOqOUH6xPw' />


API Key는 Base64로 인코딩된 RSA 공개키 로서, Google 에서는 아래와 같이 보안 사항을 권고를 하고 있습니다.

```
API Key를 어플리케이션 코드 내에 바로 삽입 하지 않고, 복호화가 가능한 암호화 (가령 XOR 연산을 예를 들면) 를 이용 하는데, 어플리케이션 실행 시 암호화 하도록 하고, 암호화에 사용하는 키를 서버 로 부터 획득 하는 구조로 구현 하도록 한다. 
```

#### Signature 검증 

상품 결제 완료 이후 또는 영수증 조회 같은 중요한 프로세스 에서는 어플리케이션의 서명 검증 절차를 추가 하도록 한다.

#### 상품 결제 요청 시 Developer Payload 발급 및 검증

Developer Payload 는 상품의 구매 요청 시에 개발자가 임의로 지정 할 수 있는 문자열 입니다. 이 Payload 값은 결제 완료 이후에 다시 전달 받게 되며 결제 요청 시의 값과 차이가 있다면 구매 요청에 변조가 있다고 판단 하면 됩니다.

Payload 검증을 통해 Freedom 과 같은 변조 된 요청을 차단 할 수 있으며, Payload 의 발급 및 검증 프로세스를  자체 서버를 통해 이루어 지도록 합니다.

#### Google 상품 구매 내역 (영수증) 정보 자체 서버 저장 및 서버 API를 통한 검증

Google 체크 아웃을 통해 결제가 완료 되면 아래와 같이 주문번호, 어플리케이션 패키지 이름, 상품ID, 구입시간, 상품 구입에 대한 토큰 정보 등을 전달 받게 되는데 이를 통해 구입의 요청에 대한 검증을 서버에게 위임이 가능 하게 됩니다.

`Google In-App Biliing API 에서 제공 하는 상품 구입 완료 후 응답에 대한 Response 데이터`
```
{
   "orderId": "12999763169054705758.1374081541263051",
   "packageName": "com.joycity.billingtest",
   "productId": "gas",
   "purchaseTime": 1396577500292,
   "purchaseState": 0,
   "purchaseToken": "aamhleobcgnmmlgnpiepncjh.AO-J1OwabKCNS0fXo9u8ycee9wOhSGtIrI1EXLp_rGIuAjhv6CE6cPUq1sTPkgNhh_ZlXKdi2sP4DcBTyRdCViHPcypYFultoC9qUseC5C9RPwl-4CcFJKU"
}
```

`Google In-App Biliing API 에서 제공 하는 상품 소진 완료 후 응답에 대한 Response 데이터`
```
{
   "orderId": "12999763169054705758.1374081541263051",
   "packageName": "com.joycity.billingtest",
   "productId": "gas",
   "purchaseTime": 1396577500292,
   "purchaseState": 0,
   "purchaseToken": "aamhleobcgnmmlgnpiepncjh.AO-J1OwabKCNS0fXo9u8ycee9wOhSGtIrI1EXLp_rGIuAjhv6CE6cPUq1sTPkgNhh_ZlXKdi2sP4DcBTyRdCViHPcypYFultoC9qUseC5C9RPwl-4CcFJKU"
}
```

실제 Google 체크 아웃에서 결제에 대한 프로세스가 완료 되면 어플리케이션 및 게임 에서는 상품 구입 완료 -> 상품 소비 -> 아이템 지급 과 같은 절차를 진행 하게 됩니다. 여기서 중요 한 것은 상품의 구입이 유효한지 검증 하는 절차와 아이템 지급이 서버에서 이루어지는 것이 안전 하다는 것 입니다.


## 마치며


무엇보다 중요한 건 이러한 결제 프로세스 내 에서 클라이언트는 어떠한 경우에도 안전 하지 않는 것 입니다. API Key & Developer Payload 와 같은 값의 발급 및 검증은 서버에게 위임 하고 클라이언트는 이러한 프로세스에 대한 요청을 하고 응답을 받는 구조로 설계 되어야 합니다. 

지금 까지 설명한 내용을 아래와 같은 Flow 로 정리 할 수 있습니다.

<img src='https://lh3.googleusercontent.com/RfvKgEwwRAKNwrJF2kIQcXj_CIYynuLbaMA5oMSbcTlP60sjcFo3blnTKwzma66ANqCYqMWjuzJ9BQyjcPy_7W2agtWro6bK_En6VpOx3a0btCLkdECHCWBmZWJ1u6L7jw' />

> http://theeye.pe.kr/archives/2130

Google 에서는 아래와 같이 특정 상품에 대한 구매 기록(결제 영수증) 에 대해 조회 할 수 있는 서버 API를 제공 합니다. 

> https://developers.google.com/android-publisher/v1_1/ 


위에서 살펴 본 내용 중 Google 체크 아웃 결제 완료 후 packageName, productId, purchaseToken 과 같은 값이 서버에서 유효성 검증을 위해 사용 되어 집니다. 이 API를 통해서 아이템 지급 전에 실제 유효한 검증 인지 체크 하는 것으로 대부분의 해킹을 차단 할 수 있습니다.

또한 위와 같은 과정에 대한 로그 정보를 저장 한다면 유저 CS 시에 어떠한 유저에게 상품이 지급 되어야 하는 지에도 유용하게 쓰일 수 있게 됩니다.

## References

- http://developer.android.com/google/play/billing/index.html 
- http://theeye.pe.kr/archives/2130
