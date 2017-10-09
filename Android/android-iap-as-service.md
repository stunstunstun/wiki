---
title: 효율적으로 다양한 안드로이드 마켓의 인앱 결제를 연동하기 위한 전략
date: 2014-05-30 15:24:49
categories: android
---

현재 안드로이드 플랫폼에서 구글 플레이, 티스토어, 네이버 앱스토어를 통해 어플리케이션을 출시할 때 각 마켓에서 제공하는 결제 라이브러리를 연동하게 되는데, 결제 프로세스는 마켓 별로 유사한 형태로 진행 되지만 상이한 내용들도 존재 하며, 마켓별 빌드 버젼을 보다 효율적으로 관리 할 수 있도록 또는 결제 연동을 개발자들이 쉽게 할 수 있도록 하면 좋을 것 입니다.

이러한 문제를 효율적으로 해결하기 위한 라이브러리를 개발하기 위해 고민한 내용들을 정리해 보았습니다.

## 통합 결제 라이브러리 제공을 위한 요구 사항 

- 각 마켓의 In-App Library 를 초기화 하기 위한 인터페이스를 일관적으로 제공 하도록 한다.
- 각 마켓의 통합 결제를 제공 하기 위한 API Interface 및 Listener 를 일관적으로 제공 하도록 한다.
- 아이템 결제 완료 이후 어플리케이션의 크래시와 같은 상황으로 아이템 미지급시 재지급 가능한 방법을 제공 하도록 한다.

#### 자동차 주행 시뮬레이션을 통해 결제 프로세스를 진행 하고 각 마켓 별 결제 및 아이템 지급 시나리오를 진행 해보도록 한다.

- 아이템(GAS) 의 소모 : DRIVE
- 아이템(GAS) 의 구입 : BUY GAS / UPGRADE MY CAR

<img src='https://lh3.googleusercontent.com/QhJ8t3rCP98EgimCKAn1oUNFR857Ke5IuQKsm7Hhukn3JH1hqXHddgj_7KoBAk4-XPFu-XA-tp9OqctoPydI3XQJWUwsJvMwPgqxNGpRRNYQLTaqRYNtqkjQGlFHjKjCww' width='300' />


## Step1] 각 마켓의 관리자 페이지를 통한 어플리케이션의 상품 등록

각 마켓에서 제공하는 개발자 등록 절차 및 상품 관리는 위의 References 를 참조 할 수 있도록 한다.
 
> Google Play - https://play.google.com/apps/publish/ 
Naver App Store - http://appdev.naver.com/ 
T Store - http://dev.tstore.co.kr/devpoc/index.omp

## Step2] 결제를 위한 라이브러리 초기화 

게임이 출시되는 마켓 정보를 기준으로 통합 결제 라이브러리는 마켓의 라이브러리 연동을 위하여 초기화 (Initialize)하는 절차가 필요 합니다. 초기화를 위한 마켓의 PublicKey 와 같은 정보는 클라이언트에서는 암호화 하여 관리하는 것이 유리합니다. `초기화(Initilize)`는 마켓 연동을 위한 Setup 과정이라고 보시면 됩니다.

<img src='https://docs.google.com/drawings/d/s1xSOQWXqX0yhLVnZh-9S_w/image?w=656&h=226&rev=428&ac=1' />

#### 게임 클라이언트 -> Common Billing Library

- 마켓 타입 (구글 스토어 / 네이버 앱스토어 / 티스토어)
- 요청 결과를 전달 받기 위한 Listener 등록


#### 마켓 연동을 위한 외부 라이브러리 초기화

마켓 | API 키 
--|--
Google | PublicKey 
NStore | AppCode, In-App Key, Signature
TStore | AppId

- 각 마켓 빌링 연동에 필요한 PublicKey 와 같은 정보를 빌링 서버에서 전달 받아 클라이언트에서
는 일관적으로 관리 할 수 있어야 한다.
- Common Library 는 PublicKey를 암호화 한 값을 저장 하고, 빌링 서버로 부터 복호화를 위한 Key를 전달 받아 관리
- PublicKey 원본 그대로를 빌링 서버에게 전달 받아 관리

