---
title: 자신이 개발한 Android Library를 JCenter Maven Repository에 업로드하기
date: 2015-07-29 15:24:49
categories: android
---

## Overview

이 문서는 TOAST Cloud 의 상품인 IAP의 Android Library Project를 jcenter와 Maven central과 같은 표준 Maven Repository에 업로드한 과정을 정리한 문서입니다.

- 팀 내에서 사용하는 Maven Repository는 사내망으로 TOAST Cloud와 같은 public 서비스의 유저에게 제공하기에는 제한이 있는 상태였습니다.
- 이 문서는 Android를 기준으로 작성되었지만 이후에 비슷한 사례로 Maven Central(sonatype.org) 또는 jcenter(bintray.com)에 Java Library를 배포할 이슈가 있다면 참고하시면 좋을 것 같습니다.
- 이 문서의 빌드도구는 Gradle 2.2.1 Version을 기반으로 작성되어 졌습니다.

## 시작하기

Android Studio 또는 Gradle을 사용하는 Java Project에서는 build.gradle 파일에 아래와 같이 dependency만을 추가하면 특정 Library를 포함할수 있습니다.

```
dependencies {
    compile 'com.google.code.gson:gson:2.2.4'
}
```

이것이 Google에서 제공하는 gson이라는 Library를 사용하기 위한 전부입니다.

그러나 여기서 의문이 생길수 있을것 같습니다. Gradle은 위의 빌드스크립트에 정의한 gson이라는 Library를 어디에서 가져오게 될까요? 지금부터 이 문서에서는 Gradle을 통해 빌드하는 프로젝트가 어떻게 Library를 가져오게 되며, 자신이 직접 개발한 Library는 전세계의 개발자들에게 어떻게 공유할수있게 되는지 자세히 설명해보려고 합니다.

## Android Studio IDE & Gradle

Android Library Project를 Maven Repository에 업로드하기 위해서는 Maven 또는 Gradle과 같은 빌드도구를 사용하는 것이 유리합니다. 

Google Android Developers에서는 기존의 Eclipse에서 Android Studio IDE를 BETA Version을 시작으로 최근에는 정식으로 Release 하면서 Gradle을 통해 효율적으로 빌드할수 있는 솔루션을 제공하고 있습니다.

`Android Studio`

현재 2015.08를 기준으로 Android Studio IDE의 최신 Version은 1.3입니다.

- https://developer.android.com/tools/studio/index.html
- https://developer.android.com/sdk/installing/studio-build.html

IAP의 Android SDK는 기존의 프로젝트를 Gradle 프로젝트의 구조로 변경하는 작업을 먼저 진행 후에 Build Tasks에 Maven Repository에 Android Library Project(AAR)를 업로드하는 것을 추가하는것을 목표로 진행하였습니다.

뿐만 아니라 기존에 지원하는 Eclipse + ADT를 위한 SDK도 동일한 형태로 배포가 가능해야 했는데, Build Tasks에 추가적으로 기존의 SDK의 형태로 Archives 하는 방식으로 진행하였습니다.

Gradle은 하나의 프로젝트 하위에 모듈이 존재하는 구조입니다.

`toast-iap-android-sdk`

모듈 | 비고 
--|--
mobill-core	| IAP의 개발을 위한 Core Library
iap |	IAP의 API제공을 위한 Android Library Project
iap-tstore |	원스토어 연동을 위한 Library
iap-naver | 네이버앱스토어 연동을 위한 Library
iap-sample | SDK 사용가이드를 위한 샘플애플리케이션

## Android Studio는 어디에서 Library를 가져올까요?

Android Stuidio는 build.gradle에 정의되는 Maven Repository Server로부터 library를 다운로드 하게 되는데 아래와 같이 jcenter 와 Maven Central과 같은 표준 서버가 존재합니다.

#### jcenter

jcenter는 bintray.com 에서 운영되는 Maven Repository이며, 이곳에서 전체 Repository를 확인할수 있습니다.

프로젝트에서 jcenter를 사용하기 위해서는 build.gradle 파일에서 아래와 같이 정의해줍니다.

```
allprojects {
    repositories {
         jcenter()
    }
}
```

#### mavenCentral

Maven Central는 sonatype.org 에서 운영되는 Maven Repository이며, 이곳에서 전체 Repository를 확인할수 있습니다.

프로젝트에서 Maven Central을 사용하기 위해서는 build.gradle 파일에서 아래와 같이 정의해준다.

