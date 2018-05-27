---
title: React Element와 Component
date: 2018-05-01 13:07:11
categories: javascript
---

React를 정의하는 것은 간단합니다. JavaScript를 통해 웹 애플리케이션의 UI를 구현하고 그 과정에서 마주치는 다양한 문제를 해결하는 효과적인 방법을 제공합니다.

## Hello World

아래의 코드는 React를 통해 `Hello, world!`를 HTML에 출력하는 모습입니다. 구체적으로 root라는 id를 갖는 DOM 요소를 찾아 `<h1>Hello, world!</h1>`를 화면에 렌더링한다는 의미입니다.

```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)
```

HTML은 아래와 같은 모습이겠죠.

`index.html`
```html
<body>
 <div id="root"></div>
</body>
```

## Introducing JSX

그 시작으로 React는 UI를 구현하기 위해 JavaScript를 확장한 [JSX](https://jsx.github.io/)를 활용합니다.

```javascript
const element = <h1>Hello, world!</h1>
```

위 문법은 문자열, HTML 또는 Template 언어처럼 보이기도 합니다. 하지만 JSX는 완벽한 JavaScript입니다. 우리는 앞으로 React의 UI를 구성하는 기본 단위인 Element를 JSX를 활용해 표현합니다.

UI를 개발하는 일반적인 방식은 별도의 파일에 마크업과 비지니스 로직을 분리하는 것이였습니다. 하지만 React를 통해 UI를 개발한다면 기능 단위로 관심사를 분리할 뿐입니다. JavaScript에 마크업을 포함하는게 익숙하지 않다면 아래의 영상이 많은 도움이 될 것입니다.

> https://www.youtube.com/watch?v=x7cQ3mrcKaY


지금부터는 JSX를 통해 기본적인 UI를 표현하는 방법을 살펴 봅니다.

`자바스크립트 Expression을 JSX에서 사용하기`
```javascript
const user = {
  firstName: 'Minhyeok',
  lastName: 'Jung',
}

function renderUsername(user) {
  return `${user.firstName} ${user.lastName}`
}

const element = (
  <h1>
    Hello, {renderUsername(user)}!
  </h1>
)
```

## Element

React의 Element는 사실 type, props를 가지는 JavaScript Object입니다. 우리는 일반적으로 Element를 더욱 쉽게 표현하기 위해 [JSX](https://jsx.github.io/)를 사용합니다.

`JSON`
```javascript
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

`JSX`
```javascript
<button className='button button-blue'>
  <b>
    OK!
  </b>
</button>
```

`React API`
```javascript
React.createElement(
  'button',
  { className: 'button button-blue' },
  React.createElement(
    'b',
    null,
    'OK!'
  )
)
```

## Component

React의 Component는 Element를 리턴하는 Function 또는 Class이다. 우리는 이것을 통해 Element의 트리 구조를 더욱 쉽게 표현하고 재사용한다. Component는 Function, Class constructor의 인자로 Element의 props를 전달받는다.

아래의 Button 타입의 Element를 Component화 해보도록 하자.

```javascript
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```

`Function Declaration`
```javascript
function Button(props) {
  return (
    <button className={`button button-${props.color}`}>
      <b>
        OK!
      </b>
    </button>
  )
}
```

`Function Expression`
```javascript
const Button = ({ color = 'blue' }) => (
  <button className={`button button-${color}`}>
    <b>
      OK!
    </b>
  </button>
)
```

`Class Declaration`
```javascript
class Button extends React.Component {
  render() {
    const { color } = this.props
    return (
      <button className={`button button-${props.color}`}>
        <b>
          OK!
        </b>
      </button>
    )
  }
}
```


## References
- https://jsx.github.io/
- https://reactjs.org/docs/introducing-jsx.html
- https://reactjs.org/docs/jsx-in-depth.html