## Step3] 상품 조회 / 결제 & 상품 지급 상태 로그 조회 / 미지급 상품 지급

Common Library의 결제 모듈의 초기화가 정상적으로 완료되면, 각 Market Library와 연동하기 위한 정보와 Market 에 등록한 아이템 리스트 정보, 현재 결제 상태 또는 지급 상태에 대한 정보를 저장합니다.

이를 위해서는 어플리케이션이 실행 후 유저 식별을 위해 로그인 직후 호출 되어야 하며, 초기화 시 관련 프로세스가 이루어 져야 할지 별도의 요청을 두어야 할지에 대한 정의가 필요 합니다. 

<img src='https://docs.google.com/drawings/d/sGvFgjLgaeY2ie8PVn2Y0OQ/image?w=656&h=276&rev=731&ac=1' />

`Public Key`

각 마켓 연동을 위한 마켓에 등록되는 어플리케이션의 고유 정보

`Product List`

어플리케이션에 등록된 상품 리스트 정보로 게임 에서 결제 요청 시 상품의 유효성 체크에 사용 합니다.

`Purcharse Log`

인터페이스 호출 시 로그인 정보가 포함 되어야 합니다. 어플리케이션의 상품에 대한 구매 기록으로 미지급 아이템 지급 시 참조 합니다.  * 유저 고유 번호 또는 디바이스 ID로 식별

`네이버 앱스토어 에서 제공 하는 아이템 리스트`
```
{
   "valid": [{
       "productPrice": 1000,
       "productCode": "1000006734",
       "sellPrice": 1000,
       "productName": "gas",
       "productType": "ONE_OFF",
       "discount": {
           "price": 0
       },
       "advantage": {
           "mileage": 100
       },
       "productStatus": "SALE",
       "offerCancelable": "N"
   }],
   "invalid": []
}
```

`자체 빌링서버에서 제공 하는 결제 로그 / 아이템 지급 로그 예시`
```
{
  "purchase_log": [{
      "purcharseKey": "1000092216734",
      "productCode": "1000006734",
      "purchaseTime": 1398305492044,
      "status": "USED"
  }]
}
```

## Step4] DeveloperPayload 발급 요청 / 결제 요청 (결제고유 번호 발급) / 결제 진행

실제 마켓 에서 사용자가 결제를 하기 위해 결제 UI를 노출 하는 단계 입니다. 결제 요청 시에 Billing Server에서 요청한 Developer Payload 를 전달 받아 요청 시에 서명하게 됩니다. 이후 Developer Payload는 사용자의 결제 단계가 완료되면 결제 유효성 체크를 위해 사용 되어 집니다.

<img src='https://docs.google.com/drawings/d/sPW0pcBAPTlwfaBngNl0xOQ/image?w=656&h=260&rev=865&ac=1' />

`ProductId`

게임 클라이언트에서 결제 요청을 위한 상품의 고유번호를 전달 한다.


`UserKey`

게임 클라이언트에서 결제 요청을 위한 유저의 고유 번호를 전달 한다.


`Developer Payload`

개발자가 결제 요청 시 에 추가 적인 정보나 보안 강화를 위해 임의로 생성한 데이터를 전달 할 수 있다. UserKey 와 같은 정보를 전달하여 결제 완료 이후 영수증 정보와 함께 사용 할 수 있다.

`네이버 앱스토어의 경우 결제 요청 시에 결제 화면 노출과 함께 결제 고유 정보를 Listener 에 전달`
```
{"paymentSeq":"1003224353"}
```

## Step5] 결제 완료 / 영수증 발급 / 상품 소비

