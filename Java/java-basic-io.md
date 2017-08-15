---
title: 자바 I/O에 대한 이야기
date: 2012-03-28 00:49:31
categories: java
---

Java I/O는 자바에서의 입출력 프로그래밍을 말하는데 입력은 키보드 뿐만 아니라 네트워크, 파일 등의 다양한 형태가 될 수 있으며 출력도 마찬가지로 모니터 뿐만 아니라 네트워크, 파일 등으로 출력 될 수 있다. 

I/O는 이처럼 중요하지만 대부분의 사람들은 Java의 I/O는 어렵다고 말한다. 하지만 I/O는 자바의 기본적인 문법만 이해하고 있으면 그다지 어렵지 않다. I/O를 이해하기 위해 상속에 대한 개념을 확실히 이해를 해야 한다. 단순한 암기가 아닌 `java.io` 패키지 클래스를 살펴보면서 이해를 한다면 접근하는데 도움이 될 것이다.

## 생성자가 중요한 Java IO 관련 클래스

`java.io` 패키지를 살펴보면 상당히 많은 수의 클래스로 구성되어 있는 것을 알 수 있다. 이러한 많은 클래스 중 필요한 것을 쓰기 위해서는 첫째로 클래스명을 구성하는 단어들의 의미를 잘 파악해야 하며, 둘째 I/O 패키지 클래스의 생성자의 의미를 잘 파악하여야 한다. I/O와 관련된 클래스는 생성자의 Arguments로 부터 읽어드릴 대상을 결정하기 때문이다.

만약 당신이 `"키보드로부터 한 줄을 입력받아 화면에 출력 하시오"`라는 문제를 받았다면 어떻게 해야 할까?

- 먼저 키보드로부터 문자를 입력받기 위해 시스템 클래스의 `System.in` 함수를 살펴보는 것으로 시작하자.
- 우리는 `System.in` 이라는 자바의 표준 입력을 통해 키보드로 입력한 값에 대한 `InputStream` 객체를 얻을 수 있다.
- 우리는 몇몇 단계를 거쳐 최종적으로 BufferedReader 클래스의 `readLine()` 메소드로부터 입력한 한 줄의 문자열을 리턴 받을 수 있으며 이를 자바의 표준 출력 함수를 통해 화면에 출력하면 된다.

readLine() 메소드를 사용하려면 new 연산자를 통해서 BufferedReader 클래스를 힙 메모리에 올려야 한다. 하지만 문제가 있는데, BufferedReader 클래스의 생성자는 기본 생성자가 존재하지 않는다는 것이다. 시작하면서 생성자가 중요하다고 했는데 우리는 API 문서를 통해 BufferedReader 클래스의 생성자를 확인할 필요가 있다. 

```java
public BufferedReader(Reader in) {
    this(in, defaultCharBufferSize);
}
```

생성자를 통해 Reader 객체가 필요하다는 것을 알았지만 Reader 클래스는 추상 클래스이기 때문에 독립적은 객체를 생성할 수가 없는 상태이다. 이 경우에는 추상 클래스인 Reader를 상속받는 하위 클래스를 찾아볼 필요가 있다.

`InputStreamReader`는 Reader의 하위 클래스로서 `BufferedReader`의 생성자의 인자로 전달 할 수 있다. 우리는 위에서 System.in를 통해 키보드로 부터 입력받은 값을 통해 InputStream 객체를 얻었으며 표준 입출력을 테스트하는 코드를 아래와 같이 작성할 수 있다.


```java
public static void main(String[] args) throws IOException {
    InputStreamReader inputStreamReader = new InputStreamReader(System.in);
    BufferedReader br = new BufferedReader(inputStreamReader);	
    String line;
    while ((line = br.readLine()) != null) {
    	System.out.println(line);
    }
}
```

정리하면, `InputStreamReader`의 생성자에 필요한 인자는 표준 입력을 통해 획득하고 `BufferedReader`의 생성자에서 필요한 인자는 `InputStreamReader`를 사용하면 된다.

결국 키보드에서 입력한 문자열은 키보드 버퍼에 정보를 저장해 두었다가 사용자가 입력을 마치면 문자열이 JVM에 전달되고 전달된 문자는 다시 `System.in`인 InputStream 객체로 저장된다. 

다시 이는 InputStreamReader 객체를 생성하는데 사용되고 이어서 BufferedReader 클래스로 부터 객체를 생성하는데 사용되어 진다. BufferedReader 클래스에는 버퍼가 있기 때문에 문자열을 버퍼에 저장해 놓았다가 readLine() 메소드를 통해 한 줄을 한번에 읽어 들이게 되는 것이다. 

```
Keyboard buffer -> inputStream -> InputStreamReader -> BufferedReader -> br.readLine()
```

우리는 지금까지 표준 입출력을 통해서 키보드로부터 값을 입력받고 화면에 출력하는 프로그램을 작성해 보았다. 실제 애플리케이션을 개발할 때에는 파일 또는 네트워크를 통해 전달되는 입출력을 다루는일이 많으며 기본적인 원리는 위에서 설명한 것에서 크게 벗어나지 않는다. 예를 들면 가령 입력 방식이 무엇이든 `InputStream` 객체를 통해 아래와 같이 입력 값을 다룰 수 있다는 것이다.

```java
public static byte[] getByteArray(Class clazz, String fileName) throws IOException {
	InputStream inputStream = clazz.getResourceAsStream(fileName);
	ByteArrayOutputStream bos = new ByteArrayOutputStream();
	byte[] buffer = new byte[1024];
	try {
    		int n = 0;
		while ((n = inputStream.read(buffer)) != -1) {
			bos.write(buffer, 0, n);
		}
	} finally {
        	inputStream.close();
       		bos.close();
	}
	return bos.toByteArray();
}
```

#### References

- https://docs.oracle.com/javase/tutorial/essential/io/streams.html




