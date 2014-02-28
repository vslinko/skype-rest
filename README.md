# skype-rest

> REST middleware to local Skype instance.

## Usage Example

```js
var skypeREST = require('skype-rest');
var express = require('express');

var app = express();
app.use(express.json());
app.use(skypeREST());

app.listen(3000);
```

## Installation

```bash
npm install --save skype-rest@^0.2
pip install Skype4Py zerorpc gevent
```

## API

### GET /chats/

* 200 OK
* 500 Internal Server Error

```json
[
    {
        "friendlyName": "Вася Хобот",
        "topic": "",
        "name": "#vyacheslav.slinko/$live:vasya.hobot;9f62de6c85e3daed"
    }
]
```

### GET /chats/%23vyacheslav.slinko%2F%24live%3Avasya.hobot%3B9f62de6c85e3daed

* 200 OK
* 500 Internal Server Error

```json
{
    "status": "DIALOG",
    "bookmarked": false,
    "myRole": "USER",
    "dialogPartner": "live:vasya.hobot",
    "description": "",
    "timestamp": 1387175594,
    "guideLines": "",
    "blob": "mTuwsNpnv9Sh2ynShSr4UaAGUJH_c-3UhvY5wphXoGBORSLDZ8ZNvaqRmh2Uy3uoS4FzjGUEMU2X9fjcaJFe",
    "name": "#vyacheslav.slinko/$live:vasya.hobot;9f62de6c85e3daed",
    "passwordHint": "",
    "friendlyName": "Вася Хобот",
    "topic": "",
    "myStatus": "SUBSCRIBED",
    "adder": "",
    "members": ["live:vasya.hobot", "vyacheslav.slinko"],
    "activityTimestamp": 1387175597,
    "posters": ["vyacheslav.slinko"],
    "activeMembers": ["live:vasya.hobot", "vyacheslav.slinko"],
    "type": "DIALOG",
    "applicants": []
}
```

### GET /users/live:vasya.hobot

* 200 OK
* 500 Internal Server Error

```json
{
    "province": "",
    "languageCode": "ru",
    "canLeaveVoicemail": false,
    "handle": "live:vasya.hobot",
    "countryCode": "ru",
    "isVoicemailCapable": false,
    "isAuthorized": true,
    "buddyStatus": 3,
    "phoneOffice": "",
    "hasCallEquipment": true,
    "birthday": 664232400,
    "moodText": "Вася. Управляй мечтой.",
    "timezone": 86400,
    "fullName": "Вася Хобот",
    "sex": "MALE",
    "aliases": [],
    "city": "",
    "about": "",
    "speedDial": "",
    "displayName": "",
    "language": "Russian",
    "isCallForwardActive": false,
    "country": "Russia",
    "richMoodText": "Вася. Управляй мечтой.",
    "isSkypeOutContact": false,
    "phoneHome": "",
    "numberOfAuthBuddies": 0,
    "phoneMobile": "",
    "isVideoCapable": false,
    "isBlocked": false,
    "lastOnline": 1387175597,
    "homepage": "вася-хобот.рф",
    "onlineStatus": "NA",
    "receivedAuthRequest": ""
}
```

### POST /chats/%23vyacheslav.slinko%2F%24live%3Avasya.hobot%3B9f62de6c85e3daed/messages

```json
{
    "body": "Hello World!"
}
```

* 201 Created
* 400 Bad Request
* 500 Internal Server Error


```json
{
    "body": "Hello World!",
    "fromHandle": "vyacheslav.slinko",
    "id": 1464329,
    "chatName": "#vyacheslav.slinko/$live:vasya.hobot;9f62de6c85e3daed"
}
```
