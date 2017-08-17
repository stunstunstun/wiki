---
title: JVM의 Garbage Collection
date: 2013-07-20 00:49:31
categories: java
---

모든 자바 애플리케이션은 JVM 환경에서 작동한다. JVM의 Runtime Data Area의 메모리 구조와 마찬가지로 Garbage Collection 역시 자바 어플리케이션의 응답 시간과 성능에 밀접한 관계를 가지게 된다. 

<!-- more -->

## Garbage Collector

자바 애플리케이션에서는 C/C++과 같이 개발자가 직접 프로그램 코드에서 메모리를 명시적으로 해제하는 행위를 하지 않는다. 대신 JVM의 Garbarge Collector 가 더이상 사용되지 않는 인스턴스를 찾아 메모리에서 삭제하는 행위를 하게 된다.

#### Stop The World

Garbage Collection는 Garbage Collector가 Heap 영역의 메모리를 JVM이 판단해 더이상 사용되지 않는 인스턴스는 자동으로 할당 된 메모리를 삭제하는 역할을 하는 행위이다.
 
이렇게 메모리를 복사하고 해제 하는 행위를 실행 하기 위해서는 자바 어플리케이션은 GC를 실행하기 위한 Thread를 제외하고 이외의 모든 Thread는 멈추고 GC가 완료된 이후에나 다시 Thread가 실행 상태로 돌아가게 된다.

이와 같이 이외의 모든 Thread의 작업이 멈추는 상태를 `Stop The World`라고 하고 어떠한 GC 알고리즘을 사용 하더
라도 Stop The World 상태에 부딪히게 된다. GC 튜닝이라고 하면 이와 같은 Thread의 작업이 멈추는 시간을 최소한으로 줄이는 행위라고 보면 된다.

#### Garbage Collection을 이해하기 위한 포인트 “젊은 객체” 와 “오래된 객체”

JVM 중 가장 흔하게 사용되고 있다고 생각되는 Sun JVM의 Heap을 통해 Garbage Collections의 프로세스를 살펴보도록 하자. Sun JVM의 가장 대표적인 특징은 Generation Heap 인데 이것은 생명 주기가 짧은 객체에 대한 빠른 생성과 제거를 보장하는 성격을 가지고 있다고 보면 된다.

```
생명 주기가 짧은 객체 >= 생명 주기가 긴 객체
```

> 일반적은 자바 어플리케이션의 경우 오래 유지되는 객체에 비해, 생성된 이후에 짧은 시간 동안에 필요없게 되는 짧은 생명 주기의 객체가 더욱 많다.

이어서 Sun JVM의 Heap은 Old Generation 과 Young Generation으로 구성되어 있다. Young Generation은 다시 Eden과 두개의 Survivor Space로 구성 되어 있다.

`Young Generations`

- 생명 주기가 짧은 “젊은 객체”를 GC 대상으로 하는 영역이다.
- 두개의 Survivor space가 존재
- 해당 영역에서 발생되는 GC를 Minor GC 라고 하며 Major GC에 비해 속도가 빠르다.

`Old Generation`

- 생명 주기가 긴 “오래된 객체”를 GC 대상으로 하는 영역이다.
- 해당 영역에서 발생되는 GC를 Major GC 라고 하며 Minor GC에 비해 속도가 느리다.

<img src='https://docs.google.com/drawings/d/sI_tRdotTJukyfEEKEKt4eg/image?w=253&h=359&rev=262&ac=1' />

## Garbage Collection

위의 Sun JVM의 Heap 영역의 메모리 동작 과정을 간단하게 요약하면 아래와 같다.

1. 최초의 객체는 Young Generations의 Eden에서 생성된다.
2. 이후 Eden이 Full이 GC가 한 번 발생한 후 살아남은 객체는 Survivor 영역 중 From Space로 이동한다.
3. 다시 Eden이 GC가 발생하면 From Space의 객체는 To Space로 이동하게 된다.
4. 마지막으로 이 과정이 반복되면서 객체가 여전히 살아있는 상태라면 Old Generationd 영역으로 이동하게 된다.

<img src='http://d2.naver.com/content/images/2015/06/helloworld-1329-3.png' />

#### 젊은 객체의 생명 주기의 시작과 Minor GC

객체는 최초에 Eden에서 생성이 되고 Eden의 메모리 공간이 `Full`이 되면 메모리 복사가 일어난다고 하였다. 이러한 작업을 Minor Garbage Collection 이라고 하는데, Minor GC시에 Garbage Collector는 Eden의 객체를 검사하여 사용되고 있지 않거나 참조하고 있지 않는 객체는 삭제하고 나머지 살아있는 객체들은 From space가 꽉 찰 때까지 Eden에서 From Space로 이동하게 된다. 

이러한 작업은 짧은 생명 주기를 가질 수 밖에 없는 객체는 최대한 짧게 가지고 있겠다는 Sun JVM의 특징을 그대로 나타내어 준다.

#### 젊은 객체들의 이동

