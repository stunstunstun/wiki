---
title: Android Studio IDE와 Gradle
date: 2015-06-30 15:24:49
categories: android
---

## Android Studio 1.2 Release

- Android 는 개발도구로서 기존의 Eclipse + ADT 플러그인을 더이상 지원하지로 않기로 하고 인텔리J를 기반으로 한 Android Studio 를 개발도구로 지정한 상태이다. 
- Android Studio의 Beta / 1.0 Version의 경우 아직 개발환경을 교체할 정도의 경험은 느낄수 없다고 판단했지만 1.2 Version이 Release 되면서 Android Studio & Gradle 기반의 개발환경으로의 교체를 검토하게 되었다.

## Android Studio 와 Gradle 이용한 개발 환경 구성

- Eclipse 에서 Android Studio 로 개발환경을 이전한 이유로는 기존에 빌드 및 CI를 위해서 Gradle 을 이미 사용하고 있었고, Android Studio는 Gradle 프로젝트 관리를 위한 강력한 기능과 Eclipse에 비해 훨씬 놀라운 사용자 경험을 제공한다.
- 이와 같이 개발환경이 변경되면서 로컬개발 환경과 프로젝트의 CI와 QP측정을 위해서 빌드서버의 android 환경은 아래와 같이 구성을 하였다.

#### 로컬개발환경

구분 | 비고
--|--
JDK 1.7	| http://www.oracle.com/technetwork/java/javase/downloads/index.html
Gradle | Version 2.2.1
Android SDK Platform Tools 22 | - 
Android SDK Platform 5.0.1 | API Level 21
Android SDK Build-Tools	| 21.1.2
Android Studio IDE 1.2 | https://developer.android.com/sdk/index.html

#### Linux CI/빌드서버

구분 | 비고
--|--
JDK | 1.7	
Gradle | Gradle 2.2.1 Version을 Jenkins에 설치완료
Android SDK Platform Tools 22 | -
Android SDK Platform 5.0.1 (API 21) | -	
Android SDK Build-Tools 21.1.2 | -
Android Support Library | -
Android Support Repository | -	
	
`Linux 환경에서의 android 설치 및 Library 설치`

```
@root] android list sdk --all : 안드로이드의 사용가능 패키지 리스트 조회
@root] android update sdk -u --all -- filter <number, number> 
```

## Android 에서의 Gradle의 프로젝트 구조

Android Studio 의 Gradle 프로젝트의 구조는 프로젝트 하위에 각 모듈이 존재하는 구조입니다.

`Examples`

- toast-iap
    - mobill-core
    - iap
    - iap-tstore
    - iap-naver
    - iap-sample


`각 모듈의 구조는 아래와 같습니다`

- build
- libs
- src/main
    - java 
    - res
    - AndroidManifes.xml
- build.gradle
- gradle.properties

	
이 문서에서는 Gradle 프로젝트에 대해서는 자세하게 다루지 않습니다, 아래의 Gradle Reference 참조하시면 좋습니다.

> http://gradle.org/


## Maven Repository

Android Studio 는 Gradle 을 통해 Remote 로 라이브러리를 다운로드 할수 있습니다. `build.gradle` 파일에 아래와 같이 dependency만을 추가하면 특정 Library를 포함할 수 있습니다.

```
dependencies {
    compile 'com.google.code.gson:gson:2.2.4'
}
```

이것이 Google에서 제공하는 gson이라는 Library를 사용하기 위한 전부입니다.


## 애플리케이션의 실행 및 Flavor 설정

`rootProject의 setting.gradle`

```
include ':iap-sample'
```

`rootProject의 build.gradle`

```
subprojects {
    repositories {
         jcenter()
    }
}
```

`build.gradle`

```
dependencies {
    compile fileTree(dir: 'libs', includes: ['**/*.jar'])
    compile group: 'com.android.support', name: 'support-v4', version: '21.0.0'
    compile group: 'com.toast.iap', name: 'iap', version: '1.2.0'
}
```

> Workspace File encoding이 UTF-8로 되어 있는지 확인합니다.

#### 로컬에 설치한 Android SDK경로 지정

local.properties 내부에 sdk.dir에 local에 설정된 Android SDK의 경로를 지정합니다.

#### 애플리케이션의 실행과 Flavor 설정

Android Studio IDE 에서는 아래와 같이 Build Variant 메뉴를 통해서 Flavor, BuildType을 지정할수 있습니다.


`인앱결제를 Google Play로 빌드할 경우`

```
googleRelease
```

#### Flavor 설정

Flavor 설정을 통해 빌드시에 아래와 같이 복수의 빌드타입을 생성할수가 있게 됩니다.

`google 로 지정된 Flavor의 sourceSets`

```
/src/google/java
/src/google/res
/src/google/AndroidManifest.xml
```

```
android {
    compileOptions.encoding = "UTF-8"
    version = project.APP_VERSION
 
    compileSdkVersion Integer.parseInt(project.ANDROID_BUILD_SDK_VERSION)
    buildToolsVersion project.ANDROID_BUILD_TOOLS_VERSION
    publishNonDefault true
 
    defaultConfig {
        minSdkVersion Integer.parseInt(project.ANDROID_BUILD_MIN_SDK_VERSION)
        targetSdkVersion Integer.parseInt(project.ANDROID_BUILD_TARGET_SDK_VERSION)
        versionCode Integer.parseInt(project.APP_VERSION)
        versionName project.APP_VERSION_NAME
    }
 
    lintOptions {
        abortOnError false
    }
 
    productFlavors {
        local {
            applicationId = "com.nhnent.iap.test"
        }
 
        google {
            applicationId = "com.nhnent.iap.google"
        }
 
        naver {
            applicationId = "com.nhnent.iap.naver"
        }
 
        tstore {
            applicationId = 'com.nhnent.iap.tstore'
        }
    }
 
    signingConfigs {
        release {
            storeFile file(STORE_FILE_NAME)
            storePassword STORE_PASSWORD
            keyAlias KEY_ALIAS
            keyPassword KEY_PASSWORD
        }
    }
 
    buildTypes {
        release {
            debuggable false
            minifyEnabled false
            zipAlignEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
        debug {
            debuggable true
            minifyEnabled false
            zipAlignEnabled false
        }
    }
 
    sourceSets {
        main {
            jniLibs.srcDirs = ['libs']
        }
    }
}
```