사용자의 결제가 완료된 단계 입니다. 마켓에서 완료된 결제에 대한 영수증 정보를 전달 하고, 이후 부터 이를 이용해 자체 서버에서 결제 정보를 관리하게 됩니다. 영수증 정보 이외에 첨부한 Developer Payload가 전달되는데 자체 서버를 통해 관련 정보를 검증 하게 됩니다.

<img src='https://docs.google.com/drawings/d/sRMZvatkT5qbYmEBJ5TyMMA/image?w=656&h=349&rev=1013&ac=1' />

`Google Play 에서 제공 하는 결제 완료 이후 영수증 정보`
```
{
   "orderId": "12999763169054705758.1374081541263051",
   "packageName": "com.sample.billingtest",
   "productId": "gas",
   "purchaseTime": 1396577500292,
   "purchaseState": 0,
   "purchaseToken": "aamhleobcgnmmlgnpiepncjh.AO-J1OwabKCNS0fXo9u8ycee9wOhSGtIrI1EXLp_rGIuAjhv6CE6cPUq1sTPkgNhh_ZlXKdi2sP4DcBTyRdCViHPcypYFultoC9qUseC5C9RPwl-4CcFJKU"
}
```

`네이버 앱스토어에서의 결제 완료 이후 영수증 정보`
```
{
   "receipt": {
       "extra": "extra value",
       "environment": "TEST",
       "paymentSeq": "1003224353",
       "productCode": "1000006734",
       "paymentTime": 1398305492044,
       "approvalStatus": "APPROVED"
   },
   "nonce": 146352893754301450
}
```

`T 스토어에서의 결제 완료 이후 영수증 정보`
```
{
 "api_version": "1",
 "identifier": "1356269388058",
 "method": "purchase",
 "result": {
   "code":"0000",
   "message": "성공처리 되었습니다.",
   "txid": "TX_00000000002264",
   "receipt": “MIIH7QYJKoZIhvcNAQcCoIIH3jCCB9oCAQExDzANBglghkgBZQMEAMIIH7QYJKdDFDFFEFEFEFoZIhvcNAQcCoIIH3jCCB9oCAQExDzANBglghkgBZQMEA…",
   "count": "1",
   "product": [ { “(product information)”}]
 }
}
```

## Step6] 결제 검증 / 영수증(결제 기록) 저장 / 결제 결과 통보


마지막으로, 통합 결제 라이브러리는 Developer Payload 와 각 마켓에 대한 결제 내역(영수증) 을 서버 API를 통해 검증을 요청 하고, 결제 서버는 검증 상태를 갱신하게 되며, 최종적으로 게임 클라이언트에게 결제 결과를 통보 합니다.

<img src='https://docs.google.com/drawings/d/sxWaEQxNEjcSoJqaFiTnpug/image?w=656&h=232&rev=465&ac=1' />

> 게임 클라이언트는 마켓타입과 같은 일관된 정보를 통해 통합 결제 라이브러리를 초기화 하고, 일관된 Interface와 Listener 를 통해 이와 같은 결제 프로세스를 호출 하고 결과를 전달 받을 수 있도록 한다.


## Step7] 아이템 지급


게임 클라이언트는 결제 결과를 전달 받은 이후 정상적으로 결제 프로세스가 완료 되었다면 게임 서버에게 아이템 지급 요청을 하게 되며, 게임 서버에서는 아이템 지급 전 자체 결제 서버를 통해 결제 검증 결과를 확인 후 최종적으로 아이템을 지급 하게 됩니다.

## 통합 결제 프로세스 전체 Flow 요약

지금까지 단계별로 살펴본 결제 프로세스를 정리하면, 아래와 같습니다. 가장 중요한 점은 게임 클라이언트 Layer 를 살펴보면, 각 마켓에 결제 연동을 하고 상품에 대한 구입 요청을 하기 위한 비용이 아래와 같이 줄어든 다는 점입니다.

<img src='https://docs.google.com/drawings/d/sgb5u6j5zjtUzBavustp6XQ/image?w=656&h=492&rev=2846&ac=1' />







