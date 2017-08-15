---
title: 자바 Object 클래스에 대한 이야기
date: 2012-06-30 00:49:31
categories: java
---


`java.lang` 패키지는 구현시에 import 를 하지 않아도 자동으로 참조되는 패키지로서 자바에서 사용되는 주요 클래스와 API가 정의 되어있다. 이 중 Object 클래스는 모든 클래스의 최상위 클래스로서 Java Document에는 Object 클래스를 아래와 같이 정의하고 있다.

## Class Object
```
java.lang.Object  
 ㄴ public class Object

Class Object is the root of the class hierarchy. 
Every class has Object as a superclass. All objects, including arrays, implement the methods of this class.
```

#### Methods 

```
public final Class<?> getClass()

public int haseCode()

public boolean equals(Object object)

protected Object clone()

public String toString()

public final void notify()

public final void notifyAll()

public final void wait(long timeout) throws InterruptedException

public final void wait(long timeout, int nanos) throws InterruptedException

public final void wait() throws InterruptedException

protected void finalize() throws Throwable
```

이 문서에서는 위의 Object 클래스가 정의하고 있는 Method들이 어떠한 역할을 하고 있는지 객체 생성 이후에 어떠한 용도로 이용 될 수 있는지 간단히 정리 해보려고 한다.


#### getClass()

객체의 런타임에서의 클래스 정보를 반환한다. 이 클래스 정보에는 클래스 이름 그리고 상위 클래스에 대한 정보 등을 포함한다. 뿐만 아니라 어노테이션이 있는지 인터페이스 여부를 확인할 수 가 있고. 클래스 내의 field와 method 정보도 확인 할 수 있다. 이러한 클래스 및 메소드 정보는 자바 리플렉션을 통해 런타임에서 유용하게 이용할 수 있다.

```java
@Test
public void testRelection() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
    Class clazz = CircularArray.class.getClass();
    // Class clazz = Class.forName("com.holaxapps.chomdoi.support.CircularArray");
    Class paramTypes[] = new Class[1];
    paramTypes[0] = Integer.TYPE;

    Constructor constructor = clazz.getConstructor(paramTypes);
    Object[] args = new Object[1];
    args[0] = new Integer(4);

    Object obj = constructor.newInstance(args);
    assertThat(obj).isInstanceOf(Iterable.class);
}
```


#### hashCode()

객체의 고유한 값을 반환하는 메소드이다. 리턴되는 hashCode는 16진수로 되어있는 객체의 메모리 주소를 정수값으로 변환해 반환한다. Object 클래스의 equals() 메소드는 클래스에서 별도로 오버라이드 하지 않는다면 hashCode를 통해 equals()의 결과를 반환한다.

```java
@Test
public void testHashCode() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
    Class clazz = Class.forName("com.holaxapps.chomdoi.support.CircularArray");
    Class paramTypes[] = new Class[1];
    paramTypes[0] = Integer.TYPE;

    Constructor constructor = clazz.getConstructor(paramTypes);
    Object[] args = new Object[1];
    args[0] = new Integer(4);

    Object obj = constructor.newInstance(args);
    System.out.println(String.format("%d", obj.hashCode()));

    CircularArray<String> array = new CircularArray<>(4);
    System.out.println(String.format("%d", array.hashCode()));
}
```

```
914424520
110718392
```

#### equals()

동일한 클래스에서 생성된 두 객체를 비교해 같은 객체로 볼 것인지에 대한 기준을 정의한다. `equals()` 메소드는 `hashCode()` 메소드와 긴밀한 관계가 있는데 이는 equlas() 메소드를 통해 객체의 동일 유무의 판단을 hashCode()의 값을 비교해서 결과를 반환하기 때문이다.

그리고 중요한 점은 만약 equlas() 메소드를 override 했다면 hashCode() 메소드도 동시에 override 해줘야 하는데 이는 두 객체가 동일하면 hashCode의 값도 동일해야 되기 때문이다. 혼란스러울 수 있으니 이해를 돕기 위해 아래의 예제를 살펴 보도록 하자.

```java
...
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass())
            return false;
        CircularArray<?> that = (CircularArray<?>) o;
        if (head != that.head)
            return false;
        return Arrays.equals(items, that.items);
    }
}
```

위의 예시된 CircularArray 클래스는 순환 구조의 배열의 역할을 하는데 배열의 시작점인 head와 배열의 값이 같으면 동일한 객체로 본다고 가장해보자.

