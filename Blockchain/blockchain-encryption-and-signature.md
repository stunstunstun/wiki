---
title: [블록체인을 지탱하는 기술 #1] 암호화와 서명
date: 2018-01-30 11:54:07
desc: 블록체인을 지탱하는 기술
image: https://www.amatisnetworks.com/wp-content/uploads/2016/06/Public-Key-Encryption-shutterstock_224144242.jpg
categories: Fundamentals
---

암호화는 과거부터 현재까지 소중한 정보를 지키는데 중요한 수단으로 활용되어 왔다. 세계 2차 대전에서 독일군의 최초의 자동화된 암호화 기계인 `에그니마`를 해독해 연합군을 승리로 이끈 튜링의 일화는 그 예를 가장 잘 보여주고 있다. 

그뿐만 아니라 튜링은 암호학뿐만 아니라 인류에게 또 다른 선물을 안긴 천재 수학자이기도 하다. 튜링은 현대 컴퓨터의 이론적 모델인 `튜링머신`을 고안했다.

<img src='http://www.stutteringhelp.org/sites/default/files/pictures/alan-turing.jpg' width='500' />

이처럼 암호학은 현대 컴퓨터의 기초가 되었으며, 지금의 인터넷을 기반으로 한 서비스에서도 암호화 기법은 중요하고 다양하게 활용되고 있는데 이 글에서는 공개키를 통한 [RSA 알고리즘](https://ko.wikipedia.org/wiki/RSA_%EC%95%94%ED%98%B8)의 활용 방법에 대해 설명하고자 한다.

공개키를 이용한 RSA는 암호화뿐만 아니라 전자 서명이 가능한 알고리즘이다. RSA를 이용한 서명과 암호화 기법을 설명하기 이전에 `대칭키` 암호화 방식에 대한 지식이 없다면 앞으로의 내용이 추상적으로 들릴 수 있기 때문에 대칭키 암호화 방식을 먼저 살펴보도록 하겠다.

## 대칭키를 이용한 암호화

암호화를 위해서는 기본적으로 암호화의 대상이 되는 `평서문(Plain Text)`과 암호화를 위한 일종의 비밀번호인 `암호키(Cryptography Key)` 그리고 마지막으로 암호화 `알고리즘(Algorithm)`이 필요한데, 대칭키 암호화 방식은 문자 그대로 암호화와 복호화를 동일한 암호키를 이용하는 방식을 말한다.

<img src='https://uploads.skyhighnetworks.com/2015/07/15150142/In_Page_Encryption_Decryption_Diagram_700.png' width='500' />

> 사진 - https://www.skyhighnetworks.com/cloud-security-university/tokenization-vs-encryption/

 위의 그림을 통해 살펴보면 동일한 암호키를 통해 `암호화(Encryption)`, `복호화(Decryption)`하는 것을 볼 수 있는데, 대칭키를 사용하는 암호화 알고리즘은 `AES`와 `DES`가 대표적이다. 본문은 RSA를 이용한 서명과 암호화의 활용 방법을 전달하는 것이 주된 목적이기 때문에 대칭키를 이용한 암호화 알고리즘에 대한 자세한 설명은 생략한다.

#### openssl을 통해 구체적으로 암호화, 복호화되는 과정을 살펴보도록 하자

`plain.txt`라는 파일의 내용을 `DES3` 알고리즘을 통해 암호화하는 과정이다. 예시로 암호화를 위한 패스워드는 `123456` 이라고 가정한다. 암호화된 결과는 `cipher.bin`를 통해 저장한다.

```
$ echo '안녕 프로그래밍' > plain.txt
$ openssl enc -e -des3 -in plain.txt -out cipher.bin
enter des-ede3-cbc encryption password: 123456
Verifying - enter des-ede3-cbc encryption password: _
```

암호화된 `cipher.bin`은 기존의 내용을 식별할 수 없는 상태이다.
```
$ cat cipher.bin
Salted__�Bd����������m��LoS�t��ɽҝ��J
```

마지막으로 `DES3` 알고리즘을 통해 복호화하는 과정이다. 암호화에 사용한 패스워드를 통해 아래와 같이 동일한 평서문을 얻을 수 있다. 
```
$ openssl enc -d -des3 -in cipher.bin -out hola.txt
enter des-ede3-cbc decryption password: 123456
$ cat hola.txt
안녕 프로그래밍
```
> OpenSSL(https://www.openssl.org/)은 TLS/SSL 프로토콜을 구현하는 오픈소스 프로젝트이다. OpenSSL에서는 TLS/SSL 프로토콜을 위한 다양한 암호화와 서명 기법을 제공한다.

## RSA를 이용한 암호화

`RSA`는 공개키를 이용하는 대표적인 암호화 방식이며 전자서명이 가능한 최초의 알고리즘으로 알려져 있다. `AES`, `DES`와 같은 대칭키 암호화 방식에서 발생하는 문제점을 해결하였다. 

과거의 암호 방식은 암호화를 위한 키뿐만 아니라 알고리즘 역시 노출되지 않기 위해 노력하였으나 현대의 암호에서는 알고리즘을 공개하도록 하고 있다. 그 이유는 키 이외에 암호 시스템의 모든 것이 공개되어도 안전해야 한다고 Kerckhoff은 주장을 했는데 이것을 `Kerckhoff의 법칙`이라고 한다.

이 때문에 암호화를 위한 비밀번호인 키(Key)는 사용자가 인터넷 서비스를 위해 로그인할 때 필요한 비밀번호와 같이 가장 중요한 요소라고 할 수 있겠다. 하지만 대칭키 암호화 방식은 수신자와 발신자 간에 키를 공유하는 과정이 필요하기 때문에 보안적으로 해결해야 하는 문제가 남아있었다. 

#### 공개키와 비밀키를 이용한 암호화 방식

RSA는 수학적인 기법을 통해 한 쌍의 공개키와 비밀키를 생성하는데, 각각의 키는 이론적으로 아래와 같은 용도로 사용된다.

<img src='https://www.amatisnetworks.com/wp-content/uploads/2016/06/Public-Key-Encryption-shutterstock_224144242.jpg' width='500' />

구분 | 목적
--|--
Public Key | 누구에게나 공개될 수 있으며 메세지를 보내는 발신자는 공개키를 통해 정보를 암호화한다 
Private Key | 수신자는 비밀키를 암호화된 메세지를 복호화 하는데 사용한다, 외부에 노출되지 않도록 안전하게 보관해야 한다.

> RSA 알고리즘은 반대로 `Private Key`로 암호화하고 `Public Key`를 통해 복호화할 수도 있다.

이와 같이 RSA를 이용한 공개키 암호화 방식은 비밀키(Private Key)를 외부에 노출할 위험이 없어 기존의 대칭키 암호화 방식의 문제를 해결하고 있다.

현대의 암호화에서는 대칭키와 공개키 암호화 방식을 적절히 혼합하여 사용하고 있는데 구체적으로 어떻게 활용되고 있는지 살펴보자.

## 어디에서 활용되고 있을까?

우리에게 익숙한 인터넷 서비스에서는 대칭키와 공개키를 이용한 암호화를 다양하게 활용하고 있는데 대표적으로 `TLS(Transport Layer Security)`라고 불리는 암호 규약이 대표적이며 쉽게 예를 들면 웹 브라우징 시에 사용되는 보안 계층을 말한다. 

TLS는 기존의 `SSL(Secure Sockets Layer)`가 표준화되면서 바뀐 이름이며 우리가 인터넷에서 익숙하게 접하는 `HTTPS` 프로토콜에서 이를 활용하고 있다.

#### 웹 페이지에서 우리의 아이디와 비밀번호는 안전하게 전달될까?

우리는 검색 포털 또는 소셜 미디어 서비스를 이용할 때 먼저 아이디와 패스워드를 통해 로그인을 하는 과정을 거친다. 이와 같이 사용자의 중요한 정보가 웹 브라우저를 통해 서버에 전달될 때는 HTTPS 프로토콜을 통해 안전하게 전달된다. 

HTTPS 프로토콜은 내부적으로 앞서 말한 표준화된 `TLS(Transport Layer Security)` 암호 규약을 사용하는데, TLS를 통해 메세지를 안전하게 주고받는 원리는 다음과 같다. 

먼저 지원 가능한 알고리즘 정보를 교환한다. 이 단계에서 키 교환과 인증에 사용될 암호화 방법이 결정된다.

<img src='http://image.toast.com/aaaaahq/RSA_1.png' />

키 교환과 인증 알고리즘은 RSA와 같은 공개키 기법을 사용하거나 미리 공유된 키(TLS-PSK)를 사용할 수도 있다.

<img src='http://image.toast.com/aaaaahq/RSA_2.png' />

교환된 공개키를 통해 앞으로 메세지 암호화에 사용될 대칭키를 암호화하여 교환한다

<img src='http://image.toast.com/aaaaahq/RSA_3.png' />

마지막으로 대칭키를 통해 메세지를 암호화하여 안전하게 전송한다.

<img src='http://image.toast.com/aaaaahq/RSA_4.png' />


#### 서명과 검증

TLS에서는 메세지 원본을 암호화하는 것뿐만 아니라 메세지가 인증된 사용자로부터 전달된 것인지 확인하기 위해서 서명과 검증 절차를 거치는데 내용은 아래와 같다.

즉, 원래의 문서 내용을 `Message`라고 하면 Hash 함수인 SHA256 같은 함수 하나를 정해 `Hash된 Message`값을 구하고 이 Hash 값을 Client의 비밀키로 암호화한다. 여기까지의 과정을 `서명`이라고 하며 서명된 결과를 보통 `Signature`라고 불린다.

최종적으로 원본의 `Message`끝에 `Signature`를 첨부하여 전송하며 메세지를 받는 Server는 전달된 `Message`를 동일한 Hash 함수를 통해 `Hash된 Message`를 얻는다. 그리고 사전에 교환한 Client의 공개키를 통해 `Signature` 역시 복호화하는 과정을 가진다.

최종적으로 얻게 된 두 쌍의 `Hash된 Message`를 비교하여 동일한 값이면 서명이 올바른 것이고 값이 서로 다르거나 변환하는 과정에서 오류가 있다면 서명이 틀리다고 보는 것이다. 

아래의 그림과 같이 정리할 수 있다.

<img src='http://image.toast.com/aaaaahq/sign-and-verification.png' />


#### Google Play는 인앱 결제 정보를 어떻게 검증할까?

이 서명과 검증은 특히 돈이 오고가는 결제 내역에 대한 검증에 많이 사용되며 Google Play에서 제공하는 인앱 결제에서는 상품을 지급하기 전에 아래와 같이 결제 내역을 검증하도록 하고 있다.

Google Play에서 제공하는 IPC 방식으로 결제가 완료되면 결제를 요청한 애플리케이션은 아래와 같은 결과를 전달받게 된다.

`결제 내역 정보가 담긴 JSON`
```
{
   "orderId": "12999763169054705758.1374081541263051",
   "packageName": "com.holaxapps.chomdoi",
   "productId": "gas",
   "purchaseTime": 1396577500292,
   "purchaseState": 0,
   "purchaseToken": "aamhleobcgnmmlgnpiepncjh.AO-J1OwabKCNS0fXo9u8ycee9wOhSGtIrI1EXLp_rGIuAjhv6CE6cPUq1sTPkgNhh_ZlXKdi2sP4DcBTyRdCViHPcypYFultoC9qUseC5C9RPwl-4CcFJKU"
}
```

`결제 내역에 대한 서명 값(Signature)`

```
Gw4rkP6nWnNZVS66r9afyqrJSVp5km9R+O3Ie2YW1rtmabOVyO0LyfZRWiYGbzc5/HmlkZ4zWNiIrNPptWogBS1ovuGLUkkh+9tnURzDWEsIYgzhd91/0RlRgj5NE8PFHZ32RCwyPy3LccsGTCM1dcKErN/7XRdGmV+8HsgF5lShKmrjOl11ZLPotlgBLbYLMphWDogLrjc3Xo5/ib2rXSLvnjjGSf+WPe0zRtMYnQ4YR7cJFnknD38ejYWserFllTfvRkjKA2qOmxYYPfuIJMKKlFGJxu2GsDJXOphJ9sKz30D2fIlanczXGSgPf1JRtWeMsdhapRh4hEwJRTntag==
```

결제가 완료되면 전달받는 Message와 Signature를 통해서 앞서 말한 서명과 검증 과정을 통해서 생성한 한 쌍의 Hash 값을 비교해 안전하게 결제 내역에 대한 검증을 할 수 있게 되는 것이다. 마지막으로 Java 프로그래밍을 통해 직접 구현해 보도록 하겠다.

## Java 프로그래밍을 통해 RSA 구현해보기

지금까지 우리는 익숙한 HTTPS의 작동 방식과 Google Play의 인앱 결제 시에 서명과 검증 과정을 통해 RSA 알고리즘이 이론적으로 어떻게 작동되는지 살펴보았다. 지금 부터는 우리의 서비스에서 직접 활용해 볼 차례다. 본문에서는 Java 프로그래밍을 통해 구현해 보도록 하겠다.

#### 한 쌍의 공캐키와 비밀키 생성

먼저 RSA는 한 쌍의 공개 키와 비밀 키를 필요로 하는데 필자는 테스트 코드를 먼저 작성해 아래와 같이 한 쌍의 키를 얻는 것을 기대해 보았다.

```java
import java.security.KeyPair;

public class SecurityTests {

    @Test
    public void generateKeyPair() throws NoSuchAlgorithmException {
        KeyPair keyPair = Security.generateKeyPair();
        assertThat(keyPair.getPrivate()).isNotNull();
        assertThat(keyPair.getPublic()).isNotNull();
    }
}
```

테스트 코드만 있을 뿐 아직은 `Security` 클래스는 존재하지 않아 아래와 같이 클래스를 만들고 `java.security` 패키지의 `KeyPairGenerator` 클래스를 이용해 한 쌍의 키를 획득하는 함수를 작성하였다. RSA 알고리즘을 사용하는 것을 볼 수 있으며 RSA 알고리즘에 필요한 키는 2048 bit의 크기가 가장 안전하다. 

```java
import java.security.*;

public class Security {

    private static final int DEFAULT_KEY_SIZE = 2048;
    
    private static final String KEY_FACTORY_ALGORITHM = "RSA";

    public static KeyPair generateKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance(KEY_FACTORY_ALGORITHM);
        generator.initialize(DEFAULT_KEY_SIZE, new SecureRandom());
        KeyPair pair = generator.generateKeyPair();
        return pair;
    }
}
```

함수 작성을 완료하고 테스트가 정상적으로 실행된다면 생성한 공개키, 비밀키를 이용해 암호화와 복호화를 해보자.

#### 암호화와 복호화

우리는 이미 한 쌍의 키를 생성하는 과정을 거쳤으며 이를 이용해 테스트 코드에서는 아래와 같이 암호화, 복호화되는 것을 기대해 보았다.

```java
@Test
public void encryptAndDecrypt() throws NoSuchAlgorithmException {
    String plainText = "{}";
    KeyPair keyPair = Security.generateKeyPair();

    byte[] encodedPublicKey = keyPair.getPublic().getEncoded();
    byte[] encodedPrivateKey = keyPair.getPrivate().getEncoded();

    String cipherText = Security.encrypt(plainText, encodedPublicKey);
    assertThat(plainText).isEqualTo(Security.decrypt(cipherText, encodedPrivateKey));
}
```

아래의 코드를 통해 암호화는 RSA 알고리즘을 통해 생성된 공개키를 이용하며, 암호화된 메세지는 비밀키를 이용해 복호화하는 것을 알 수 있다.

```java
import java.security.*;

public class Security {

    private static final int DEFAULT_KEY_SIZE = 2048;

    private static final String KEY_FACTORY_ALGORITHM = "RSA";

    public static String encrypt(String plainText, byte[] encodedPublicKey) throws NoSuchAlgorithmException {
        PublicKey publicKey = Security.generatePublicKey(encodedPublicKey);
        try {
            Cipher cipher = Cipher.getInstance(KEY_FACTORY_ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            byte[] bytes = cipher.doFinal(plainText.getBytes(CHARSET));
            return Base64.getEncoder().encodeToString(bytes);
        } catch (NoSuchPaddingException | InvalidKeyException | UnsupportedEncodingException | IllegalBlockSizeException | BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }

    public static String decrypt(String cipherText, byte[] encodedPrivateKey) throws NoSuchAlgorithmException {
        PrivateKey privateKey = Security.generatePrivateKey(encodedPrivateKey);
        try {
            byte[] bytes = Base64.getDecoder().decode(cipherText);
            Cipher cipher = Cipher.getInstance(KEY_FACTORY_ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            return new String(cipher.doFinal(bytes), CHARSET);
        } catch (NoSuchPaddingException | InvalidKeyException | UnsupportedEncodingException | IllegalBlockSizeException | BadPaddingException e) {
            throw new RuntimeException(e);
        }
    }
}
```

#### 서명과 검증하기

서명은 Signature를 생성하는 과정이다. 아래와 같이 Hash된 원본 메세지를 비밀키를 통해 암호화하는 과정을 기대해 보았다. Signature가 정상적으로 생성되는 것으로 가정하고 원본 메세지는 동일한 함수로 Hash하고 암호화된 메세지는 공개키를 통해 복호화해 두 Hash 값을 비교하는 과정이다.

```java
@Test
public void signAndVerify() throws NoSuchAlgorithmException {
    String plainText = "{}";
    KeyPair keyPair = Security.generateKeyPair();

    byte[] encodedPrivateKey = keyPair.getPrivate().getEncoded();
    byte[] encodedPublicKey = keyPair.getPublic().getEncoded();

    String signature = Security.sign(plainText, encodedPrivateKey);
    System.out.println("signature = " + signature);
    assertThat(signature).isNotNull();

    boolean result = Security.verify(plainText, signature, encodedPublicKey);
    assertThat(result).isTrue();
}
```

`java.security` 패키지의 `Signature` 클래스를 이용해 앞서 말한 과정을 구현할 수 있으며 생성한 Signature는 REST API에서 자주 활용될 수 있으므로 Base64로 인코딩하는 것을 추천한다. 

```java
public static String sign(String plainText, byte[] encodedPrivateKey) {
    try {
        Signature privateSignature = Signature.getInstance(SIGNATURE_ALGORITHM);
        privateSignature.initSign(Security.generatePrivateKey(encodedPrivateKey));
        privateSignature.update(plainText.getBytes(CHARSET));
        byte[] signature = privateSignature.sign();
        return Base64.getEncoder().encodeToString(signature);
    } catch (NoSuchAlgorithmException | InvalidKeyException | UnsupportedEncodingException | SignatureException e) {
        throw new RuntimeException(e);
    }
}

public static boolean verify(String plainText, String signature, byte[] encodedPublicKey) {
    PublicKey publicKey = Security.generatePublicKey(encodedPublicKey);
    return Security.verifySignarue(plainText, signature, publicKey);
}

private static PrivateKey generatePrivateKey(byte[] encodedPrivateKey) {
    try {
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_FACTORY_ALGORITHM);
        return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(encodedPrivateKey));
    } catch (NoSuchAlgorithmException e) {
    	throw new RuntimeException(e);
    } catch (InvalidKeySpecException e) {
        throw new IllegalArgumentException(e);
    }
}

private static boolean verifySignarue(String plainText, String signature, PublicKey publicKey) {
    Signature sig;
    try {
        sig = Signature.getInstance(SIGNATURE_ALGORITHM);
        sig.initVerify(publicKey);
        sig.update(plainText.getBytes());
        if (!sig.verify(Base64.getDecoder().decode(signature)))
            throw new InvalidSignatureException("It was awesome! Signature hasn't be invalid");
    } catch (NoSuchAlgorithmException | InvalidKeyException | SignatureException e) {
    	throw new RuntimeException(e);
    }
    return true;
}
```

> `JDK 8`에서는 위와 같이 Base64 Encoding/Decoding을 위해서 표준 API를 제공하고 있으니 더 이상 `common-codec`과 같은 라이브러리는 사용할 필요가 없다.

<br/>

지금까지 대칭키와 공개키를 이용한 기본적인 암호화 기법에 대해 설명하고 Java 프로그래밍을 통해 직접 구현해 보기도 하였습니다. RSA를 이용한 암호화와 서명을 추상적으로 이해하는 것이 아니라 그 원리를 제대로 이해하고 서비스에 활용한다면 더욱 안전한 애플리케이션을 개발할 수 있을 것으로 기대합니다. 본문에 사용된 전체 소스코드는 아래의 Gist 링크에서 확인할 수 있습니다.

> https://gist.github.com/stunstunstun/5ea5670b5bfd6459cbebdfbfd4674063
https://gist.github.com/stunstunstun/8dbc82bd86f38c9232139e0ba9a7d8ad

<br/>

#### References

> https://en.wikipedia.org/wiki/Symmetric-key_algorithm
https://ko.wikipedia.org/wiki/RSA_%EC%95%94%ED%98%B8
https://www.openssl.org/
https://ko.wikipedia.org/wiki/HTTPS