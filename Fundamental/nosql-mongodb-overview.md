---
title: 몽고DB 시작하기
date: 2017-12-11 15:54:07
categories: mongodb
---

## MongoDB Overview

- https://docs.mongodb.com/manual/tutorial/getting-started/

#### Install

```
$ brew update
$ brew install mongo
```

#### Start the MongoDB server

`Create mongodb.sh`

```bash
#!bin/bash
sudo mongod --dbpath /var/lib/mongodb/data/db > /dev/null 2>&1 &
```

`Start`

```
$ sudo mkdir -p /var/lib/mongodb/data/db
$ sudo ./start mongod
```

#### Mongo Shell

In another terminal, connect to the database with the Mongo shell using:`

```
$ mongo
```

## Documents

#### BJSON

```
var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
```

## Data Model

## Database and Collections

## CRUD Operations

## Indexes

## Storage Engine 

## Replication

## Sharding

## Administration

#### Performance

#### Monitoring

#### MongoDB Backup Methods

#### Configurations

## Tools

`Robo Mongo` - https://robomongo.org/

