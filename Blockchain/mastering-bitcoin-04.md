
## 4장 키, 주소, 지갑

## 키

비트코인의 분산된 신뢰, 관리 소유권 입증, 암호 증명 보안 모델 등 비트코인이 가지는 흥미로운 특성은 디지털 키로부터 시작된다.

키는 공개키와 비밀키로 나뉘어지며 대부분의 경우 이 두쌍의 키는 지갑 내부의 파일로 저장되며 지갑 소프트웨어를 통해 관리된다.

### 키는 어떻게 생성되지?

비트코인 주소는 두 쌍의 키 중 공개키에 해당된다. 이를 통해 거래 주소를 식별할 수 있고 거래할 수 있게 된다. 공개키와 개인키를 통한 RSA 암호법은 매우 효율적이다. 
공개키를 통한 암호화 뿐만 아니라 개인키를 통해 거래에 대한 메세지를 서명하는 용도로 쓰일 수 있다.

비트코인을 소비하는 경우, 현재의 비트코인 소유주가 거래 내에서 공개키와 서명을 제시하면, 해당 금액의 비트코인을 소비할 수 있다. 공개키와 서명을 제시하게 되면 비트코인 네트워크 내에 있는 모든 사람들이 그 거래를 검증한다.

## 주소

- 개인키(k) > 공개키(K) > 비트코인 주소(A)
- 개인키(k) <(x) 공개키(K) <(x) 비트코인 주소(A)

### 타원곡선 암호법

- https://ko.wikipedia.org/wiki/%ED%83%80%EC%9B%90%EA%B3%A1%EC%84%A0_%EC%95%94%ED%98%B8

### 인코딩

비트코인 주소는 거의 항상 `Base58Check`라는 인코딩을 통해서 사용자들에게 제공된다. 인코딩이 필요한 이유는 압축 URL의 필요성과 동일하다.

- https://en.bitcoin.it/wiki/Base58Check_encoding

### Python, Node에서 키와 주소 생성하기

- `Python` - https://github.com/vbuterin/pybitcointools
- `Node` - https://github.com/eschnou/bitcoin-tools

## 지갑

지갑은 개인키를 담는 곳으로, 대개 구조화된 파일이나 간단한 데이터베이스 형태로 구현되어 있다. 키를 제작하는 또 다른 방법은 `Deterministic key generation`이다.

## 거래

### 거래의 생명주기

### 거래의 출력값과 입력값

### 거래 스크립트와 스크립트 언어

#### 잠금과 해체

### 메세지에 서명하기

- https://www.holaxprogramming.com/2017/06/12/encryption-with-rsa/

## References

- https://bitcoin.org/en/developer-documentation