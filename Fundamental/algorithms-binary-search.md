---
title: 이진 탐색 알고리즘
date: 2014-04-30 12:54:07
categories: algorithm
---

이진 탐색(Binary Search)은 정렬된 리스트에서 특정한 값을 찾는 알고리즘이다. 처음에 배열 또는 리스트의 중간값을 선택하여, 그 값을 찾고자 하는 값과 비교하여 일치하거나 크고 작음을 비교하는 방식을 채택하고 있다. 처음 선택한 중앙값이 만약 찾는 값보다 크면 그 값은 새로운 최고값이 되며, 작으면 그 값은 새로운 최하값이 된다. 검색이 반복될 때 마다 목표값을 찾을 확률은 두 배가 된다. 이진 탐색은 [분할 정복](https://ko.wikipedia.org/wiki/%EB%B6%84%ED%95%A0_%EC%A0%95%EB%B3%B5_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)(Divide and conquer)을 잘 활용한 예이다.


이진 탐색을 통해서 실제 개발 시에 배열 또는 리스트에 저장된 특정 값을 찾고 자 할 때 유용 할 것 이다. 예를 들어 아래와 같은 클래스의 인스턴스 들을 저장하는 리스트가 있다고 가정 해 보자.

`유저의 고유 번호와 이름을 관리하는 클래스`

```java
public class User {
    public int id;
    public String name;
}
```

`유저 리스트에서 특정 유저를 검색하는 Method`

```java
public User searchUser(List<User> list, int id) {
   for (User user : list) {
       if (user.id == id)
       return user;
   }
   return null;
}
```

위와 같이 User 리스트에서 유저의 고유 번호를 이용해 특정 User를 찾고자 할 때, 위와 같이 리스트를 탐색 한다면, 빅오 표기법를 통한 시간복잡도는 O(N) 이 될 것 이다.

다시 이진 탐색 알고리즘으로 넘어가 보도록 하겠다. 리스트를 순차적으로 탐색 하기 보다는 이진 검색 알고리즘을 통해 리스트의 중간 인덱스 부터 범위를 좁혀 나가면 탐색 하는 것이 보다 위의 과정보다 더 효율 적일 것이다. 일반 적인 재귀 호출을 통한 이진 탐색 알고리즘을 구현 해 보면 아래와 같다.

```java
public class BinarySearch {
	public static int search(int[] numbers, int key, int min, int max) {
		if(min > max)
			throw new RuntimeException("Not found.");
		
		int mid = (min + max) / 2;
		System.out.println("Searching... Middle index = " + mid);
		
		if(key == numbers[mid])
			return key;
		else if(key > numbers[mid])
			return search(numbers, key, mid + 1, max);
		else if(key < numbers[mid])
			return search(numbers, key, min, mid - 1);
		else
			throw new RuntimeException("Not found.");
	}
}
```

위의 상황보다 조금 더 단순한 상황을 예시로 설명하면, numbers 배열은 정렬된 정수를 저장하고 있는 상태이고, 특정 key가  주어졌을 때 어떠한 방법으로 검색 해 나가는지 살펴 보는 것이 좋을 것이다.

위와 같이 이진 탐색을 통해 중간값을 비교하면서 범위를 좁혀 원하는 값을 검색하기 때문에 리스트를 순차적으로 비교했을 때와 비교하여 `O(logN)`의 시간복잡도로 표현할 수 있으며 더욱 효율적으로 검색이 가능한 것을 확인할 수 있다. 