Eden이 다시 Full이 되면 From Space의 Lived 객체는 To Space로 이동한다. 그러나 이것은 논리적으로 그렇다는 것이고 실제로 JVM은 각 Minor GC가 발생할 때 마다 Survivor Space의 포인터를 유지하고 있다가 단순히 From Space에서 To Space로 변경해 주는 것이다. Eden이 다시 Full이 되면 To Space에 있는 Lived 객체는 Old Generation 으로 복사된다.

Minor GC는 매우 빠르고 효율적이다. 소요시간은 Young Generation의 크기에 따라 다르지만 1초 미만이다. 또한 JVM Thread Processing를 멈추게 하는 등의 부작용도 발생하지 않는다. Young Generation이 모두 꽉차게 되면 Garbage Collector는 가용 메모리를 확보하기 위해 Major GC를 수행한다.

#### 오래된 객체와 Majar GC

Major GC의 Garbage Collection은 객체들이 Lived 상태로 있는지 여부를 파악하기 위해 모든 Thread의 실행을 잠시 멈추고 살아있는 객체를 표시하고 사용하지 않는 객체는 제거하여 heap을 정리한다. 이 Major GC는 Thread를 잠시 멈추게 되고 Mark and Sweep 작업을 위해 CPU에 부하를 가하게 되며 이러한 작업은 보통 Minor GC 에 비해 10배 이상의 시간을 사용하기 때문에 성능에 악영향을 주게 된다.

Sun JVM은 앞서 언급한 대로 짧은 운명을 가지고 태어난 객체는 짧게 그리고 장수할 운명을 지닌 객체는 오래도록 유지 시키겠다는 의도를 지니고 있다고 하였다. Sun JVM을 사용할 때는 이러한 의도를 잘 살려 주는 것이 결국 좋은 성능을 내는 것과 밀접한 관계가 있다할 수 있다. 

즉 생명 주기가 짧은 젊은 객체는 Old Generation으로 올라가기 전에 Young Generation에서 제거 되게끔 하고 오래된 객체의 경우 Old Generation에 상주시켜 상대적으로 아주 저렴한 Minor Garbage Collection 만으로 heap의 유지가 가능하게 유도하는 것이 좋다.

이를 위해서는 JVM의 Memory 구성이 중요한데 Young Generation은 전체 Heap의 1/2보다 약간 적게 설정하는 것이 좋고, Survivor Space는 Young Generation의 1/8정도의 크기가 적당하다. 

이렇게 Heap을 구성하기 위해서는 별도의 Option을 주어야 한다. JVM의 Default의 경우는 Young Generation이 작게 잡혀있기 때문에 Default를 사용하는 것은 권장하지 않는다. 다시 얘기하지만 Young Generation이 작으면 젊은 객체가 Old Generation으로 넘어갈 확률이 커지고 이는 결국 Major GC가 발생확률이 높아지는 것이다.

```
$ java -Xms=256m -Xmx=1536m -XX:NewSize=32m -XX:MaxNewSize=512m -XX:NewRatio=2 -XXSurvivorRatio=8 MyApp
```
- `-Xms`, `-Xmx` - Heap 사이즈의 최소, 최대값
- `-XX:NewSize` - Young Generation의 영역의 초기 사이즈
- `-XX:MaxNewSize` - Young Generation의 최대 사이즈
- `-XX:NewRadio` - 위와 같을 경우 Old Generation은 Young Generation의 2배의 크기를 갖는다.
- `-XX:SurvivorRatio` - 위와 같은 경우 Young Generation은 Survivor Space의 8배의 크기를 갖는다.

## Garbage Collection 이 중요한 이유


Garbage Collection이 시스템에 큰 영향을 끼치는 이유는 위에 설명 했듯이 GC를 수행하기 위한 Thread 이외의 모든 Thread의 작업이 멈추기 때문이다. 실시간으로 통신이 필요한 어플리케이션의 경우 Full GC가 일어나 수 초 동안 어플리케이션의 멈춘다면 장애로 이어지게 될 것이다. 웹 어플리케이션의 경우도 같은 상황이 일어난다면 GC가 완료된 이후 Thread가 복구 된다 하더라고 이미 대기하고 있던 수많은 요청으로 인해 시스템이 큰 영향을 끼칠 수도 모르는 일이다.

결국 원활한 서비스를 위해서는 GC를 어떻게 관리하느냐가 시스템의 안정성에 큰 변수로 작용하게 될 것이다. 하지만 마지막으로 주의해야 할 점은 어떤 서비스에서 A라는 GC 옵션을 적용해서 잘 동작한다고 그 GC 옵션이 다른 서비스에서도 훌륭하게 적용되어 최적의 효과를 볼 수 있다고 생각하지 말라는 것이다.

각 서비스의 WAS에서 생성하는 객체의 크기와 생존 주기가 모두 다르고, 장비의 종류도 다양하다. WAS의 스레드 개수와 장비당 WAS 인스턴스 개수, GC 옵션 등은 지속적인 튜닝과 모니터링을 통해서 해당 서비스에 가장 적합한 값을 찾아야 한다.

## References

- http://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/sizing.html
- http://d2.naver.com/helloworld/1329