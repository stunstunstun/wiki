---
title: 피보나치 수열과 동적 프로그래밍
date: 2014-04-24 12:54:07
categories: algorithm
---

피보나치 수는 수학에서 아래와 같은 점화식으로 정의되는 수열이다.

<img src='https://lh5.googleusercontent.com/qu-yCjimqh7CHPj9Rkj424apqKBGbVTB5B2q_to4Tq5NDucd5dPDuAE0wH92YXwjQEUTM4vZnB_tTa9K252KKghvjkgz0GGa0niUj6EEtGNIgmIqzLLch3y9DUArmg' />

> 수열은 어떠한 규칙에 따라 차례대로 나열한 수를 말하며, 여기에 속하는 각각의 수를  항이라고 말한다.

위의 점화식의 피보나치의 수는 0과 1로 시작하며, 그 이후의 규칙은 바로 앞의 두 피보나치 수의 합이라고 이해 하면 되겠다.  

```
N = 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181…..
```


피보나치 수를 아래와 같이 Java를  통해 구현한다면 아래와 같다. 이와 같이 수열을 획득하기 위한 알고리즘의 핵심은 특정 규칙으로 인해 수열이 반복 된다는 것과 수열의 항을 어떻게 구할 것 인가이다.

```java
public class Fibo {
 
	private static final int MAX_COUNT = 10;
	private static List<Integer> numbers = new ArrayList<Integer>();
	
	public static void main(String[] args) {
		// Get
		for(int i = 0 ; i < MAX_COUNT ; i++) {
			numbers.add(fibo(i));
		}
		// Print
		Iterator<Integer> iter = numbers.iterator();
		while(iter.hasNext()) {
			Integer n = (Integer) iter.next();
			System.out.println(n);
		}
	}
	
	private static int fibo(int number) {	
		if(number == 0 || number == 1)
			return number;
		return fibo(number - 2) + fibo(number - 1);
	}
}
```

열 번째 피보나치 수열까지 구한다하고, fibo 메소드를 통해 0과 1를 시작으로 재귀호출을 통해 n-2 번째, n-1 번째 피보나치 수를 구하고 있는 것을 볼 수 있다. 획득한 피보나치수는 리스트에 담았는데 출력결과는 아래와 같다.

```
0
1
1
2
3
5
8
13
21
34
```

위의 알고리즘을 개선할 순 없을까? 현재 위의 수열을 구하기 위해서는 이전에 이미 계산 했던 내용이 재귀적으로 계산 되고 있는 것을 알 수 있다. 이미 계산한 내용을 캐싱 한다면 좀 더 효율적인 알고리즘을 구현 할 수 있을 것 이다. 아래의 예제를 보도록 하자.

```java
private int[] cached = new int[20];
 
private int cachedFibo(int number) {
	if(number == 0 || number == 1)
		return number;
	if(cached[number] != 0)
		return cached[number];
	cached[number] = cachedFibo(number - 2) + cachedFibo(number - 1);
	return cached[number];
}
```

처음에 구현한 피보나치와는 다르게 이전에 계산 했던 수열의 항을 배열에 저장 하고 있는 것을 알 수 있다. 20번째 항까지 구한다고 가정하고, 실제 테스트를 해보면 아래와 같은 놀라운 결과를 확인 할 수 있다.

<img src='https://lh3.googleusercontent.com/-trvM_OPfbFFYxIP3VWUhbGBJFz7Jo6eiq-0o2BxylWCpsbQgE3NYrwcXL7JjuTzBVm3L_4986RfLJc9_sVEhQcd7MGtzWnjf05RI_UfFtZ_6Vw5Wiu7fFWFgh5bgPVTWQ' />

위와 같이 반복되는 계산을 막기위해 이전해 계산되었던 결과를 저정하는 문제 해결 전략을 동적 프로그래밍(Dynamic Programming)이라고 하는데 알고리즘을 보고 따라하는 것에서 벗어나 문제 해결을 위한 전략을 고민해보고 이를 활용할수 있기를 바라며 글을 마무리한다.
