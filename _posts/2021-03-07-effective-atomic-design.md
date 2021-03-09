---
layout: post
title: "Effective Atomic Design"
author: "Lee Sun-Hyoup"
categories: dev
tags: [frontend, web, architecture]
image: /assets/img/2021-03-07-effective-atomic-design/thumbnail.png
comments: true
published: false
---

&nbsp;소프트웨어 개발 중 설계에서 가장 중요한 것은 **모듈화와 추상화** 두 가지라고 할 수 있다. 웹 프론트엔드 업계는 이미 React, Vue.js, Angular와 같은 오픈소스 프레임워크를 통해 끝을 달리는 추상화와 모듈화를 보여주고 있다. 특히 모듈화 측면에서 세 프레임워크는 컴포넌트 인터페이스를 매우 쉽게 제공하기 때문에 프레임워크 사용자는 효과적인 재사용성과 캡슐화된 컴포넌트를 아주 간단하게 만들 수 있다. 그렇기에 우리는 좋은 컴포넌트를 만들기 위해 올바른 방법과 규칙을 정하기만 하면 된다.

&nbsp;이번 포스팅의 핵심 키워드인 [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)은 좀 더 효과적인 컴포넌트를 구성하기 위한 방법론이다. 최근에 굉장히 유행하고 많은 기업이 도입하는 방법론이지만 Brad Frost가 2013년에 처음 공개했으니 생각보다 오래됐다. 아마 본격적인 컴포넌트 주도 개발 방식이 자리 잡게 된 후에 새롭게 주목을 받을 것 같다. 블로그 글보다 좀 더 자세히 설명한 [책](https://shop.bradfrost.com/)을 따로 $10에 판매하기도 하니 관심이 있다면 구매해보는 것도 괜찮을 것 같다.

&nbsp;본론으로 돌아와 이번 포스트에서 다룰 이야기는 **Atomic Design을 더 잘 쓰기 위한 구현 방법**에 대해 소개한다. 물론 그전에 Atomic Design이 무엇인지 간단히 알아보자.

## Atomic Design이란?

> Atomic design is methodology for creating design systems. <br />- Brad Frost

&nbsp;Atomic Design은 그 이름처럼 화학 용어를 이용하여 설명하는 컴포넌트 관리(디자인 시스템) 방법론이다.

<figure>
  <img src="/assets/img/2021-03-07-effective-atomic-design/atomic-design.png" />
  <figcaption>중간부터 화학과 관련이 없어진다</figcaption>
</figure>

&nbsp;좌측부터 `Atom(원자), Molecule(분자), Organism(유기체), Template, Page`로 이루어져있다. 기초적인 화학 내용이 기억 안나는 사람들을 위해 간단히 설명하자면 원자는 물질을 구성하는 가장 작은 입자고 원자가 모여 분자가 구성된다. 유기체는 활동하는 생명체를 의미하므로 훨씬 큰 개념이라 볼 수 있다.

&nbsp;어떻게보면 과거부터 우리가 해왔던 컴포넌트 구성 방법과 크게 다르지 않다. 보통 개발자들은 Atomic Design을 모르던 시절에도 본능적으로 작은 단위부터 큰 단위로 컴포넌트 단위를 나누고 상향식 접근을 통해 컴포넌트를 구성해왔다. 결국 Atomic Design은 우리가 본능적으로 해왔던 것을 **직관적인 용어와 문서로 규칙화** 한 것이라고 볼 수 있다.

### Atom

<figure>
  <img src="/assets/img/2021-03-07-effective-atomic-design/atoms.jpg" />
  <figcaption>더 이상 쪼갤 수 없는 단위</figcaption>
</figure>

&nbsp;Atom은 HTML 태그처럼 더 이상 쪼갤 수 없는 단위에 해당하는 요소에 해당한다. 혹은 애니메이션, 폰트, 색상 등과 같이 직접적인 요소가 아닌 추상적인 것도 Atom에 해당된다. 가장 작은 단위인 만큼 가장 많이 재사용된다고 볼 수 있다.

### Molecule

<figure>
  <img src="/assets/img/2021-03-07-effective-atomic-design/molecule.jpg" />
  <figcaption>여러 개의 Atom이 모여 Molecule이 된다</figcaption>
</figure>

&nbsp;Molecule은 여러 개의 Atom이 모여 하나의 단위를 이룬다. 가급적 많은 곳에서 재사용되도록 컴포넌트를 구성하되 "한 가지 일을 한다"라는 원칙을 지키며 만드는 것이 좋다.

### Organism

<figure>
  <img src="/assets/img/2021-03-07-effective-atomic-design/organism.jpg" />
  <figcaption>Organism은 비로소 사용자에게 의미있는 인터페이스되는 단계라고 할 수 있다</figcaption>
</figure>

&nbsp;Molecule까지는 사용자에게 크게 의미 있는 인터페이스라고 볼 수는 없었다. Organism은 사용자에게 의미 있는 정보를 제공하거나 인터렉션 할 수 있는 UI를 제공하는 등 서비스로서 의미를 가지는 인터페이스라고 볼 수 있다. 이 단계부터 재사용성이 크게 줄어든다.

### Template

### Page

## Why Effective?

&nbsp;Atomic Design은 방법론이지만 **레이어 아키텍처 패턴으로 이루어진 컨셉**이라고도 볼 수 있다. 우리는 이러한 컨셉을 구현하는 과정에서 개발 환경, 구성원 등 다양한 고려 사항이 생기기 때문에 컨셉을 여러 방법으로 해석할 수 있고 심한 경우 컨셉을 잘못 이해할 수도 있다. 예를 들어, 유명한 아키텍처 패턴인 MVC(Model-View-Controller)를 구현하더라도 다양한 해석이 존재한다. 목적에 따라 Model을 ActiveRecord 패턴을 통해 구현하거나 Repository 패턴으로 구현할 수도 있고 경우에 따라서는 애플이 iOS에 적합하도록 CocoaMVC[^1]로 완전한 재해석한 것처럼 컨셉을 크게 바꿔버릴 수도 있다.

&nbsp;따라서 우리는 아키텍처를 올바르게 구현하기 위해 컨셉을 잘 이해하고 원칙을 정해야 한다. 사실 Atomic Design은 실제 제품에 구현할 때 애매한 부분이 몇 가지 있다. 필자는 회사에서 겪은 시행착오를 통해 나름 보완점을 추가하고 추가가 필요한 부분을 정리하여 10가지 표준적인 규칙을 정했다.

## Atom의 재정의

## 순수 컴포넌트

## Page 컴포넌트의 활용

## 때로는 순수하지 않은 컴포넌트도 필요하다

## 권장하는 데이터 전달 방법

## 애매한 템플릿 해석

## 요소 반복 컴포넌트

## 모달, 팝오버와 같은 전역 뷰의 레이어

## 컴포넌트 구현 순서

## Form 컴포넌트

[^1]: MVC라는 이름이 붙었지만 사실상 MVP 패턴과 동일하다.