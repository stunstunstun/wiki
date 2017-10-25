---
title: Angular, Babel, Pug, Sass, MongoDB
date: 2017-10-25 18:07:11
categories: front-end
---

## Prerequisites

```
$ npm install -g yo gulp-cli generator-angular-fullstack
```

```
$ mkdir app_name
$ cd app_name
$ yo angular-fullstack
```

#### MongoDB

`Install MongoDB`

```
$ brew update
$ brew install mongodb
$ sudo mkdir -p /data/db
```

`Create start_mongo.sh`
```
#!/bin/bash

mongod --dbpath /data/db
```

```
$ sudo ./start_mongo.sh
```

#### Run

```
$ gulp serve
```

## References

- https://angular-fullstack.github.io/get-started/
- https://angular-fullstack.github.io/get-started/overview/