---
title: Ping-Pong 챗봇 만들기
date: 2017-05-09 00:24:49
categories: Python 활용하기
---

### Cloud9 IDE를 통해서 Flask 서버 구동하기

#### Cloud9 가입

#### 프로젝트 Clone 하기

#### Environment Variables 설정

Facebook Messenger 플랫폼에서 제공하는 API를 사용하기 위해서는 운영체제에 아래와 같은 환경 변수(Environment Variables)를 등록 해야 합니다.

Environment Variables | Description
--|--
PAGE_ACCESS_TOKEN | Access token to use Messenger API on Facebook page
VERIFY_TOKEN | Verification token used in Facebook application page

Cloud9에서는 아래와 같은 방법으로 환경 변수를 등록 합니다.

- Run Configurations 화면에서 ENV 선택
- Environment Variables의 이름을 Key로 페이스북에서 발급 받은 토큰 문자열을 Value로 추가 합니다.

등록된 환경 변수는 예제에서 아래와 같이 작동합니다.

**app.py**

```python
VERIFY_TOKEN = os.environ['VERIFY_TOKEN']
PAGE_ACCESS_TOKEN = os.environ['PAGE_ACCESS_TOKEN']
```

### Flask 서버 구동하기

```
$ ./appsetup
$ ./appstartup
```

<br>

## Messenger 테스트

### DOMAIN
- https://fbmessage-sample-holaxapps.c9users.io

### APIs

#### GET

- /webhook?hub.verify_token=token&hub.challenge=0

#### POST

```javascript
{
    'entry': [{
        'id': '593674370829286',
        'messaging': [{
            'recipient': {
                'id': '593674370829286'
            },
            'timestamp': 1492736201468,
            'message': {
                'text': 'Hello',
                'seq': 20675,
                'mid': 'mid.$cAAJBAtBzV-phv0ga_FbjgLRmqtYS'
            },
            'sender': {
                'id': '1280682458654350'
            }
        }],
        'time': 1492736202582
    }],
    'object': 'page'
}
```

```javascript
{
    'entry': [{
        'id': '593674370829286',
        'messaging': [{
            'recipient': {
                'id': '593674370829286'
            },
            'timestamp': 1492736204253,
            'delivery': {
                'seq': 0,
                'mids': ['mid.$cAAJBAtBzV-phv0gk1FbjgLci8gkA'],
                'watermark': 1492736203988
            },
            'sender': {
                'id': '1280682458654350'
            }
        }],
        'time': 1492736204253
    }],
    'object': 'page'
}
```


##### Facebook Messenger
- https://developers.facebook.com/docs/messenger-platform
- https://developers.facebook.com/docs/messenger-platform/guides/quick-start

##### Python
- https://www.python.org/
- https://www.hackerrank.com/dashboard

##### About Chat Bots
- https://brunch.co.kr/@five0203/22
- https://brunch.co.kr/@five0203/23
- https://brunch.co.kr/@wej6688/24
- https://brunch.co.kr/@pilsogood/2

##### Chat Bot Tutorials
- https://dev.botframework.com
- http://dev.goodoc.co.kr/?p=185
- http://www.popit.kr/how-to-make-korean-chatbot/
- https://chatbotsmagazine.com/building-a-serverless-facebook-messenger-chatbot-a18b374a2fa4#.2zc5ji980
- https://techpoint.ng/2017/02/17/facebook-launches-bots-messenger-challenge-2017/
- https://blog.hartleybrody.com/fb-messenger-bot/