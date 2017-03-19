## Android Studio 2.3

Android Studio 가 베타 Version 에서 1.0 으로 릴리즈 된 이후 오랜만에 다시 다운로드 페이지를 들어가보니 2.3 로 업그레이드 되어있다.
다운로드 및 개발가이드 페이지는 심플하고 멋지게 개선되었으며 사용자는 더욱 편리하게 Android Studio 를 사용 할 수 있게 되었다.

**Features**
- https://developer.android.com/studio/features.html

**User Guide**
- https://developer.android.com/studio/intro/index.html

**Download**
- https://developer.android.com/studio/index.html

### Pre-requries 
- JDK8+

### Android SDK

- Path - /Users/jungminhyuck/Library/Android/sdk/tools/android
- Android SDK Build-Tools 24.0.3
- Android SDK Platform 24
- Android SDK Platform-Tools 24.0.3
- Android SDK Tools 25.2.2

## TDD

## Gradle

## Circle CI

## Travis CI

````yml
language: android
jdk: oraclejdk8
sudo: false

android:
  components:
    - platform-tools
    - tools
    - build-tools-24.0.3
    - android-24
    - sys-img-armeabi-v7a-android-24
    - extra-android-m2repository

before_script:
  # Create and start emulator
  - echo no | android create avd --force -n test -t android-24 --abi armeabi-v7a
  - emulator -avd test -no-skin -no-audio -no-window &
  - android-wait-for-emulator
  - adb shell input keyevent 82 &

script: ./gradlew androidTest
````
