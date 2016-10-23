## Overview

안드로이드 개발 시에 디바이스 정보를 조회해야 되는 경우가 생기는데 , 그중에서도 디바이스의 고유한 번호를 획득하는 일은 빈번하게 발생한다. 

예를 들면 고유한 디바이스의 정보를 저장 해 애플리케이션의 설치 상태를 확인한다 던가, 다양한 인증 서비스를 제공할 때 보다 쉽게 서비스를 이용할 수 있도록 게스트 로그인 같은 기능을 제공할 때 디바이스에 대한 식별이 필요할 때가 있다.하지만 Android SDK는 API Level 이 업데이트되면서 이에 대한 정보를 획득하는 데에 대한 이슈가 있는데, 간단하게나마 정리해보고자 한다. 


### TelephonyManager 


지난 시간 동안 일반적인 경우에는 Hardware 단위로 제공 하는 identifier 를 통해 디바이스의 고유 번호를 획득 하고는 했다. TelephonyManager 클래스를 통해 Phone의 IMEI, MEID 또는 ESN 값을 획득 한다.

예를 들면 아래와 같다.

``` java
public void precess() {
     TelephonyManager manager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
     manager.getDeviceId();
}
```

하지만 TelephonyManager  를 통한 방법은 아래와 같은  이슈가 있다.

- Non - Phone : 핸드폰 번호를 갖고 있지 않는 태블릿 이나 Wifi 만을 제공 하는 디바이스는 TelephonyManager 를 통한 디바이스 번호를 획득 하지 못 할 수도 있다.

- Persistence : 한번 생성된 번호에 대한 지속 여부를 보장 할 수 가 없다. 디바이스가 공장 초기화 될 경우를 예로 들 수 있다. 뿐만 아니라, 현재 까지 몇몇 버그들이 report 되어 왔다. 안드로이드 디바이스는 제조사 마다 다양하게 커스터마이징 하기 때문에 000000000000000 같이 의미 없는 값이나 null 이 반환 되기도 한다.

- Privilege : 디바이스에 접근 하기 위해  READ_PHONE_STATE  권한 설정이 필요 하다. 



### Mac address

Wifi 나 blue-tooth 를 사용 하는 디바이스에서 획득 가능 하다. 하지만 디바이스의 고유 번호를 획득 하기 위한 용도로는 추천 되지 않는다. Wifi 가 항상 켜져 있다고 보장 할 수 없을 뿐만 아니라 모든 기기가 고유번호를 반환 하는 것이 아니기 때문이다.




### Serial Number

안드로이드의 API Level 9 (진저브레드 2.3) 이후 부터 제공 하는 고유 번호 로서 TelephonyManager 클래스를 통한 획득 보다는 안전 하다고 할 수 있지만 2.3 미만의 Version 에서는 문제가 발생 할 수 가 있다.

API Level 9 부터 제공 하기 때문에 @SuppressLint("NewApi") 를 추가 해야 되기 때문에 아래와 같이 Java reflection을 통해 획득 하는 것이 좋다. 

``` java
private static String getDeviceSerialNumber() {
  try {
    return (String) Build.class.getField("SERIAL").get(null);
  } catch (Exception ignored) {
    return null;
  }
}
```


### ANDROID_ID

가장 명확한 방법이며, 디바이스가 최초 Boot 될때 생성 되는 64-bit 값이다. ANDROID_ID는 디바이스의 고유한 번호를 획득 하기 위해 가장 좋은 선택이 될 수 있다. 

### Settings.Secure.ANDROID_ID
하지만 ANDROID_ID 또한 단점이 있는데, Proyo 2.2 이전 Version 에는 100% 디바이스 고유 번호를 획득 한다고는 보장 할 수 없으며, 몇몇 Vendor 에서 출하된 디바이스에 동일한 고유 번호가 획득 된다는 버그가 report 됐다는 것이다.




## 결론 

지금 까지 안드로이드 플랫폼에서 디바이스를 구별하기 위한 고유한 번호를 획득 하는 방법을 알아 보았는데, 물리적으로 100% 보장 할 수 없다는 것이고, 이로 인해 결코 쉽지 않은 일이라는 것을 알 수 있었다. 가장 좋은 방법은 ANDROID_ID를 통해 획득 하는 방법이며, 다른 해결책을 혼용 해 사용하는 것도 좋을 방법 일 것이다. 여기에 위에 나열된 예상 되는 이슈 들과 같은 만일의 사태에 대한 대비책을 만들어 놓는 것도 좋을 것 이다.


## References
http://android-developers.blogspot.kr/2011/03/identifying-app-installations.html#uds-search-results 

