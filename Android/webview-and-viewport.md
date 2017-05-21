## Android Webview

android에서 webview는 사실 꽤 한계가 많아보인다.
가장 큰 단점으로는 javascript 처리 속도가 늦다는 점을 들 수 있다. 경쟁사(?)에 비해서 싱글코어의 성능이 낮다보니 구조상 어쩔 수 없는 문제라고 한다.
ionic, cordova 등의 hybrid app등의 발목을 잡는 문제도 바로 이 성능문제에 기인한다.

때문에 `webview` 관련 이슈를 정리해 보려고 한다.

---

## Android webview memory leak

메모리 누수 문제가 있다.
android webview가 컨텐츠 중에서 중요한 부분을 차지한다면 반드시 체크해봐야 하는 문제이다.

잘 알려진 해결 방법은 다음과 같다.

* `activity` 대신 `applicationContext` 사용
* `layout xml`에서 `webView` 정의하지 않고, 코드로 추가
* `onDestroy`에서 `webView.removeAllViews()` 및 `webView.destroy()` 실행

---

## Android webview iframe에서 javascript 동작 문제

일반적인 상황인지는 모르겠지만, iframe태그로 포함된 컨텐츠에서 javascript가 동작하지 않는 경우가 있다.

아래 코드를 추가해보자.

``` java
    WebSettings webSettings = webView.getSettings();
    webSettings.setDomStorageEnabled(true);
    webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
    webSettings.setSupportMultipleWindows(true);
``` 

---

## Android webview viewport 문제

API 17버전 이하에서, input 태그 항목에서 입력을 받을때 화면이 확대되는 문제가 있다.
여러가지 방법을 시도해본 결과, 아래와 같이 해결 할 수 있었다.
버그를 일으키는 API 17이하의 webView를 위한 코드를 베이스로 하고
문제가 없는 API 18 이상의 webView에서는 viewport를 initialScale로 무시하도록(?) 했다.

* html side

``` html
    <meta name="viewport" content="width=720px, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5">
```

* android side

``` java
    if (Build.VERSION.SDK_INT > 18) {
            webView.setInitialScale(100);
    }

    WebSettings webSettings = webView.getSettings();
    webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
    webSettings.setDisplayZoomControls(false);
    webSettings.setBuiltInZoomControls(false);
    webSettings.setLoadWithOverviewMode(false);
    webSettings.setUseWideViewPort(false);
```
