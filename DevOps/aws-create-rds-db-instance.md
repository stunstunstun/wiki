---
title: AWS RDS 시작하기
date: 2016-10-22 22:37:31
desc: Amazon Web Service의 든든한 저장소
image: https://1.bp.blogspot.com/-5HaWl2nXjtc/Vx9EPVBhwHI/AAAAAAAAEto/HffgsQazTgALl0MjjVE_pBaNX5QJjSN7ACLcB/s1600/Amazon-RDS%2B%25281%2529.png
categories: devops
---

AWS RDS는 Relational Database Service로 문자 그대로 AWS의 클라우드 환경에서 관계형 데이터베이스를 운영하기 위한 초기 설정, 운영, 스케일링을 쉽게 할 수 있도록 도와주는 서비스이다.

<!--more-->

<img src='https://1.bp.blogspot.com/-5HaWl2nXjtc/Vx9EPVBhwHI/AAAAAAAAEto/HffgsQazTgALl0MjjVE_pBaNX5QJjSN7ACLcB/s1600/Amazon-RDS%2B%25281%2529.png' />

## RDS의 최근 New Features

<img src='https://image.slidesharecdn.com/dat304-151009185056-lva1-app6891/95/dat304-amazon-rds-for-mysql-best-practices-2-638.jpg' width='500' />

## 시작하기

먼저 AWS RDS를 사용하기 위해서는 Services 메뉴에서 `Database` > `RDS`를 선택한다.

- https://console.aws.amazon.com/rds/

`Launch a DB Instance` 버튼을 통해 새로운 DB Instance를 생성 할 수 있으며 이 문서에는 MySQL를 선택하여 가상서버를 생성하고 MySQL Workbench를 통해 DB서버에 접근하는 방법을 알아보도록 하겠다.

#### DB Instance 생성하기

AWS RDS에서는 아래와 같은 종류의 Engine을 제공하고 있다. 이 문서에서는 MySQL 인스턴스를 생성하도록 하겠다.

- Amazon Aurora
- MySQL
- Maria DB
- PostgreSQL
- Oracle DB
- SQL Server

![aws-rds](http://image.toast.com/aaaaahq/aws-rds-1.png)


**AWS RDS의 요금정책**

RDS는 Instance의 스펙 뿐만 아니라 Engine의 종류에 따라 가격 정책을 다르게 두고 있다. 자세한 가격정책은 아래의 링크를 참조하면 된다.

- https://aws.amazon.com/ko/rds/pricing/

AWS RDS 또한 EC2와 마찬가지로 무료로 사용 할 수 있는 Free Tier서비스가 제공되는데 아래와 같이 Dev/Test 용도의 Instance를 선택하면 된다.

![aws-rds](http://image.toast.com/aaaaahq/aws-rds-2.png)

Free Tier 에 대한 안내사항. 체크박스를 클릭하면 Free Tier에 적합한 스펙의 설정을 자동으로 안내해 준다.

![c](http://image.toast.com/aaaaahq/aws-rds-3.png)

![d](http://image.toast.com/aaaaahq/aws-rds-4.png)

Settings 메뉴에서는 DB Instance의 이름과 관리자 계정을 생성 할 수 있다.

![e](http://image.toast.com/aaaaahq/aws-rds-5.png)

## Advanced Config

지금까지 AWS RDS DB Instance를 생성하기 위한 대부분의 과정을 거쳤고, Security Group과 Monitoring, Back-Up에 대한 정책을 설정 하는 것으로 Instance 생성을 마치게 된다.

#### Security Group 생성하기

그 중 꼭 체크해야 할 부분이 Security Group에 대한 설정인데, DB Instance 생성을 마치고 Client에서 가상서버에 접속이 되지 않아 당황스러울 수가 있는데 대부분이 Security Group에 대한 설정이 잘못된 경우가 많다.

![f](http://image.toast.com/aaaaahq/aws-rds-6.png)

예를 들어 아래과 같이 설정하면 모든 외부 IP에서 3306 Port에 대하여 접근을 허용하게 된다. 실제 운영서버를 관리한다면 Inbound 설정을 통해 접근 할 수 있는 IP를 애플리케이션 서버로 제한하는 것을 추천한다.

![f](http://image.toast.com/aaaaahq/aws-rds-7.png)

## MySQL Workbench

MySQL 서버에 접근하기 위한 다양한 도구가 존재하지만 MySQL Community에서 공식적으로 지원하고 있는 MySQL Workbench를 통해 지금까지 생성한 DB Instance에 접근해보도록 하겠다. 먼저 아래의 페이지에서 MySQL Workbench를 Download한다.

- http://www.mysql.com/products/workbench/

생성한 DB Instance의 정보에서 아래와 같은 Endpoint 정보를 찾을 수 있을 것이다.

```
hola-apps-dev.co8c0mwds2tb.ap-northeast-2.rds.amazonaws.com:3306
```

Endpoint 정보를 통해 Hostname 과 Port 정보 그리고 계정정보를 올바르게 입력했다면,

![f](http://image.toast.com/aaaaahq/aws-rds-8.png)

Test Connection 버튼을 눌러보자. 아래와 같이 성공적인 메세지가 노출된다면 MySQL Workbench를 통해 MySQL를 관리 할 준비가 완료된 것이다.

![f](http://image.toast.com/aaaaahq/aws-rds-9.png)

**접속이 실패했을 경우에는 아래의 이슈를 체크해 보도록 하자**

- AWS RDS의 DB Instance의 Status가 available 상태인지 확인
- Security Group의 정상적으로 설정되어 있는지 확인

## References

- https://aws.amazon.com/documentation/rds/
- http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html
- http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html
