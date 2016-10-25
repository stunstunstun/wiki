## Instagram API

https://www.instagram.com/developer/

### Instagram Swift SDK
- Authorization
- Profile
- Images
- Download Image

### Authorization

#### Request
````
    curl -F 'client_id=CLIENT_ID' \
    -F 'client_secret=CLIENT_SECRET' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=AUTHORIZATION_REDIRECT_URI' \
    -F 'code=CODE' \
    https://api.instagram.com/oauth/access_token
````

#### Response
````
{
    "access_token": "203185932.b469ae0.a662c836f754472f9e5def259718cf49",
    "user": {
        "username": "stunstunstun",
        "bio": "그저 일상의 기록 ⛺️🗾🚢🚣🗻",
        "website": "",
        "profile_picture": "https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/s150x150/12356485_955106364579436_1083859727_a.jpg",
        "full_name": "정민혁",
        "id": "203185932"
    }
}
````
