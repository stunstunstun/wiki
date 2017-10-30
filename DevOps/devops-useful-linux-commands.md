---
title: 유용한 리눅스 명령어 모음
date: 2017-06-20 15:24:49
categories: devops
---

## Table

- [Accounts and login](#accounts-and-login)
- [System](#system)
- [Files](#files)
- [Resources](#resources)
- [Network](#network)

## Accounts and login

```
$ telnet 127.0.0.1 80
```

```
$ rlogin
```

```
$ rsync
```

```
$ ssh -x -l irteam 127.0.0.1
```

```
$ ssh root@210.89.178.113 -p 1024
```

```bash
$ passwd root
```

```bash
$ useradd irteam
$ cat /etc/passwd | grep irteam
$ echo '123!@#' | passwd --stdin irteam
```

## System

`uname`을 통해 리눅스의 커널 정보를 확인한다. 아래의 경우는 x86의 계열의 64비트 OSX의 운영체제를 사용하는 것을 확인할 수 있다.

```bash
$ uname -a
Darwin JungMins-MacBook-Air.local 16.7.0 Darwin Kernel Version 16.7.0: Thu Jun 15 17:36:27 PDT 2017; root:xnu-3789.70.16~2/RELEASE_X86_64 x86_64
```

`man` 명령을 사용하면 해당 명령어가 하는 역할, 각종 옵션, 그리고 예제 등 명령어에 대한 자세한 설명을 볼 수 있다.

```bash
$ man uname
```

`dmesg` 명령을 통해 커널이 메모리를 인식하는 과정과 그 밖에 하드웨어를 인식하고 드라이버를 올리는 과정, 그리고 부팅 시 적용된 커널 파라미터 등을 확인할 수 있다.

```bash
$ sudo dmesg | grep -i mem
```

#### CPU, 메모리, 디스크 정보 확인하기

`nproc` 명령은 멀티 코어 CPU의 개수를 나타낸다.

```
$ nproc
4
```

`dmidecode` 명령을 통해 하드웨어의 정보를 확인한다.

```bash
$ dmidecode -t bios
```

아래와 같이 시스템의 CPU정보를 확인할 수도 있다.

```bash
$ dmidecode -t processor
```

`lscpu`도 비슷한 역할을 한다.

```
$ lscpu
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                4
On-line CPU(s) list:   0-3
Thread(s) per core:    1
Core(s) per socket:    1
Socket(s):             4
NUMA node(s):          1
Vendor ID:             GenuineIntel
CPU family:            6
Model:                 63
Model name:            Intel(R) Xeon(R) CPU E5-2670 v3 @ 2.30GHz
Stepping:              2
CPU MHz:               2296.875
BogoMIPS:              4594.67
Virtualization:        VT-x
Hypervisor vendor:     VMware
Virtualization type:   full
L1d cache:             32K
L1i cache:             32K
L2 cache:              256K
L3 cache:              30720K
NUMA node0 CPU(s):     0-3
```

grep 명령과 조합해서 시스템의 메모리 정보를 확인해보자.

```bash
$ dmidecode -t memory | grep -i size:
```

디스크 정보

```bash
$ df -h
```

## Files

```bash
$ mkdir -p
```

```bash
$ cat
```

```bash
$ echo 'Hello World' > README.md
```

```bash
$ echo $JAVA_HOME
```

```bash
$ touch .gitignore
```

```bash
$ ln -s ~/Github/holaxapps.github.io/source/_posts ~/posts
```

```bash
$ cp -i ./Python/python-get-started.md ~/posts
```

```bash
$ tail -f catalina.out
```

## Resources

```bash
$ ps -ef | grep node
```

```
$ top
```

#### CPU Load average

```
$ uptime
```

```bash
$ vmstat
```

##### Memory resources

리눅스 시스템의 메모리의 전체적인 현황을 가장 빠르게 살펴볼 수 있는 명령은 free 명령이다. free명령은 전체 메모리 용량과, 사용 중 인 용량 그리고 buffers와 cached로 명명되는 캐싱 영역의 용량을 확인하는 데 사용된다.

```bash
$ free -m
```

## Network

#### TIME_WAIT Socket이 서비스에 미치는 영향

클라이언트와 서버는 메세지를 주고 받기 위해 최초로 연결되는 과정을 `3-way handshake`라고 한다. HTTP 통신인 경우에는 통신을 마친 후에는 연결을 종료하는데 이 과정은 `4-way hanshake`라고 불리운다.

우리는 Apache, nginx등을 통해 클라이언트에서 서버의 80 포트로 요청을 보내 실제로 위와 같은 과정이 일어나지 확인 할 수 있다.

```bash
$ sudo tcpdump -A -vvv -nn port 80 -w server-dump.pcap
```

클라이언트에서 `telnet`을 통해 서버에 접속한다.

```bash
$ telnet 127.0.0.1 80
```

통신이 완료되고 연결을 끊는 과정을 살피는 것은 매우 중요하다. 그 이유는 연결을 끊는 쪽에서 TIME_WAIT 소켓이 생성되기 때문이다. 주의해야 할 부분은 TIME_WAIT 소켓은 서버에 생기는 것이 아니고 먼저 연결을 끊는 쪽에서 생성된다는 것이다. `netstat`을 통해 TIME_WAIT 소켓이 몇 개나 있는지 확인할 수 있다.

```bash
$ netstat -napo | grep -i time_wait
```

TIME_WAIT 소켓이 많이지면 어떤 문제가 발생할까? 먼저 로컬 포트 고갈에 따른 애플리케이션 타임아웃이 발생할 수 있다. 리눅스에는 `net.ipv4.ip_local_port_range`라는 커널 파라미터가 있는데 이 파라미터는 외부와 통신하기 위해 필요한 로컬 포트의 범위를 지정하는 역할을 한다. 커널은 프로세스가 외부와 통신하기 위해 소켓의 생성을 요청할 때 해당 소켓이 사용하게 될 로컬 포트에 `net.ipv4.ip_local_port_range`에 정의된 값들 중 하나를 넘겨준다.

이 때 모든 로컬 포트가 TIME_WAIT 상태에 있다면 할당할 수 있는 포트가 없기 때문에 외부와 통신을 못하고 이로 인해 애플리케이션에서는 타임아웃이 발생할 수 있다.

그리고 잦은 TCP 연결 맺기/끊기로 인해 서비스의 응답 속도 저하도 일어날 수 있다. TIME_WAIT 소켓은 어찌 되었든 연결을 끊기 때문에 발생하는 것인데, 지속적으로 통신량이 많을 때도 연결의 맺고 끊기를 반복한다면 그만큼 많은 양의 TCP 3-way handshake가 필요하게 되고 이는 전체적인 서비스의 응답 속도 저하는 야기할 수 있다.

이런 현상을 막기 위해 대부분의 애플리케이션에서는 Connection Pool과 같은 방식을 사용해서 한번 맺어 놓은 TCP 연결을 계속해서 재사용할 수 있게 구현하고 있다. 이를 통해서 불필요한 `handshake` 과정을 줄일 수 있어 성능 향상에 도움이 된다.

하지만 Connection Pool 방식도 단점이 있다. 이에 대한 내용은 TCP Keepalive와 관련이 있다.

#### TCP Keepalive

TIME_WAIT 소켓을 완전히 없앨 수는 없지만 줄일 수 있는 방법이 있다. Reverse Proxy에서 제공하는 Keepalive를 활용하자. Keepalive는 한번 맺은 세션의 요청이 종료되어도 연결을 유지해주는 기능이다.

만약 Keepalive가 설정되지 않았다면 10번의 HTTP요청에 TIME_WAIT 소켓은 10개가 될 것이다. Keepalive를 켜서 해당 TIME_WAIT 소켓의 생성을 줄일 수 있다면 불필요한 TCP 연결/끊기 작업이 없어지면서 응답 속도가 빨라진다.

`Keepalive를 사용하지 않는다`
```
keepalive_timeout 0;
```

`연결이 바로 close된다`

```
$ telnet server.domain.com 80
Trying 127.0.0.1...
Connected to server.domain.com
Escape character is `^]`
GET /index.html HTTP/1.1
Host: server.domain.com

HTTP/1.1 200 OK
Server: nginx/1.9.4
...
Connection: close
```

`nginx.conf에서 keepalive_timeout 수정하기`

```
keepalive_timeout 10;
```

`Keepalive를 통해 연결이 끊어지지 않는 상태`
```
$ telnet server.domain.com 80
Trying 127.0.0.1...
Connected to server.domain.com
Escape character is `^]`
GET /index.html HTTP/1.1
Host: server.domain.com

HTTP/1.1 200 OK
Server: nginx/1.9.4
...
Connection: keep-alive
```

클라이언트에서 계속해서 명령을 입력할 수 있도록 연결이 유지되어 있으며 그 후로 계속 GET 요청을 보내도 끊어지지 않는다. Keepalive의 타임아웃이 10초로 설정되어 있기 때문에 10초가 지나야만 서버에서 먼저 연결을 끊게 된다.

```
$ netstat -napo
```
> `ESTABLISHED` 상태의 소켓에서는 Keepalive 타이머를 확인할 수 있다.

```
$ netstat -napo | grep -i 8080 | grep -i ESTABLISHED
```

TCP Keepalive의 파라미터들

```
$ sysctl -a | grep -i keepalive
```

#### HTTP Keepalive

흔히 TCP Keepalive와 HTTP Keepalive를 혼동하는 경우가 많다. Apache, nginx와 같은 웹 애플리케이션에서도 Keepalive timeout이라는 것이 존재한다. HTTP/1.1에서 지원하는 Keepalive를 위한 설정 항목이다.

TCP Keepalive와 용어가 비슷해서 헷갈릴 수 있지만 두 항목은 큰 차이가 있다. TCP Keepalive는 최대한 연결을 유지하는 것이 목적이다. 만약 두 값 모두 60초라고 한다면 TCP Keepalive는 60초 간격으로 연결이 유지되었는지를 확인하고, 응답을 받았다면 계속해서 연결을 유지한다. 하지만 애플리케이션에서는 60초 동안 유지하고, 60초가 지난 후에도 요청이 없다면 연결을 끊는다.

결론적으로 TCP Keepalive가 설정되어 있어도 HTTP Keepalive가 설정되어 있다면 해당 설정 값을 기준으로 의도했던 대로 동작하기 때문에 TCP Keepalive의 값과 HTTP Keepalive의 값이 서로 다르다고 해도 걱정하지 않아도 된다.

## 참고

- [DevOps와 SE를 위한 리눅스 커널 이야기](http://www.yes24.com/24/goods/44376723)

