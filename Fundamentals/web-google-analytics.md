## Google Analytics 를 통해 웹서비스 분석하기

**Javascript 페이지에 포함시키기**
```
<script type="text/javascript" src="analytics.js" data-id="UA-43100337-1" data-domain="github.com" ></script>
```

**Sources**
```
var tgs = document.getElementsByTagName("script");
var gaID = null;
var gaDomain = null;
var _gaq = _gaq || [];
for (var i = 0, len = tgs.length; i < len; i++) {
    if (tgs[i].src.indexOf("analytics.js") == -1) continue;
    gaID = tgs[i].getAttribute("data-id");
    gaDomain = tgs[i].getAttribute("data-domain");
    if (gaID && gaDomain) break
}
_gaq.push(['_setAccount', gaID]);
_gaq.push(['_setDomainName', gaDomain]);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s)
})();
var GA = {
    getAction: function() {
        var action = null;
        var url = document.URL;
        if (/-cont./i.test(document.domain)) {
            if (/bbs/i.test(url)) action = "bbs";
            else if (/event/i.test(url)) action = "event";
            else if (/coupon/i.test(url)) action = "coupon";
            else action = "etc"
        } else action = "main";
        return action
    },
    handleEvent: function(category, action, opt_label) {
        try {
            if (opt_label == undefined) _gaq.push(['_trackEvent', category, action]);
            else _gaq.push(['_trackEvent', category, action, opt_label])
        } catch (e) {}
    },
    login: function() {
        var category = "login";
        var action = GA.getAction();
        GA.handleEvent(category, action)
    },
    gameStart: function(opt_label) {
        var category = "gameStart";
        var action = GA.getAction();
        GA.handleEvent(category, action, opt_label)
    },
    navi: function(opt_label) {
        var category = "navi";
        var action = GA.getAction();
        GA.handleEvent(category, action, opt_label)
    },
    banner: function(opt_label) {
        var category = "banner";
        var action = GA.getAction();
        GA.handleEvent(category, action, opt_label)
    },
    link: function(category, action, opt_label) {
        GA.handleEvent(category, action, opt_label)
    }
};
```