```
allprojects {
    repositories {
         mavenCentral()
    }
}
```

주의해야할 점은 jcenter와 Maven Central 모두 표준 Android Library 저장소지만 이둘은 분명히 서로 연관이 없는 다른 Repository라는 것입니다. 예를 들면 jcenter에서는 library를 참조가능하지만 Maven Central에서는 불가능할수도 있다는 것입니다.

위 두 표준 Repository와 별도로, 특정 Maven Repository를 추가해야 하는 경우도 있는데요. Twitter의 Fabraic.io의 경우 그들이 호스팅한 Maven Repository를 통해 Library를 제공하고 있습니다. 만약 Fabric.io의 Library를 사용해야 한다면 아래와 같이 Repository URL을 추가적으로 정의해야 합니다.

```
repositories {
    maven { url 'https://maven.fabric.io/public' }
}
```
```
dependencies {
    compile 'com.crashlytics.sdk.android:crashlytics:2.2.4@aar'
}
```

하지만 Library를 public하게 공유하기 위해서는 다른 개발자들이 어떠한것도 정의하지 않는것이 가장 좋을것 입니다, 그래서 이문서에서는 jcenter 와 Maven Central를 통해 개발자를 위해 더나은 경험을 제공하고자 합니다.

## jcenter와 Maven Central에 대해 조금만 더 자세히 알아보겠습니다.

왜 표준 Repository가 jcenter/Maven Central 이렇게 둘로 나뉘어서 제공이 될까요?
두 Repository 모두 Java/Android Libraries를 제공한다는 공통된 성격을 가지고 있습니다. 어느 Repository에 자신의 Library를 업로드할것인지는 개발자의 선택입니다.

먼저, Android Studio는 초기에는 디폴트 Repository로 Maven Central을 선택했습니다. Beta Version의 Android Studio를 통해 새로운 프로젝트를 생성하면 자동으로 mavenCentral()이 build.gradle에 정의되는것을 확인할수 있습니다.

그러나 Maven Central은 개발자에게 친숙하지 않다는 큰 문제점이 있었는데요. Library를 업로드하기 위한 과정이 놀랍도록 어려워서 Geeky 레벨의 몇몇 개발자들만이 이것이 가능했습니다. 이외에도 보안이슈와 같은 몇몇이유로 인해 Android Studio 팀은 Maven Central을 대신해 jcenter를 디폴트 Repository로 교체하기로 결정하게 됩니다. 

최신의 Android Studio를 통해 새로운 프로젝트를 생성하면 jcenter()가 build.gradle에 자동으로 정의되는것을 확인할수가 있을 것 입니다.

`jcenter의 장점은 아래와 같습니다`

- Libary를 CDN을 통해 제공하여, 개발자들이 더욱 빠른속도를 경험하게 됩니다.
- jcenter는 지구상의 가장 큰 Java Repository입니다. Maven Central의 거의 대부분의 Libraries를 jcenter를 통해서도 제공받을수 있다고 보면 됩니다.
- 믿을 수 없을정도로 Library를 Upload하기 쉬우며, Maven Central과 같이 복잡한 설정과 싸울필요가 없습니다.
- 친숙한 UI를 제공합니다.
- 만약 Maven Central에도 Library를 업로드하고 싶다면, bintray.com을 통해서 클릭한번만으로 동기화시킬수 있는 기능을 제공합니다.


## About aar Format

jar와 같은 Java Library는 Android Studio의 로컬에서 참조해서 바로 사용 할수도 있습니다.
이경우에는 Gradle 빌드를 사용하는 Android Studio의 프로젝트에서 Library를 사용하는데 큰이슈가 없지만 기존의 Eclipse + ADT 기반에서 사용하던 Android Library Project를 로컬에서 사용하는데에는 제한이 됩니다.

Gradle에서는 Android Library Projet를 arr이라는 포맷을 통해 사용할수 있게되는데요. arr은 Android에서 특화된 AndroidManifest.xml, Resources, Assets, JNI와 같은 파일을 포함합니다. 
jar와 같이 zip파일 형태이며 파일내의 구조는 아래와 같습니다.

```
/AndroidManifest.xml (mandatory)
/classes.jar (mandatory)
/res/ (mandatory)
/R.txt (mandatory)
/assets/ (optional)
/libs/*.jar (optional)
/jni/<abi>/*.so (optional)
/proguard.txt (optional)
/lint.jar (optional)
```

