

## AWS EC2 Instance 생성

EC2 인스턴스를 생성하기 위해서는 페이지에 아래의 버튼을 선택하도록 한다.

## Amazon Linux AMI

Amazon Linux AMI는 CentOS를 Base로 한 AWS에서 배포하는 Linux이다.
AWS에서는 CentOS와 호환성이 뛰어나며, AWS의 다양한 서비스와 가장 궁합이 잘 맞다고 설명하고 있다

Amazon Linux AMI에 대한 자세한 설명은 아래의 링크를 참조하면 된다.
- https://aws.amazon.com/ko/amazon-linux-ami/

## 생성된 Instance에 연결하기

아래는 Instance에 연결하기 위해 AWS에서 가이드하고 있는 내용이다

- Open an SSH Client (Find out how to [Connect using Putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html?console_help=true)
- Locate your private key file. The wizard automatically detects the key you used to launch the instance.
- Your key must not be publicly viewable for SSH to work. Use this command if needed:
````
chmod 400 [private-keyfile.pem]
````
- Connect to your instance using its Public DNS:
