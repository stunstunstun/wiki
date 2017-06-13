---
title: CSS도 Preprocessor가 필요할까? 
date: 2017-05-30 18:07:11
categories: front-end
---

이 글은 전편인 `Pug로 HTML 개발하기`에 이어서 이번에는 CSS를 효율적으로 개발하기 위한 내용을 담고 있습니다. 

> 글쓴이는 Front-end의 전문가가 아니며 개인적인 용도에 필요한 웹서비스를 개발하는 과정에서, 공부한 내용을 정리하고 있습니다. 실무에서 Front-end를 개발하시는 분들의 Comments가 필요합니다, 적극적으로 업데이트 하도록 하겠습니다.

## Preprocessor?

## CSS 개발하는데 Preprocessor가 필요할까?

## 다양한 CSS 개발을 위한 Preprocessor들

#### Sass

#### Less

#### Stylus

## 이 중에서 Sass에 대해 더 이야기해 볼까 합니다.

#### Sassy한 CSS의 히스토리

## Airbnb의 Sass Style Guide

- https://github.com/airbnb/css/blob/master/README.md 

#### Syntax

* 전통적인 `.sass` Syntax를 사용하지 말고 `.scss` Syntax를 사용한다.
* 기본적인 CSS의 표현과 `@include` 선언은 논리적으로 순서를 정리한다. 


#### 속성 선언

우선 표준 속성 선언을 먼저 작성합니다. `@include` 혹은 중첩(Nested) 선택자(Selector)는 아직 적지 않습니다.

```scss
.btn-green {
  background: green;
  font-weight: bold;
  // ...
}
```

#### `@include` 선언

`@include`를 마지막에 모아놓으면 전체 선택자를 쉽게 독해할 수 있습니다.

```scss
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
  // ...
}
```

3. 중첩 선택자

    중첩 선택자는 마지막에 위치합니다. 그리고 그 다음으로는 아무것도 적지 않습니다. 규칙 선언부와 중첩 선택자 사이에는 여백을 추가하며, 중첩 선택자 사이에도 마찬가치입니다. 중첩 선택자 내부 속성들 또한 위의 규칙을 따릅니다.

    ```scss
    .btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .icon {
        margin-right: 10px;
      }
    }
    ```

### 변수

변수 이름을 정할 때는 `-`를 사용하는 것을 권장합니다. 같은 파일 내에서만 사용될 변수에 한해서는 접두어를 추가해도 괜찮습니다. (예- `$_my-variable`).


### 믹스인-Mixins

Mixin은 코드를 DRY하게 하고 명료하게 하며, 복잡성을 줄이기 위해 사용해야 합니다. 인자를 받지 않는 Mixin은 이럴 때 유용합니다. 하지만 만약 당신이 payload를 압축하지 않는다면(예- gzip), 불필요한 코드 중복이 발생하게 됩니다.

### Extend 지시자

`@extend`는 직관적이지 않고 특히 중첩 선택자와 함께 사용할 때 위험성이 있기 때문에 사용하지 않는 것을 권장합니다. 심지어 최상위 placeholder 선택자를 extend해도 선택자들의 순서가 바뀌게 되면 문제가 발생할 수 있습니다. `@extend`를 사용함으로써 얻을 수 있는 이점은 Gzip을 사용하면 해결될 뿐더러, 스타일시트를 DRY하게 만들기 위해서는 mixin을 사용하면 됩니다.

### 중첩 선택자

**중첩은 최대 3번까지!**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

만약 선택자가 이렇게 길어진다면, 당신은 다음과 같은 CSS를 작성하고 있을 가능성이 높습니다:

* HTML과 밀접하게 엮여있다.(망가지기 쉬움)
* 너무 구체적이다.
* 재사용할 수 없다.

강조: **절대로 ID 선택자는 중첩하지 마세요!**

어쩔 수 없이 ID 선택자를 사용해야한다면(사용하지 않는 것이 가장 좋습니다.), 절대로 중첩되지 않도록 유의하세요. 만약 중첩시키게 된다면, 왜 그렇게 특수한 케이스가 발생하는지 먼저 고민해보는 것이 좋습니다. 만약 당신이 잘 구성된 HTML과 CSS를 사용한다면 절대로 이렇게 할 필요가 없습니다.  


## References

https://github.com/airbnb/css/blob/master/README.md