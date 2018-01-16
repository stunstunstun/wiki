---
title: AWS EC2 시작하기
date: 2016-10-21 22:37:31
desc: Amazon Web Service의 기초가 되는 EC2
image: http://www.ybrikman.com/assets/img/blog/github-pages/github-pages.png
categories: devops
---

EC2는 Amazon 데이터 센터의 가상 Computing 서버를 유연하게 사용할 수 있게 만들어주는 서비스입니다. 서버 애플리케이션을 EC2에 배포하여 서비스하거나 애플리케이션의 빌드 용도로 사용할 수도 있습니다.

> AWS EC2 Documentation
https://aws.amazon.com/documentation/ec2/

## AWS EC2 Instance 생성

먼저 AWS Services에서 EC2를 사용하기 위해서는 Create Instance를 통해 아래의 화면에 진입해야 합니다. 이 문서에는 Amazon Linux AMI를 선택하여 가상서버를 생성하고 접속하는 방법을 설명하고자 합니다.

![step0](http://image.toast.com/aaaaahq/aws-ec2-step0.png)

#### Amazon Linux AMI

Amazon Linux AMI는 CentOS를 Base로 AWS에서 제공하는 Linux AMI입니다. CentOS와 호환성이 뛰어나며, AWS의 다양한 서비스와 가장 궁합이 잘 맞다고 설명하고 있습니다. Amazon Linux AMI에 대한 자세한 설명은 아래의 링크를 참조하면 된다.

- https://aws.amazon.com/ko/amazon-linux-ami/

> The Amazon Linux AMI is an EBS-backed, AWS-supported image. The default image includes AWS command line tools, Python, Ruby, Perl, and Java. The repositories include Docker, PHP, MySQL, PostgreSQL, and other packages.

####  Free Tier 사용하기

EC2에서는 사용자의 목적에 따라 다양한 종류의 스펙의 Machine을 제공하는데, 가입 후에 12개월동안 무료로 제공하는 Free Tier Eligible 상품을 통해서 AWS를 학습하고 적용하는데 많은 도움을 받을 수 있습니다. Free Tier로 사용할 수 있는 상품들은 아래와 같이 Instance를 생성하면서 웹서비스에서 안내 받을수 있습니다.

![step1](http://image.toast.com/aaaaahq/aws-ec2-step1.png)
- **More** - https://aws.amazon.com/free/

#### Security Group 설정하기

EC2의 Instance Type을 설정했다면 가상서버에서 Security Group을 설정해야 하는데 default 값은 내부 접근만을 허용하고 외부에서의 모든 접근은 차단되는 상태를 말합니다. 외부에서의 SSH접속과 Tomcat Port를 위해 아래와 같이 Security Group을 설정하도록 합니다.

![step2](http://image.toast.com/aaaaahq/aws-ec2-step2.png)

#### Key pair 생성 및 Instance 연결하기

생성된 Instance에 접근하기 위해서는 pem 형식의 파일인 private key file이 필요한데 **Download Key Pair** 버튼을 통해 다운로드 할 수 있으며, 다운로드가 완료되면 **Launch Instances**를 통해 Instance 생성을 완료 합니다.

![step3](http://image.toast.com/aaaaahq/aws-ec2-step3.png)

아래는 Instance에 연결하기 위해 AWS에서 가이드하고 있는 내용이다

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html?icmpid=docs_ec2_console


**SSH Connection**

```shell
$ ssh -i "private-keyfile.pem" [public-DNS]
```

**SSH Client**

- Putty와 같은 클라이언트 프로그램을 통해 접속한다. (Find out how to [Connect using Putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html?console_help=true)
- 생성한 private-keyfile의 위치를 지정하면, Terminal을 실행시킬 때 자동으로 찾게 된다.
- Your key must not be publicly viewable for SSH to work. 필요하면 아래와 같이 파일 권한을 수정한다:

````
chmod 400 [private-keyfile.pem]
````
- Public DNS를 통해 최종적으로 EC2 인스턴스에 연결합니다

## 참고 할 내용

> https://aws.amazon.com/autoscaling/

- 데이터 센터를 기준으로 **Region**이라는 단위로 서비스영역을 나누고 있습니다. 만약 국내에서 서비스 한다면 Seoul Region를 선택하는 것을 추천합니다. Region은 세계 어느곳에서 자유롭게 선택하여 사용할 수 있습니다.

- Availability Zone은 물리적으로 많이 떨어져 있다는 개념인데 서로 다른 Zone을 사용하게 되면 재해로 인해 서비스에 영향을 미치는 것에도 대비할 수 있습니다. Availability Zone간에는 물리적으로 전용선으로 연결되어 있어 네트워크 지연 이슈는 거의 없다고 보면 됩니다. 여러 대의 EC2 Instance를 운용하는 경우 Zone을 분산하여 배치하는 것을 추천합니다.

- Computing 서버는 서비스의 규모에 따라 최소한의 스펙으로 시작하고 필요에 따라 조금씩 Scale-up하는 것을 추천합니다. Scale-Up을 위해서는 EC2 인스턴스를 일시 정지 해야하며 AWS에서는 Auto Scaling Group을 통해 자동으로 Scale-Out하는 전략을 제공합니다.

## References
- https://aws.amazon.com/documentation/ec2/
- https://aws.amazon.com/autoscaling/