보시다시피 .aar 파일은 Android를 위해 설계되었으며, 이 문서에서는 계속해서 aar파일을 어떻게 생성하여 Repository에 업로드하는지 알아보도록 하겠습니다.


## Bintray를 이용해 jcenter에 AAR 업로드하기

여기까지 Repository 시스템에 대한 기본지식을 살펴보았고, 지금부터는 http://jcenter.bintray.com 에 library를 어떻게 업로드하는지 살펴보도록 하겠습니다. 먼저 두가지 의문이 생기게 될텐데요,

- aar 파일은 어떻게 생성해야 하는가?
- 생성한 aar파일을 어떻게 Repository에 업로드를 해야 할까?

jcenter Repository를 제공하는 bintray.com 을 통해 이를 매우 손쉽게 해결할 수가 있습니다. 아래의 그림을 통해 Repository에 업로드되는 전체적인 과정을 살펴보도록 하겠습니다.

#### Part 1 : Bintray 계정 및 패키지 생성하기

- Sing Up to Bintray
- 계정 생성후 Profile > Edit 를 통해 API Key를 확인
- Bintray 계정명과 API Key는 build.gradle에서 library를 업로드하기 위한 설정정보로 사용됩니다.
- Owned Repositories 중 maven Repository를 선택하고 Add New Package를 통해 새로운 패키지를 생성합니다.
- 패키지 생성을 위한 정보를 입력하고 성공적으로 생성되면 아래와 같은 패키지관리를 위한 페이지로 이동되게 됩니다.
- Bintray의 Maven Repository에 library를 업로드하기 위한 준비가 완료되었습니다. 앞으로 사용하게 될 정보를 요약하면 아래와 같습니다.

Configurations	| Examples
--|--
Bintray User | Bintray 계정생성을 통해 발급
Bintray API Key	| Profile > Edit페이지를 통해 API Key를 확인
Repository Name	| maven
Package Name | iap

#### Part 2 : Maven Central을 위한 Sonatype 계정생성하기

Bintray에 업로드한 library는 손쉽게 Maven Central Repository에 동기화시킬 수가 있습니다. 이를 위해서는 Sonatype에 계정 신청 절차가 필요합니다.

- Sonatype 의 JIRA의 Issue Tracker 를 통해 계정신청을 위한 이슈를 등록할수 있습니다.
- Create 버튼을 통해 진행하면 되며, 포맷을 아래와 같습니다.
- Sonatype의 계정등록이 완료되면 Bintray의 Profile > Accounts 메뉴에서 Sonatype OSS User에 생성된 계정명을 입력합니다.

<img src='http://inthecheesefactory.com/uploads/source/jcenter/sonatypeusername.png' />

#### Part 3 : Bintray 업로드시에 Auto Signing 활성화하기

jcenter를 통해 Maven Repository에 library를 동기화하기 위해서는 먼저 library를 서명하는 절차가 필요합니다. Bintray에서는 웹서비스를 통해 서명정보를 설정하면 업로드시에 자동으로 서명할수 있는 기능을 제공합니다.

서명정보 생성을 위해서 아래의 Command Line을 참고하도록 합니다. 서명정보를 생성하는 과정입니다. email정보와 패스워드정보를 입력해야 합니다.

```
] gpg --gen--key
```

생성한 서명정보를 리스트업합니다.

```
] gpg --list-keys
```

만약 아무문제가 없다면 위와같이 서명정보가 리스트업됩니다. 여기서 PUBLIC_KEY_ID는 01ABCDEF를 가르킵니다.

```
pub   2048R/01ABCDEF 2015-03-07
uid                  Sittiphol Phanvilai <yourmail@email.com>
sub   2048R/98765432 2015-03-07
```

서명 정보가 생성이되면 Public Key를 keyservers에 업로드해야 하는데 PUBLIC_KEY_ID를 확인하고 아래와 같이 keyservers에 전송할 수 있도록 합니다.

```
] gpg --keyserver hkp://pool.sks-keyservers.net --send-keys PUBLIC_KEY_ID
```

아래의 Command를 통해 public 과 private key를 ASCII armor 포맷으로 생성해야 하며 yourmail@email.com 부분을 서명정보생성시 기입했던 이메일정보로 대체하시면 됩니다.

