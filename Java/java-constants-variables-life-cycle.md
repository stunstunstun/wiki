---
title: Java의 Constants와 Variables의 삶 들여다보기
date: 2012-01-05 00:49:31
categories: java
---

## 프로그램을 실행하면 벌어지는 일

## 프로세스

## 간단한 프로그램으로 살펴보기

#### BMI 지수를 구하는 프로그램

```java
import java.util.Scanner;

public class Main {
    static final int CARRY_NUM = 10000;

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("신장을 입력하세요(cm) : ");
        String height = input.nextLine();

        System.out.print("체중을 입력하세요(kg) : ");
        String weight = input.nextLine();

        float bmi = Float.valueOf(weight) / (Float.valueOf(height) * Float.valueOf(height)) * CARRY_NUM;

        System.out.println(String.format("\n당신의 체질량지수(BMI)는 %.2f 입니다.", bmi));
    }
}
```

## Java의 변수(Variables)와 자료형(Date Types)

#### Variables

프로그래밍을 하면서 어떠한 값을 저장하고 싶은데, 메모리의 물리적 주소를 직접 찾아서 저장 하는 것은 어려운 일이다. 이러한 물리적인 주소를 대신해 Variables을 통해 원하는 값을 쉽게 저장 할 수 있다.

Java에서는 Variables을 표현할 수 있는 다양한 방법이 존재하는데, 각각 어떠한 용도에 쓰이며, Variables가 탄생하고 소멸되기 까지의 생명 주기는 어떠한지 예제를 통해 살펴 보도록 하자.

```java
public class Marine {
  public static final int TYPE = 1;

  private int level;
  private String color;

  public void upgradeWeapon(int weaponType, int itemLevel) {
    int newLevel = level > itemLevel ? level : level + weaponType;
    System.out.println("New Level is " + newLevel);
  }
}
```

## 우리가 표현한 Variables의 삶은 어떠할까요?

#### Instance Variables

Instance Variables는 클래스 내부에서 선언되며, `new 클래스명()` 키워드를 통해 인스턴스 객체를 위한 공간이 Heap 영역에 할당 될 때 생성되며, 해당 클래스가 프로그램 내에서 더 이상 참조 되지 않아(즉 GC의 대상이 될 때) 클래스가 소멸 될 때 함께 소멸 되게 된다. Instance Variables은 값을 초기회 하지 않아도 자료형(Date Types)에 따라 default 값을 갖고 있으며, Date Types에 따른 default 값은 아래와 같다.

Data Type | Default Value
--|--
byte | 0
short | 0
int | 0
long | 0L
float | 0.0f
double | 0.0d
char | '\u0000'
String | null
Object | null
boolean | false

> 위의 예제 에서는 클래스 내부의 `int level;`이 Instance Variables에 해당한다.

#### Class Variables

Class Variables은 static 키워드를 통해 선언되며, 일반적으로 final 키워드와 함께 쓰여 Constants를 표현할 때 사용 한다. Static memory 공간에 저장 되며, 인스턴스 객체의 생성 여부와 상관없이 프로그램이 시작 될 때 생성되고, 프로그램이 종료 될 때 소멸 된다.

Instance Variables와 같이 default 값을 가질 수 있지만, 보통 선언과 동시에 값을 할당을 하며, 경우에 따라 생성자 또는 static block 내에서 할당한다.

> `static final` 키워드를 통해 Constants로 표현할 때에는 이름은 영문 대문자를 통해 표현하는 것이 올바른 Convention이다.


#### Local Variables

Local Variables는 Method내에 선언되어 Method 내부의 데이터 처리에 사용 되는데, Method가 실행시에 생성되어 Method가 종료되면 소멸된다. 메모리 공간은 Runtime시에 stack 공간을 통해 생성되고 소멸된다.

Local Variables는 Method뿐만 아니라 Constructor나 block 문 내에서도 사용 된다. 위의 예제에서는 `upgradeWeapon(int weaponType, int itemLevel)` Method의 `int newLevel`이 Local Variables이다.

#### Parameters

Parameters는 Method 호출시에 전달 되는 변수로 그 성격이 Local Variables 과 비슷하다. 위 예제의 upgradeWeapon Method에 전달된 `int weaponType, int itemLevel`에 해당 된다.

## Data Types

#### Primitive Types

Data Type | Bytes
--|--
byte | 1
short | 2
int | 4
long | 8
float | 4
double | 8
char | 2
String | Reference Type
boolean | 1

#### Reference Types
