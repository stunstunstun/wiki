# Homebrew?

The easiest way to install various Unix tools and open source software onto Mac OS X is via a package manager
Unfortunately OS X doesn’t come with one, but fortunately there are some good folks that care.They come in the form of Homebrew.

## Homebrew 설치

Homebrew 를 설치하기 전 아래의 환경이 준비되어 있어야 한다.
- Xcode 
- Xcode Command Line Tools

Terminal Prompt 에서 아래와 같은 command를 통해 설치 할 수 있다.
````
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
````

## Homebrew 를 통해 Java 설치하기

Apple에서 제공하는 Mac을 위한 JRE/JDK 를 설치 할 수도 있겠지만, 아래와 같이 Oracle의 공식적인 Version을 설치하는 것을 권장한다.

```
brew update
brew cask install java
```

**Homebrew Cask**

Homebrew Cask extends Homebrew and brings its elegance, simplicity, and speed to macOS applications and large binaries alike.
> https://caskroom.github.io

## Reference

여기까지 간단하게 Mac환경에서 Homebrew를 통해 Java를 설치하는 방법을 알아보았고 이외의 다른 패키지를 설치하거나 Homebrew 에서 제공하는 자세한 기능은 아래의 링크에서 확인하면 된다.
> http://brew.sh