```
] gpg -a --export yourmail@email.com > public_key_sender.asc
] gpg -a --export-secret-key yourmail@email.com > private_key_sender.asc
```

아래와 같이 Profile > Edit 메뉴에서 GPG Signing 정보를 설정하시면 됩니다. 

<img src='http://inthecheesefactory.com/uploads/source/jcenter/gpg.png' />

최종적으로 maven Repository의 Edit메뉴를 통해 GPG Signing 상태를 활성화 합니다.

<img src='http://inthecheesefactory.com/uploads/source/jcenter/autosigned.png' />


#### Part 4 : Android Library에서 업로드를 위한 build.gradle 정의하기

Bintray 플러그인을 통해 업로드하기 위한 라이브러리를 아래와 같이 추가해줍니다.

`Gradle >= 2.1`

```
plugins {
     id "com.jfrog.bintray" version "1.2"
}
```

`Gradle < 2.1`

```
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.2'
        classpath 'com.github.dcendents:android-maven-plugin:1.2'
    }
}
 
apply plugin: 'com.jfrog.bintray'
apply plugin: 'maven-publish'
 
....
```

`bintray configurations`

build.gradle에 Bintray에 업로드하기 위한 설정을 위해서는 아래와 같은 정보를 local.properties에서 관리하는 것이 유리합니다.

`local.properties`

```
sdk.dir=C\:\\Dev\\android-sdks
bintray.user=YOUR_BINTRAY_USERNAME
bintray.apiKey=YOUR_BINTRAY_API_KEY
bintray.repoName=maven
```

이제 마지막으로 업로드하기 위한 Library를 관리하는 Android Studio의 모듈의 build.gradle에 아래와 같이 bintray Repository에 업로드하기위한 정보를 정의합니다.

`build.gradle`

```
install {
    repositories.mavenInstaller {
        // This generates POM.xml with proper parameters
        pom {
            project {
                packaging ARTIFACT_TYPE
                name ARTIFACT_NAME
                description 'The Project In App Purchase Core Module'
                url siteUrl
 
                licenses {
                    license {
                        name 'The Apache Software License, Version 2.0'
                        url 'http://www.apache.org/licenses/LICENSE-2.0.txt'
                    }
                }
                developers {
                    developer {
                        id 'nhnent'
                        name 'nhnent'
                        email 'minhyuck.jung@nhnent.com'
                    }
                }
                scm {
                    connection gitUrl
                    developerConnection gitUrl
                    url siteUrl
                }
            }
        }
    }
}
 
publishing {
    publications {
        mavenJava(MavenPublication) {
            groupId TOAST_IAP_GROUP_ID
            version project.version
            artifactId ARTIFACT_NAME
            artifact "$buildDir/outputs/$ARTIFACT_TYPE/$ARTIFACT_NAME-release.$ARTIFACT_TYPE"
        }
    }
}
 
task sourcesJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier = 'sources'
}
 
task javadoc(type: Javadoc) {
    failOnError false
 
    source = android.sourceSets.main.java.srcDirs
    classpath += project.files(android.getBootClasspath().join(File.pathSeparator))
}
 
task javadocJar(type: Jar, dependsOn: javadoc) {
    classifier = 'javadoc'
    from javadoc.destinationDir
}
 
artifacts {
    archives sourcesJar
    archives javadocJar
}
 
Properties properties = new Properties()
properties.load(project.rootProject.file('local.properties').newDataInputStream())
 
bintray {
    user = properties.getProperty("bintray.user")
    key = properties.getProperty("bintray.apiKey")
 
    publications = ['mavenJava']   //When uploading Maven-based publication files
    configurations = ['archives']  //When uploading configuration files
    pkg {
        repo = properties.getProperty("bintray.repoName")
        name = ARTIFACT_NAME
        licenses = ['Apache-2.0']
        vcsUrl = gitUrl
        publicDownloadNumbers = true
        publish = true
        version {
            name = TOAST_IAP_SDK_VERSION
            desc = TOAST_IAP_SDK_VERSION
            vcsTag = TOAST_IAP_SDK_VERSION
            gpg {
                sign = true                                                 //Determines whether to GPG sign the files. The default is false
                passphrase = properties.getProperty("bintray.gpgPassword")  //Optional. The passphrase for GPG signing'
            }
        }
    }
}
```

## Trouble Shooting 

#### bintryUpload Task시 pom.xml 파일이 생성되지 않을때

