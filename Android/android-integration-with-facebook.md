---
title: 안드로이드 Facebook SDK 연동하기
date: 2014-04-09 15:24:49
categories: android
---

안드로이드 애플리케이션에서 Facebook SDK를 통해 사용자를 인증할 때 필요한 절차를 설명하도록 하겠습니다.

- https://developers.facebook.com/

위의 페이스북 Developer 사이트를 통해 앱 > 앱 새로 만들기를 통해 페이스북 어플리케이션을 생성 합니다. 어플리이케이션의 생성이 완료 되면, 아래와 같이 페이스북 앱 ID를 지급 받게 됩니다.

<img src='https://lh3.googleusercontent.com/r8_p22HcaBxwNVwpVZpfO_aTvi3bN9GOyoCOGDNFQTN0L6SKPcCj6HGm_kvl_WGTp7yVtwlXgXqHv9a7q6_mxKR-AxSwRwDYkFMVUnVS1RWvsjpfIatf879PbnkHjm8MxA' />

> 페이스북 관리자 페이지에서 페이스북 앱 ID를 확인

 
#### Facebook 앱 ID를 등록

안드로이드 프로젝트의 /res/values/strings.xml 에 아래와 같은 정보를 등록
 
```xml
<string name="facebook_application_id">{Facebook APP ID}</string>
```
> {Facebook APP ID} 구간에 지급된 Facebook 앱 ID를 등록
 

#### 페이스북 어플리케이션 관리자 페이지에서의 안드로이드 플랫폼 설정
 	
FacebookSDK를 연동 하기 위해서는 앱 ID 뿐만 아니라 각 플랫폼 별 어플리케이션에 대한 정보가 필요합니다.

> 페이스북 어플리케이션 관리자 페이지 > 설정 >  플랫폼 추가 – Android 추가
	
<img src='https://lh3.googleusercontent.com/ALO66wDLDwsYL_Frh05MdU_TuVg-IiQxFERtzBQguXpvEVmYKdtjWvUk79UvQf2IZz2S-kpgeliN0Qmfw4jDroOhJpExQ8qFDho4oWdllyinFgmdijN3D2NYOzOUf37GYA' />

- Package Name : 안드로이드 어플리케이션의 패키지 이름을 입력 합니다.
- Class Name : 안드로이드 어플리케이션의 MAIN 액티비티 클래스 정보를 입력 합니다.
- Key Hashes : keystore 을 통한 keyhash 값 생성 및 관리자 페이지 등록  

> Keystore & Key Hash : https://developers.facebook.com/docs/android/getting-started 


보통 FacebookSDK 연동 시 자주 발생 되는 이슈는 KeyHash 이슈 인데, 페이스북 앱이 설치된 디바이스에서 SSO 인증을 하기 위해서는 keystore 의 keyHash 값을 페이스북 어플리케이션 관리자 페이지에 등록해야 합니다.

디바이스에 Facebook 앱이 설치 되어 있으면, 내부적으로 FacebookSDK 은 페이스북 앱을 통해 SSO 인증 진행 합니다. FacebookSDK 연동 시 로그인이 되지 않을 때 대부분의 이슈는 KeyHash 값이 일치 하지 않을 때 발생 하는데, 아래의 내용을 참고하면 이슈 해결에 도움이 될 듯 합니다.
  
- 페이스북 관리자 페이지에 등록 될 Key Hash 값은 APK 를 빌드한 PC에서 획득한 Key Hash 이여야만 합니다.
- 페이스북 로그인 시 Key Hash 관련 로그를 확인 하시면 Key Hash 정보가 확인 가능 합니다.
- 만약 계속 이슈가 발생 한다면 아래의 코드를 참고 하시면 직접 Key Hash 값을 획득 할 수 도 있습니다.

`Key Hash 획득을 위한 예제`

```java
public static final String getKeyHash(Context context) {
    try {
        PackageInfo info = context.getPackageManager().getPackageInfo(context.getPackageName(),
        PackageManager.GET_SIGNATURES);
        for (Signature signature : info.signatures) {
            MessageDigest md = MessageDigest.getInstance("SHA");
            md.update(signature.toByteArray());
            String keyHash = Base64.encodeToString(md.digest(), Base64.DEFAULT);
            Logger.d(TAG + "KeyHash:%s", keyHash);
            return keyHash;
        }
       
    } catch (NameNotFoundException e) {
                  Logger.d(TAG + "getKeyHash Error:%s", e.getMessage());
    } catch (NoSuchAlgorithmException e) {
                  Logger.d(TAG + "getKeyHash Error:%s", e.getMessage());
    }   
    return "";
} 
```
 


