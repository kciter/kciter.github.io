---
layout: post
title: "MongoDB 이해하기"
author: "Lee Sun-Hyoup"
categories: dev
tags: [database, mongodb, server]
image: /assets/img/2020-02-25-about-mongodb/thumbnail.png
comments: true
---

&nbsp;사내에서 MongoDB를 잘 쓰기위한 스터디를 하게되어 이번 기회에 관련 자료를 정리하기로 했다. MongoDB가 왜 필요한지, 더 잘사용하기 위해서 무엇이 필요한지를 중심으로 자료를 작성했다. 아마 처음 MongoDB를 접한다면 꽤 도움이 될 것이라 생각한다.

## NoSQL이란?

&nbsp;NoSQL은 **Not Only SQL**, SQL 뿐만 아니다라는 의미를 지니고있다. 그래서 SQL을 사용하는 관계형 데이터베이스가 아닌 데이터베이스를 의미한다. 대표적인 관계형 데이터베이스로는 MySQL, Oracle, PostgreSQL이 있고, NoSQL 진영에는 이 포스트에서 다루는 MongoDB와 Redis, HBase 등이 있다. 더 다양한 NoSQL 제품을 보고 싶다면 [링크](https://hostingdata.co.uk/nosql-database/)를 들어가면 지금까지 출시된 NoSQL 데이터베이스 목록을 볼 수 있다.

&nbsp;그래서 NoSQL은 왜 탄생하게 된걸까? 사실 RDBMS만으로 충분하지 않을까? 하지만 RDBMS은 은총알이 아니었고 분명한 한계점이 있다. NoSQL은 다음과 같이 RDBMS에선 하기 힘든 일을 지원한다.
* 수평적 확장 가능한 분산 시스템
* Schema-less
* 완화된 ACID

이젠 RDBMS와 NoSQL 사이 벽이 점점 허물어져가는 느낌이라 공감이 안될 수도 있지만 처음 NoSQL이 나왔을 때 가장 큰 차별점은 위 세 가지다. 앞으로 이 포스트는 위 세 가지를 중심으로 다룰 예정이다.

### RDBMS vs NoSQL

&nbsp;인터넷에 RDBMS와 NoSQL의 비교라고 검색하면 다음과 같은 표를 많이 볼 수 있다.

<style>
table th:first-of-type {
    width: 20%;
}
</style>
|| RDBMS | NoSQL |
|---|------|------|
|적합한 사용례|데이터 정합성이 보장되어야 하는 은행 시스템|낮은 지연 시간, 가용성이 중요한 SNS 시스템|
|데이터 모델|정규화와 참조 무결성이 보장된 스키마|스키마가 없는 자유로운 데이터 모델|
|트랜젝션|강력한 ACID 지원|완화된 ACID(BASE)|
|확장|하드웨어 강화(Scale up)|수평 확장 가능한 분산 아키텍처(Scale out)|
|API|SQL 쿼리|객체 기반 API 제공|

&nbsp;사실 전부 옳다고 할 수 없는 것이 RDBMS에 수평 확장이 불가능한 것 처럼 써놨지만 MySQL Replication이나 MySQL Cluster가 존재하여 수평 확장이 불가능한 것은 아니다. 그리고 NoSQL에서도 ACID가 불가능하지 않다. MongoDB의 경우 분산 트랜젝션까지도 지원하고 있다. 단, NoSQL 데이터베이스는 대게 분산 아키텍처를 염두하고 출시된 제품이 많아 더 편리하다는 장점이 있고 BASE 기반이기 때문에 완전한 ACID가 아니다. 그래서 위 표를 70% 정도만 인정하고 보면 될 것 같다.

### 그래서 MongoDB가 뭔데?

&nbsp;MongoDB는 앞서 설명한 것 처럼 NoSQL 데이터베이스고 다음 세 가지 특징을 가지고있다.
* Document
* BASE
* Open Source

&nbsp;데이터는 Document 기반으로 구성되어있고, ACID 대신 BASE를 택하여 성능과 가용성을 우선시한다. 그리고 오픈 소스라는 점 덕분에 무료로 이용이 가능하다.

&nbsp;여담으로 MongoDB는 분명 몇 년전까진 AGPL 라이센스였는데 어느 순간 SSPL(Server Side Public License)로 변경되었다. 아마 AWS(DocumentDB)나 Azure(CosmosDB)에서 별도 계약 없이 MongoDB를 이용해 돈을 벌었기 때문이 아닐까 싶다. 아무튼 아직 오픈 소스기는 하다. MongoDB의 발전을 위한다면 클라우드 서비스 내 제품 대신 [Mongo Atlas](https://www.mongodb.com/cloud/atlas)를 이용하는 것이 좋을 것 같다. 비용도 DocumentDB보단 저렴하게 시작할 수 있다.

#### Document

#### BASE

#### ACID?

## MongoDB는 분산 시스템이 핵심이다

### CAP 이론

### CAP 이론의 한계

### PACELC 이론

### MongoDB Replica Set

## MongoDB 모델링 패턴

## MongoDB Index
