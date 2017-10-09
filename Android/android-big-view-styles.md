---
title: 안드로이드 Notification 다양한 UI로 노출하기
date: 2013-08-25 15:24:49
categories: android
---

보통 사용자에게 어떠한 정보를 원하는 시점에 전달하고 싶을때, Notification 메세지를 사용한다. Android 플랫폼에서 이러한 Notification을 위해 GCM (Google Cloud Messaging) 서비스를 제공하고 있다.
특히 모바일게임 서비스시에는 Notification을 통해 이벤트 및 공지를 전달 하는 등의 행위는 실제 유저 유입에 대해 상당히 중요도가 있는 편이다. 이로 인해 다른 게임 서비스에 비해 눈에 띄는 UI 형태를 가져야 하는 이슈가 생기곤 한다. 

일반적인 Notification UI의 형태는 아이콘 / 제목 / 내용의 형태로 노출되곤 하는데 Android 4.1 이후 부터는 보다 더 크고 커스텀한 Notification Style 을 노출 할 수 있게 됐다.

## Using Big View Styles

Big View Style은 Android 4.1에서 부터 소개 되었으며, 이전 Version의 디바이스에서는 지원되지 않는다. 기존 Notification에 대한 Android Reference는 아래의 링크를 통해 확인 할수 있으며,

- http://developer.android.com/guide/topics/ui/notifiers/notifications.html

Big View Styles에 대해서도 아래의 링크를 통해 좀더 자세한 사항을 알수 있다.

- http://developer.android.com/training/notify-user/expanded.html

이 글에서는 위의 Android Reference를 참고하여, Big View Styles을 구현할 수 있도록 샘플 어플리케이션을 통해 설명할려고 한다.

## Big View Style

Big View Style은 크게 아래와 같이 보여줄수 있다.

#### ColorFontStyle

RemoteViews를 통해 별도의 layout을 생성해 글자의 크기또는 색상 뿐만 아니라 요구사항에 맞게 Notification UI를 구성한다.

<img src='https://lh5.googleusercontent.com/qvarc9wq75ZCMZmFjXMeZKBRDwl2eEZEJnWFBxZzzi9sLXs-FHMelqufKA-yxfSTHnqvANfCmNyYs5N9qQRj5GPT0GPuBhCleare4kvGIw89orQkCKHStWO48QTaFQ' width ='300' />

#### BigTextStyle

Notification의 메세지를 장문으로 사용 가능하다. 두 손가락을 이용해 아래로 드래그 시에 Expand 된다.

<img src='https://lh3.googleusercontent.com/W8UwEOZXbWMvONIblenO9gH9ruOowg1V0SesJ6AJbpMWG65k4-aFHeLgtsgt1Fe3GkWV310nrr59AC9dhB72Xh3CPkbL8HBinaqJo4WMATp6i4GRDYuqTjpjtq9bmg' width='300' />


#### BigPictureStyle

Notification에 배너 이미지와 같은 큰이미지를 삽입할수 있다. 두 손가락을 이용해 아래로 드래그 시에 Expand 된다.

<img src='https://lh6.googleusercontent.com/ANxP7OV9kPCsiMrqjofkI7z2TnB2qWr5AyRXLDshjjFDjm1WHNAPhMffzb0dGK6ufkMa7HP3ZT463BJvULahrVJqSAnRAnu_vSMaQBoU0u153sgm9inYKfAWlLt-mg' width='300' />

