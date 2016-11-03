## Overview

보통 웹사이트의 페이지에서 유저의 행동을 추적하기 위한 통계 정보을 위해서 Google Analystic 를 사용하곤 한다. 그 중 예를 들면 사용자가 게임 스타트 버튼을 클릭하거나, 특정 카테고리의 어떤 메뉴를 선택했는지에 대한 Tracking 이 가능한 것이 가장 눈에 띄였다. Dev Guide 에서는 Event Tracking 이라는 메뉴를 살펴보면 된다.


**Google Analystic Service**

- Service : http://www.google.co.kr/intl/ko/analytics/

- Dev guide : https://developers.google.com/analytics/ 


### PageView 수집하기

아래는 통상적인 페이지뷰 통계 수집을 위한 javasscript 코드 이다.

```javascript
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-XXXXX-X']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
```


### 사용자 Event 트래킹하기


```javascript
_gaq.push(['_trackEvent', 'Videos', 'Video Load Time', 'Gone With the Wind', downloadTime]);
```

위의 샘플은 이벤트 기반의 코드인데, 이벤트는 Category 와 Action Event / Event Label 로 나뉘는데, 

 ![event](http://cfile26.uf.tistory.com/image/25509443511AECD9382C3C)
 
- Category는 해당 이벤트에 대한 명칭
- Action은 해당 이벤트의 동작 또는 위치
- Event Label은 기타 필요한 정보를 삽입 하면 좋을듯 하다.



### 서비스 적용

실제 서비스에 적용해 보았는데, 서비스에 맞게 Event를 처리하는 Javascript Object 를 정의하고 여러 페이지에서 재사용하기 위해 아래와 같이 Service ID 와 Domain 정보를 script 에 어트리뷰트로 추가 하게 끔 구성하였다.

````javascript
<script type=”text/javascript” src="analytics.js" data-id="UA-XXXXXX-1" data-domain="joycity.com"></script>
````

### 공통 집계 요소 ( Event Category )
 
 게임 포털에 속한 모든 하위페이지에서는 아래의 Event에 대해 수집하고 싶었다.
 
 - 사용자가 게임 스타트 버튼을 클릭할 때	
 - 로그인을 위한 Layer UI 진입 
 - 로그인 
 - 공통 GNB 에 의존적인 링크 선택시

각 서비스에 공통으로 정의된 인터페이스 호출시 위의 script 추가만으로 가능하게 되었고, 실제 유저가 게임스타트 버튼을 호출 한다면, Google Analytics 에서는 아래와 같이 유저 게임을 실행 할때 어떤 페이지에서 시도를 했는지 그리고 원하는 추가정보를 수집 할 수 있게 되었다.

구분 | 설명 
---|---
Category | 게임스타트
Action | 메인 페이지 / 이벤트 페이지 / 게시판 페이지 
Event Label | 기타 정보

### Include를 통해 재사용을 위한 예제

**Javascript 페이지에 포함시키기**
```javascript
<script type="text/javascript" src="analytics.js" data-id="UA-XXXXXX-1" data-domain="joycity.com" ></script>
```

**analytics.js**
```javascipt
var tgs = document.getElementsByTagName("script");
var _gaq = _gaq || [];
var gaID = null;
var gaDomain = null;
for(var i = 0, len = tgs.length ; i < len ; i++ ) {
	if(tgs[i].src.indexOf("analytics_fs.js") == -1 ) continue;
	gaID = tgs[i].getAttribute("data-id"); 
	gaDomain = tgs[i].getAttribute("data-domain");
	if(gaID && gaDomain) break;
}
(function() {
	_gaq.push(['_setAccount', gaID]);
	_gaq.push(['_setDomainName', gaDomain]);
	_gaq.push(['_trackPageview']);
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
var GA = {
	category : "",
	action : "",
	init : function() {
		this.action = GA.getAction();
	},
	getAction : function() {
		var domain = [window.location.protocol, window.location.hostname].join('//');
		var urlWithoutDomain = window.location.href.toString().replace(domain + '/', '');
		var firstPartOfUrlWithoutDomain = urlWithoutDomain.split('/').length > 0 ? urlWithoutDomain.split('/')[0] : 'etc';
		return firstPartOfUrlWithoutDomain == 'main.jce' ? 'main' : firstPartOfUrlWithoutDomain;
	},
	handleEvent : function(category, action, opt_label, opt_label2) {
		try {
			if(opt_label == undefined && opt_label2 == undefined) 
				_gaq.push(['_trackEvent', category, action]);
			else _gaq.push(['_trackEvent', category, action, opt_label, opt_label2]);
		} catch(e) {}
	},
	login : function() {
		GA.category = "login";
		GA.handleEvent(GA.category, GA.action);
	},
	gameStart : function(opt_label) {
		GA.category = "gameStart";
		GA.handleEvent(GA.category, GA.action, opt_label);
	},
	navi : function(opt_label) {
		GA.category = "navi";
		GA.handleEvent(GA.category, GA.action, opt_label);
	},
	banner : function(opt_label) {
		GA.category = "banner";
		GA.handleEvent(GA.category, GA.action, opt_label);
	},
	link : function(category, action, opt_label, opt_label2) {
		if(!category) return;
		GA.handleEvent(category, action, opt_label, opt_label2);
	}
};
(function() {
	GA.init();
})();
```

### 마치며

이외에도 Google Analystic은 모바일을 클라이언트를 위한 SDK를 지원하는듯 하며, 웹서비스 API 형태로 Google Analystic을 사용 가능 한것으로 미루어 보아 조금 더 관심을 가지면, 손쉽게 유저의 행동에 대한 정보를 효율적으로 수집이 가능 할 듯 싶다.