```java
@Test
public void testHashCode() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
    Class clazz = Class.forName("com.holaxapps.chomdoi.support.CircularArray");
    Class paramTypes[] = new Class[1];
    paramTypes[0] = Integer.TYPE;

    Constructor constructor = clazz.getConstructor(paramTypes);
    Object[] args = new Object[1];
    args[0] = new Integer(4);

    CircularArray<String> array1 = (CircularArray<String>) constructor.newInstance(args);
    System.out.println(String.format("%d", array1.hashCode()));

    CircularArray<String> array2 = new CircularArray<>(4);
    System.out.println(String.format("%d", array2.hashCode()));
}
```

두 객체를 생성하였고 head 와 배열의 값이 동일하지만 아래와 같이 hashCode() 값이 다르면 어떤일이 발생하는지 살펴보도록 하자.

```
914424520
110718392
```

아래와 같이 Mutable한 상태의 해시맵 객체를 생성하고 배열의 개수가 각각 3, 4개를 가지는 CircularArray 클래스를 키로 지정해 맵에 추가하였다. 동일한 객체라면 다시 맵에서 정상적으로 값을 반환할 것으로 예상되지만 결과는 `null`이 반환되어 테스트 케이스를 만족하지 못하게 된다. 이는 동시에 hashCode() 메소드를 override 를 하지 않아서 인데 Map, Set과 같은 자료구조에서는 해시값을 통해 값의 유일성을 판단하기 때문이다.

```java
@Test
public void testHashCode() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
    Class clazz = Class.forName("com.holaxapps.chomdoi.support.CircularArray");
    Class paramTypes[] = new Class[1];
    paramTypes[0] = Integer.TYPE;

    Constructor constructor = clazz.getConstructor(paramTypes);
    Object[] args = new Object[1];
    args[0] = new Integer(4);

    CircularArray<String> array1 = (CircularArray<String>) constructor.newInstance(args);
    System.out.println(String.format("%d", array1.hashCode()));

    CircularArray<String> array2 = new CircularArray<>(3);
    System.out.println(String.format("%d", array2.hashCode()));

    Map<CircularArray, Integer> map = new HashMap<>();
    map.put(array1, 4);
    map.put(array2, 3);

    Integer count = map.get(new CircularArray<String>(3));
    assertThat(count).isNotNull();
}
```

정리하면 equals(), hashCode() 메소드간에는 아래와 같은 계약관계가 성립된다.

- 만약 두 객체가 같다면, hashCode 값도 무조건 같아야 한다.
- 두 객체의 hashCode 값이 같아도 equals() 메소드의 정의에 따라 두 객체는 같지 않을 수도 있다.

Map, Set과 같은 자료구조에서는 값을 검색하기 위해 첫번째 index로 hashCode 값을 참조하고 마지막으로 객체의 equlas() 를 통해 객체가 동일한지에 대한 여부를 확인한다. 위와 같은 경우에는 서로 다른 런타임에 생성된 객체이기 때문에 hashCode 값이 달라 Map에서 원하는 객체를 획득하지 못하고 있는 것이다.

hashCode 값은 저장소에 데이터가 저장될 때의 순번과도 같다. 두 객체간의 동일 여부를 판단할 때 필요 충분 조건인 equals() 메소드를 override 했다면 hashCode() 메소드도 꼭 override 하도록 하자.

```java
...
    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass())
            return false;
        CircularArray<?> that = (CircularArray<?>) o;
        if (head != that.head)
            return false;
        return Arrays.equals(items, that.items);
    }

    @Override
    public int hashCode() {
        int result = head;
        return 31 * result + Arrays.hashCode(items);
    }
}
```



#### toString()

`toString()` 메소드는 Object 구현시 override 하는 것이 좋다. override 하지 않을 경우 아래와 같이 현재의 Object의 상태를 아래와 같이 출력하게 되는데 이는 디버깅 시에 사실상 의미가 없기 때문에 override 해서 Object의 정보를 확인 할 수 있게 하는 것이 좋다.

```
com.holaxapps.chomdoi.support.CircularArray@624b035d
```

```java
@Override
public String toString() {
    StringBuilder sb = new StringBuilder();
    for (T item: items) {
        sb.append(item == null ? "null" : item.toString());
        sb.append(" ");
    }
    return head + "[" + sb.toString() + "]";
}
```

Java API Document 를 보면 toString method에 대해 다음과 같이 명시하고 있다. 반환되는 String은 간결해야 하지만 사람이 읽기 쉬운 형태의 표현이어야 한다. Object 클래스에는 아래와 같은 Method가 더 존재 하는데 다음 기회에 정리 해보도록 하겠다.

#### 이외 Method 들

`wait()`

`clone()`

`notify()`

`notifyAll()`

`finalize()`
