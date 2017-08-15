---
title: Java Concurrency
date: 2014-01-05 00:49:31
categories: java
---

## Overview

우리에게는 한번에 다양한 프로그램을 사용한다는 것이 놀라운 일은 아닙니다. 문서 작업을 하면서 음악을 듣기도하고 동시에 심신을 달래기 위해 영화나 예능 프로그램을 다운로드 받는 것처럼 말이죠. 사실 이러한 일들은 하나의 프로그램으로 범위를 좁혀도 낮설지가 않죠. 

예를 들어 당신의 안드로이드 기기에서 `Spotify`와 같은 훌륭한 앱을 통해 음악을 듣는다고 생각합시다. 당신이 원하는 음악을 선택하면 앱은 네트워크를 통해 오디오 파일을 다운로드 받으며 동시에 음악을 재생하게 됩니다. 뿐만 아니라 재생이 진행된 시간이나 가사를 보여주기도 하죠. 음악이 재생되는 동안에도 당신이 보는 화면은 실시간으로 업데이트 된다는 의미이죠.

Java 플랫폼은 Java programming language 그리고 Java class libraries를 통해서 동시성 프로그래밍을 활용할 수 있도록 설계되어있습니다. 고수준(high-level)의 동시성 API들을 Java 플랫폼 버전 5.0부터 포함하고 있으며 이 글에서는 Java에서 제공하는 동시성 이론을 설명하고 `java.util.concurrent` 패키지에 포함된 몇몇 API들을 소개합니다.


## Table

- [Process and Thread](#process-and-thread)
- Thread Objects
- Synchronization
- Liveness
- Guarded Blocks
- Immutable Objects
- High Level Concurrency 
- For Further Reading
- Questions and Exercises

## Process and Thread

## Immutable Objects