아래의 tasks를 추가하도록 합니다.

```
] gradlew clean install generatePomFileForMavenJavaPublication publishMavenJavaPublicationToMavenLocal bintrayUpload
```
#### bintryUpload Task시 아래와 같은 에러메세지를 노출하면서 빌드가 실패할 때

```
] Some problems were found with the configuration of task ':app:bintrayUpload'.
> No value has been specified for property 'packageName'.
> No value has been specified for property 'user'.
> No value has been specified for property 'apiKey'.
> No value has been specified for property 'repoName'.
```

> Bintray의 Profile > Edit에서 API Key를 갱신하여 다시 설정하는 방법으로 해결


#### Part 5 : Bintray에 library 업로드하기

Gradle에 library 업로드하기 위한 정의가 끝났다면, Android Studio의 Terminal탭을 통해 Command를 통해 업로드할수 있습니다.

Android Library를 빌드하고 aar, pom과 같은 파일을 생성하는 단계입니다.

```
$ gradlew install
```

bintray configurations을 참조하여 Repository에 업로드하는 과정입니다.

```
$ gradlew bintrayUpload
```

Repository에 업로드가 완료되면, 아래와 같이 라이브러리를 사용할수 있게 됩니다. 하지만 jcenter를 통해 더욱 손쉽게 library를 가져오기 위해서는 추가적인 과정이 필요합니다.

```
repositories {
    maven {
        url 'https://dl.bintray.com/nhnent/maven/'
    }
}
  
...
  
dependencies {
    compile 'com.toast.iap:iap:1.2.0'
}
```

#### Part 6 : Bintray Repository를 jcenter에 동기화하기

Bintray Repository에 library 업로드가 완료되면, Package 메뉴에서 Add to JCenter 버튼만 누르게 되면 자동으로 동기화가 가능합니다.

jcenter에 동기화 요청을하면 수시간 또는 적어도 하루이내에는 요청에 대한 처리메일이 전달됩니다. 최종적으로 아래와 같이 jcenter에 동기화되는것을 확인하실수 있습니다.

<img src='http://inthecheesefactory.com/uploads/source/jcenter/linkedto.png' />


## jcenter Repository에 업로드 완료된 Library를 프로젝트에 적용하기

지금까지 과정을 성공적으로 마쳤다면, 표준 Maven Repository인 jcenter에 library가 배포되었을 것입니다.
IAP의 Android Library는 아래의 링크를 통해 성공적으로 업로드된것을 확인할 수 있습니다.

- http://jcenter.bintray.com/com/toast/iap/

jcenter Repository에 library업로드가 완료되면 이제는 아래와 같이 library를 사용할수 있게 됩니다!

`Maven`

```
<dependency>
   <groupId>com.toast.iap</groupId>
   <artifactId>iap</artifactId>
   <version>1.2.0</version>
<dependency>
```

`Gradle`

```
dependencies {
    compile group: 'com.toast.iap', name: 'iap', version: '1.2.0'
}
```

## 배포결과

지금까지 Android Studio IDE & Gradle을 통해 프로젝트를 빌드하고 외부에 배포하기위한 Library를 Maven Repository에 업로드 하였습니다. 최종적으로 TOAST Cloud IAP의 Android SDK는 릴리즈시 아래와 같은 결과물을 기대했고, 빌드서버를 통해 아래의 배포결과를 자동으로 생성하게 됐습니다.

> http://docs.cloud.toast.com/ko/Common/IAP/ko/Android%20Developer%60s%20Guide/

#### IAP Android SDK 사용을 위한 Dependency 설정하기

rootProject의 build.gradle에서 jcenter Maven Repository를 추가합니다.

```
subprojects {
    repositories {
        jcenter()
    }
}
```

애플리케이션의 build.gradle 에서 SDK Version을 지정

```
compile group: 'com.toast.iap', name: 'iap', version: '1.2.0'
```

애플리케이션의 build.gradle 에서 가장 최신의 SDK Version을 지정

```
compile group: 'com.toast.iap', name: 'iap', version: '+'
```

## References

> https://developer.android.com/tools/studio/index.html
https://developer.android.com/tools/building/plugin-for-gradle.html
https://github.com/bintray/gradle-bintray-plugin
http://inthecheesefactory.com/blog/how-to-upload-library-to-jcenter-maven-central-as-dependency/en
https://github.com/danielemaddaluno/gradle-jcenter-publish




