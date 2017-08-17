---
title: Java의 LinkedList와 ArrayList에 대한 비교
date: 2014-02-12 00:49:31
categories: java
---

리스트는 모든 프로그래밍 언어에서 가장 유용한 자료구조 중의 하나이다. LinkedList와 ArrayList는 모두 Java에서 제공하는 List 인터페이스를 구현한 Collection 구현체이다. 

<!-- more -->

하지만 인터페이스만 같을 뿐 내부적으로 동작하는 방식은 다르다. 두 자료 구조의 차이를 알아보고 LinkedList와 ArrayList를 적절하게 사용하도록 하자. List 인터페이스를 구현하는 LinkedList 또는 ArrayList는 왜 사용할까?

## Java 에서 LinkedList 와 ArrayList 적절하게 사용하기

Java 에서는 기본형(Primitive Types) 또는 인스턴스(Reference Type)를 저장하기 위해 보통 배열을 사용한다. 하지만 배열의 초기 길이를 지정해야 하며 생성된 배열의 길이는 동적으로 변경할 수 없다는 점 때문에 상황에 맞게 사용해야 한다. 얼마나 많은 데이터를 사용하게 될지 예상하기 힘들 뿐 아니라 가변적으로 리스트의 개수를 늘려야 할 때도 있기 때문이다.

#### 배열과 Vector를 이용한 데이터 관리

```java
public class ListTest {
	public String[] array = new String[10];
	public Vector<String> vector = new Vector<String>();
	
	@Test
	public void collectionsTest() {
		System.out.println("Array = " + array.length);
		System.out.println("Vector = " + vector.capacity());
	}
}
```

Java의 초기 버전인 1.0에서는 이러한 문제를 해소하기 위해 주로 Vector를 사용 하고는 했다. 하지만 Vector 역시 인스턴스 생성시에 capacity가 디폴트로 10개로 정해져 리스트의 개수가 capacity 이상이 되면 두배 씩 늘려 나아가는 전략을 택하고 있다.

다수의 Thread에 대한 접근에 동기화를 보장하는 등 성능 이슈로 인해 Java 1.2 이후 부터는 호환성을 위해 제공하는 정도이며 List 인터페이스를 구현한 리스트로 대체하여 사용하고 있다.

```java
package java.util;

import java.util.function.UnaryOperator;

public interface List<E> extends Collection<E> {
    
    int size();

    boolean isEmpty();
    
    boolean contains(Object o);
   
    Iterator<E> iterator();
    
    Object[] toArray();

    <T> T[] toArray(T[] a);

    boolean add(E e);
    
    boolean remove(Object o);

    boolean containsAll(Collection<?> c);

    E get(int index);
   
    E set(int index, E element);

    void add(int index, E element);

    E remove(int index);
    
    ...
 
}
```

#### 동기화 이슈

Java 1.0 의 Vector 클래스는 다수의 Thread에 대해 동기화를 보장한다고 하였다. LinkedList와 ArrayList는 Thread-safe를 개발자가 고려해야 하며 필요하다면 아래와 같이 Collections 클래스를 통해 동기화를 제공하는 List를 생성할 수 있다.

```java
Collections.synchronizedList(List<T> list);
```

#### ArrayList

ArrayList는 내부적으로 데이터를 배열에서 관리하며 데이터의 추가, 삭제를 위해 아래와 같이 임시 배열을 생성해 데이터를 복사 하는 방법을 사용 하고 있다.

<img src='https://lh5.googleusercontent.com/7pSzmL9zBHuRuDAbWV6NjmYEx2otpkTVCA5aStNUESja4KAhPCllb8Dc277BRSaLEmy4Q-y1GS2X5WwLtylnxWo3q4CkcJRo4DA9PEesAX04HEZmaL9pOIqvlyQ8fWakBg' />


<br>

대량의 자료를 추가/삭제 하는 경우에는 그만큼 데이터의 복사가 많이 일어나게 되어 성능 저하를 일으킬 수 있다. 반면 각 데이터는 인덱스를 가지고 있기 때문에 한번에 참조가 가능해 데이터의 검색에는 유리한 구현체이다.


#### LinkedList

LinkedList는 데이터를 저장하는 각 노드가 이전 노드와 다음 노드의 상태만 알고 있다고 보면 된다. 

<img src='https://lh4.googleusercontent.com/cWFQD2vsXtCSXgw6N94UQT0nfZUa0SzBs4UfCbJwOImmz6MxUSPeYLRqH8tK6X7cHtrLcl0d7g6LFrb6kXYzuBLekOOA47RBXUH7vekVYvN4unKJvzSDPL81G2xRF3NBAQ' />

ArrayList와 같이 데이터의 추가, 삭제시 불필요한 데이터의 복사가 없어 데이터의 추가, 삭제시에 유리한 반면 데이터의 검색시에는 처음부터 노드를 순회해야 하기 때문에 성능상 불리하다. 소스 코드를 통해 조금 구체적으로 살펴보자.


## 데이터의 검색, 삽입, 삭제시 성능 비교


#### 검색

데이터 검색 시에는 ArrayList는 LinkedList에 비해 굉장히 빠르다. ArrayList는 인덱스 기반의 자료 구조이며 `get(int index)` 를 통해 O(1) 의 시간 복잡도를 가진다. 그에 비해 LinkedList는 검색 시 모든 요소를 탐색해야 하기 때문에 최악의 경우에는 O(N)의 시간 복잡도를 가진다.

#### 삽입, 삭제

LinkedList에서의 데이터의 삽입, 삭제 시에는 ArrayList와 비교해 굉장히 빠른데, LinkedList는 이전 노드와 다음 노드를 참조하는 상태만 변경하면 되기 때문이다. 삽입, 삭제가 일어날 때 O(1)의 시작 복잡도를 가진다. 반면 ArrayList의 경우 삽입, 삭제 이후 다른 데이터를 복사해야 하기 때문에 최악의 경우 O(N) 의 성능을 내게 된다.

지금까지의 내용을 정리하면 아래와 같다.


리스트 | 설명 
--|--
Array | 정적인 길이를 제공하는 배열
Vector | Java 1.0 에서 추가. 동기화 기능이 제공되는 가변이 가능한 자료구조
ArrayList | Java 1.2 에서 추가. 동기화가 제공되지 않음. 데이터의 검색에 유리하며 추가, 삭제에는 성능을 고려해야 한다.
LinkedList | Java 1.2 에서 추가. ArrayList 에 비해 데이터의 추가, 삭제에 유리하며 데이터 검색 시에는 성능을 고려해야 한다.

같은 타입의 많은 데이터를 관리하기 위해 상황에 맞게 적절하게 사용하기 위한 방법을 알아 보았는데 데이터 관리를 위한 성능 이슈를 위해 고려해야 요소들이 더 많음을 상기해야 한다.








