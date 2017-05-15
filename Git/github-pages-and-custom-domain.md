---
title: Github Pages에 Custom Domain 적용하기
date: 2017-05-15 15:14:40
desc: Github Pages 더 활용하기
image: https://cdn.dribbble.com/users/14268/screenshots/949452/photo-x2.png
categories: tutorials
---

<img src='https://cdn.dribbble.com/users/14268/screenshots/949452/photo-x2.png' width='500'>

이 포스팅은 [`Github Pages와 Hexo를 통해 30분만에 기술 블로그 만들기`](http://holaxprogramming.com/2017/04/16/github-page-and-hexo/) 후에 Github Pages에 새로운 Domain을 적용하는 과정을 담고 있습니다. Github Pages를 통해 블로그를 만들고 싶다면 먼저 위의 글을 참고해주세요. 자 그럼 시작해 볼까요, 기본적으로 Github Pages를 통해 정적 페이지(Static Page)를 호스팅(Hosting)하는 경우에는 아래와 같은 도메인(Domain)을 제공 받게 됩니다.

```
USERNAME.github.io
```

그렇다면 직접 DNS을 구입해 Github Pages에 적용 할 수는 없을까요? Github에서는 Custom DNS를 통해서 새로운 Domain을 Github Pages에 적용 할 수 있도록 하고 있습니다. 지금 보시는 블로그 역시 같은 방법으로 github.io 에서 Custom Domain으로 변경하여 운영하고 있습니다.

## Github Pages 설정

Github Pages의 Repository 메뉴의 `Settings > Options > Github Pages` 로 이동:

<img src='http://image.toast.com/aaaaahq/git-page-ssl.png' />

Github Pages 메뉴의 Custom domain을 자신이 소유하고 있는 Domain 주소로 변경하면, Repository의 Root 디렉토리에 아래와 같이 [`CNAME`](https://en.wikipedia.org/wiki/CNAME_record) 파일이 생성 됩니다. 이후에는 USERNAME.github.io 접근되는 요청은 변경된 Domain으로 Redirect 됩니다.

**CNAME**
```
www.holaxprogramming.com
```

> 참고
https://github.com/holaxapps/holaxapps.github.io/blob/master/CNAME

## DNS 설정

그 다음으로는 Domain을 구입하신 서비스에서 DNS에 대한 Host Records 설정을 해야 합니다. 안녕 프로그래밍의 DNS은 Namecheap이라는 서비스를 통해 운영되고 있습니다

#### Host Record 설정

Github에서는 Github Pages에서 Custom Domain을 사용할 경우에 DNS 설정을 아래와 같이 반영할 것을 요구하고 있습니다. Advanced DNS Guide: If your custom domain name is `example.com` you need to modify the Host records information as shown below.

Type | Host | Value
--|--|--
A Record | @ | 192.30.252.153
A Record | @ | 192.30.252.154
CName Record | www | USERNAME.github.io

> A Record는 Domain을 물리적인 IP 주소로 연결 할 수 있도록 합니다. 192.30.252.153, 192.30.252.154는 Github Page의 Static Page를 관리하는 IP입니다.
CName은 물리적인 IP 주소가 아닌 다른 Domain을 연결 합니다. 대상 Domain의 IP의 변경 내역을 알 필요가 없습니다.

<div class='tip'>
혹시 Github Pages와 Hexo를 통해 블로그를 만들었는데 위의 모든 과정을 진행 하였음에도 불구하고 CNAME 파일이 원하는대로 생성되지 않았나요?
</div>

#### 그렇다면 Hexo에서 CNAME 플러그인을 설정할 필요가 있어요

CNAME 생성을 위한 패키지를 아래와 같이 설치하세요

```bash
npm install hexo-generator-cname --save
```

그리고 `_config.yml` 파일에서 아래와 같이 플러그인 설정을 해주시면 됩니다.

```yml
plugins:
- hexo-generator-cname
```

`_config.yml` 에서 url 이름도 적용한 Domain과 일치하는지 확인해 보세요.

```yml
url: https://www.holaxprogramming.com
```

## 참고

- https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/
- https://developer.ubuntu.com/en/blog/2016/02/17/how-host-your-static-site-https-github-pages-and-cloudflare/
- https://support.dnsimple.com/articles/differences-a-cname-records/
- https://www.namecheap.com/support/knowledgebase/article.aspx/579/2237/which-record-type-option-should-i-choose-for-the-information-im-about-to-enter
