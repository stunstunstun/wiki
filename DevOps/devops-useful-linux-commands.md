---
title: 유용한 리눅스 명령어 모음
date: 2017-06-20 15:24:49
categories: devops
---

## Table

- [Files](#Files)
- [Resources](#Resources)
- [Network](#Network)

#### Files

```bash
$ cp -i python-get-started.md ~/github/awesome-wiki/Python
```

```
$ mkdir -p
```

```
$ tail -f catalina.out
```

#### Resources

```bash
$ ps -ef | grep node
```

```
$ top
```

```
$ nproc
```

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

#### Network

```
$ telnet 127.0.0.1 80
```

```
$ ssh -x -l irteam 127.0.0.1
```

```
$ rlogin
```

```
$ rsync
```