---
title: Objective C의  Memory Management
date: 2015-03-04 15:14:40
categories: ios
---

다음은 Apple의 Memory Management에 대한 Reference 이다.

## About Memory Management

- https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/MemoryMgmt.html#//apple_ref/doc/uid/10000011i

- https://developer.apple.com/library/mac/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011226

## Ownership Policy

- 생성하는 모든 객체에 대해 소유권을 갖는다.
- "retain" 을 이용하여 객체의 소유권을 획득 할 수 있다.
- 더 이상 필요 하지 않으면 소유하고 있는 객체의 소유권을 내주어야 한다.
- 소유하고 있지 않은 객체의 소유권은 내주어선 안된다.
- 소유권을 획득한 Scope에서 꼭 소유권을 반환하도록한다!

#### 객체의 소유권에 대한 이해

Objective-C 객체에 대한 행동 |	Objective-C 메서드
--|--
생성, 소유권 획득 | alloc, new, copy, mutableCopy
소유권 획득 | retain
소유권 포기 | release
소멸	| dealloc

#### Create Object
- alloc
- new
- copy
- mutable copy

#### Take Ownership
- retain

## Manual Retain Release

개발자가 직접 Reference Count를 관리하여 메모리를 관리하는 방식. Objective-C에서의 모든 클래스는 NSObject클래스를 상속받게 된다, NSObject는 기본적으로 reference counting pattern을 사용한다.

`Examples`

```objectivec
@interface Person : NSObject
 
@property (retain) NSString *firstName;
@property (retain) NSString *lastName;
@property (assign, readonly) NSString *fullName;
 
@end
  
@implementation Person
// ...
- (void)dealloc
    [_firstName release];
    [_lastName release];
    [super dealloc];
}
@end
```

#### @property

@property에 속성값은 어떻게 정의해야 하는가? @property에 지정하는 객체의 속성의 setter함수와 관련이 있다. setter에서 객체를 지정받을때 아래와 같이 행동한다.

- assign : 객체의 retain count를 증가시키지 않는다. 외부에서 retain count를 감소시켜 객체가 소멸될수 있기 때문에 int와 같은 primitive type에 적합하다.
- weak : assign과 거의 동일하지만 차이가 있다. assign은 객체가 소멸되어도 포인터값이 변하지 않는데, weak는 객체가 해제되는 시점에 포인터값이 nil이 된다. assign의 문제점은 객체가 해제되어도 포인터값이 남아있어 접근하려다 죽는경우가 생긴다. Objective C는 기본적으로 nil에 접근할때는 오류가 발생하지 않는다.
- retain : retain count를 증가시킨다. 현재 Scope에서 객체가 유지되는것을 보장받기위해서는 retain후에 필요가 없을때 release 하도록한다.
- strong : strong은 retain attribute과 동일하다. ARC를 사용한다면 strong을 사용한다.
- copy : 새로운 객체를 생성하고 해당 객체의 retain count를 증가시킨다.

> ARC가 추가되면서 weak, strong이 출현했다고 한다, 기본적으로 ARC모드일때 assign, retain 대신에 weak, strong을 사용한다고 이해하면 된다.

#### 모든 Method의 Parameter에 대해 retain해야 할까?

아래와 같이 name이라는 NSString을 Method Parameter로 전달받는다고 가정해보자, 이경우 외부에서 retain count를 감소시켜 객체가 소멸될것을 우려할 필요가 있을까?

```objectivec
- (void)method:(NSString*)name
{
   NSString *str = [name retain];
   ...
   [str release]
}
```

> 참고 StackOverFlow - http://stackoverflow.com/questions/7209674/should-i-retain-a-object-pointer-parameter-in-every-method

## Auto Reference Counting (ARC)

컴파일할때 자동으로 retain, release를 처리하는 개념

#### Reference Count 

객체의 소유권을 가지게 될때, Reference Count가 1씩 증가한다.

<img src='https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/MemoryMgmt/Art/memory_management_2x.png' width='400' />

#### autorelease

NSObject

```
- (id)release;
- (id)autorelease;
```

```
- (NSString*) description
{
   NSString* desc;
   desc = [[NSString alloc] initWithFormat: @"%@(%d)", name, age]; 
   return (desc);
}
```

#### 그렇다면 왜 release가 아닌 autorelease 인가?

Use autorelease to Send a Deferred release

```
NSString* employeeSummary = [employee description];
...
[employeeSummary release];
```

```
- (NSString*) description
{
   NSString* desc;
   desc = [[NSString alloc] initWithFormat: @"%@(%d)", name, age]; 
   return ([desc autorelease]);
}
```

#### autorelease pool

위와같이 autorelease 된 객체는 autorelease pool에 등록된다. pool이 해체될때 관리되는 모든 객체를 release하게된다.

- 결론적으로 autorelease된 객체의 release 시점은 pool이 해체될 때이다.

> autorelease는 release를 예약하는 행위라고 이해하면 쉽다, autorelease pool이라고 불리는 컬렉션에 등록시키는 행위이며, autorelease pool은 자신이 해제될때 컬렉션에 있던 객체를 모두 release한다.
