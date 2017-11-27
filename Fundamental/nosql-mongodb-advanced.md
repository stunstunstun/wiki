---
title: MongoDB 이해하기
date: 2017-12-11 15:54:07
categories: mongodb
---

## Indexs

## Aggregations

```javascript
var duplicates = [];
db.keywords.aggregate([
{ "$group": {
  _id: { text: "$text", translated_text: "$translated_text", sub_type: "$sub_type", category: { category_name: "$category.category_name" } },
  dups: { "$addToSet": "$_id"},
  count: { "$sum": 1 }
  }
},
{ "$match": {
  count: { "$gt": 1 }
  }
},
{ "$sort": {
  _id: 1
  }
}
])
.forEach(function(doc) {
  doc.dups.shift();
  doc.dups.forEach(function(dupId) {
    duplicates.push(dupId);
  })
})

printjson(duplicates);

db.keywords.remove({ _id: { "$in": duplicates } })
```

## Storage Engine

## Replication

## Sharding

## Administration

#### Performance

#### Monitoring

#### MongoDB Backup Methods

#### Configurations