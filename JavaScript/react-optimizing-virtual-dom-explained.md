---
title: [번역] React 최적화: 가상 DOM에 대하여
date: 2018-04-15 13:42:00
categories: JavaScript
desc: 가상 DOM과 React 최적화 방식에 대해 알아봅니다.
profile: https://avatars1.githubusercontent.com/u/17661000?s=460&v=4
profile_url: https://github.com/gratiaa
---

# [번역] React 최적화: 가상 DOM에 대하여

* 원문: [https://evilmartians.com/chronicles/optimizing-react-virtual-dom-explained](https://evilmartians.com/chronicles/optimizing-react-virtual-dom-explained)

이 글을 통해 React 가상 DOM에 대해 알아본 후 배운 것을 활용해 여러분 앱 속도를 높여보세요. React 프레임워크 내부를 철저하게 초보 친화적인 시각에서 소개하는 이 글을 통해 JSX를 명확하게 정의내려 보고, React가 어떻게 렌더링을 결정내리는지 살펴보며, 병목지점을 찾아내는 방법에 대해 설명드리고 흔히 발생하는 실수를 피할 수 있는 몇가지 팁을 공유해 보도록 하겠습니다.

React가 지속적으로 프론트엔드 세상을 쥐락펴락하면서 인기가 사그라들 기미가 보이지 않는 이유 중 하나는 바로 러닝 커브가 그닥 높지 않다는데 있습니다. [JSX](https://reactjs.org/docs/introducing-jsx.html)와 바로 그 "[State](https://reactjs.org/docs/state-and-lifecycle.html) vs. [Props](https://reactjs.org/docs/components-and-props.html)" 개념으로 여러분 머리를 채우셨다면, 이제 React를 사용하셔도 됩니다.

그러나 진정으로 React에 정통하려면 *React적으로 사고할* 필요가 있습니다. 이 글은 여러분이 그렇게 할 수 있도록 도와주고자 쓴 글입니다. [저희 프로젝트](https://ebaymag.com/)에서 사용할 요량으로 만든 React 테이블을 잠시 봐주세요.

(React가 어떻게 동작하는지 이미 잘 알고 계시다면 "[고치기](https://evilmartians.com/chronicles/optimizing-react-virtual-dom-explained#fixing-things-mountingunmounting)" 부분으로 바로 넘어가셔도 됩니다.)

![](https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/ebay_table-4023632.png)

시시각각 변하면서 필터링 기능이 탑재된 수백줄의 테이블 행이 들어있으므로, 사용자에게 부드러운 경험을 선사하고 싶다면 프레임워크의 내부 구조를 이해하는 것이 매우 중요했습니다.

그리고 뭔가 일이 잘못되어가고 있다는 것도 자연스레 느끼게 될 수밖에 없습니다. 입력 필드 반응이 느려지고, 체크박스를 눌렀는데 몇 초 후에 체크표시가 나타나면서 모달 창은 나오기까지 매우 힘든 시간을 보내고 있네요.

이런 종류의 문제를 해결하기 위해서는 여러분에 의해 React 컴포넌트가 정의되고 페이지 상에 렌더링(그리고 업데이트) 되기까지의 그 모든 여정에 대해 먼저 알아봐야 합니다. 안전벨트 매세요!

## JSX의 배후

컴포넌트를 만들려고 하면 React 개발자들이 여러분에게 HTML과 JavaScript가 뒤섞인 JSX로 코드를 작성하라고 다그칠 겁니다. 그러나 저러나 브라우저는 JSX 문법이 뭔지도 모릅니다. 브라우저는 오직 일반 JavaScript만 이해하기 때문에 JSX는 이에 맞게 형태를 바꿀 필요가 있습니다. ("컴파일레이션(compilation)"이 조금 더 적합한 용어 같기는 한데, 아무튼 프론트엔드 업계에서는 "트랜스파일링"이라는 과정으로 알려져 있습니다.) 다음은 예시 JSX 코드 안의 `div`는 클래스명도 있고 안에 컨텐츠도 들어갑니다.

```html
<div className='cn'>
  Content!
</div>
```

위와 동일한 내용의 코드를 "정석" Javascript로 작성해보면 그저 인자 몇가지를 받는 함수 호출이 되어버립니다.

```js
React.createElement(
  'div',
  { className: 'cn' },
  'Content!'
);
```

인자를 조금 더 자세하게 들여다보도록 합시다. 첫번째 인자는 *요소의 타입*입니다. HTML 태그가 오게 된다면 태그명이 문자열로 들어갑니다. 두번째 인자는 *요소의 모든 어트리뷰트*가 담긴 객체입니다. 만약 어트리뷰트를 넣을 필요가 없다면 빈 객체가 들어가게 됩니다. 그 다음에 오는 인자는 모두 *요소의 자식*입니다. 요소 안에 들어가는 텍스트 역시 자식으로 칩니다. 그래서 'Content!' 문자열이 함수 호출될 때 세번째 인자 자리에 들어가는 겁니다.

자식이 더 있다면 어떤 모양이 될지 벌써 상상가능하네요.

```html
<div className='cn'>
  Content 1!
  <br />
  Content 2!
</div>
```

```js
React.createElement(
  'div',
  { className: 'cn' },
  'Content 1!',              // 첫째
  React.createElement('br'), // 둘째
  'Content 2!'               // 셋째
```

함수 호출 인자로 총 다섯개가 들어가네요. 요소의 타입, 어트리뷰트 객체, 그리고 자식 세명입니다. 자식 중 하나 역시 React와 연관된 HTML 태그이기 때문에 이 역시 함수 호출이라 여겨지게 됩니다.

여태까지 두가지 타입의 자식을 다뤄보았습니다. 하나는 일반 `String` 자식이고, 다른 하나는 `React.createElement` 재호출하는 자식입니다. 하지만 이 두가지 말고도 다른 값의 인자가 올 수도 있습니다.

* 원시값 `false`, `null`, `undefined`, `true
* 배열
* React 컴포넌트

배열도 들어갈 수 있는데, 이는 자식들을 그룹으로 묶어서 하나의 인자로 전달하기 위함입니다.

```js
React.createElement(
  'div',
  { className: 'cn' },
  ['Content 1!', React.createElement('br'), 'Content 2!']
)
```

그러나 React의 진정한 힘은 HTML 명세에 기재되어 있는 태그로부터 나오는 것이 아니라, 당연히 사용자가 직접 만들어낸 컴포넌트에서 나옵니다.

```
function Table({ rows }) {
  return (
    <table>
      {rows.map(row => (
        <tr key={row.id}>
          <td>{row.title}</td>
        </tr>
      ))}
    </table>
  );
```

컴포넌트 덕분에 템플릿을 재사용 가능한 덩어리로 더 분해시킬 수 있습니다. 위의 "함수형" 컴포넌트 예시에서는 테이블 행 데이터가 담긴 객체로 이루어진 배열을 받은 후, `React.createElement` 함수 호출 하나를 반환합니다. 이 함수 호출을 통해 행을 자식으로 가지는 `<table>` 요소를 만들어 냅니다.

이제 페이지 레이아웃에 다음과 같은 컴포넌트를 놓아둘 때마다

```
<Table rows={rows} />
```

브라우저가 보기에는 우리는 다음과 같은 코드를 쓴겁니다.

```
React.createElement(Table, { rows: rows });
```

이번에는 첫번째 인자가 HTML 요소를 나타내는 `String`이 아니라 아까 컴포넌트를 만들 때 *정의 내린 함수에 대한 참조*임에 유의해 주세요. 컴포넌트 어트리뷰트는 이제 우리의 `props`가 되었습니다.

## 페이지에 컴포넌트 넣기

자, 이제 순수 자바스크립트로 JSX 컴포넌트를 모두 트랜스파일 해보니 인자가 담긴 함수 호출 한다발이 우리 앞에 떨어졌네요. 이 함수 호출 중 하나는 이제 다른 함수를 또 호출하고, 그 와중에 옆에는 대기 중인 함수 호출들이 있고... 이 모든 함수 호출을 어떻게 웹 페이지를 이루는 DOM 요소로 바꿀 수 있는 걸까요?

그 목표를 이루기 위해 우리에게는 `ReactDOM` 라이브러리와 여기에 같이 딸려 오는 `render` 메소드가 있습니다.

```
function Table({ rows }) { /* ... */ } // 컴포넌트 정의

// 컴포넌트 렌더링
ReactDOM.render(
  React.createElement(Table, { rows: rows }), // "creating" a component
  document.getElementById('#root') // inserting it on a page
);
```

`ReactDOM.render`가 호출되면 `Rect.createElement` 역시 최종적으로 호출이 되고 그 결과 다음과 같은 객체를 반환합니다.

```
// 필드가 더 많기는 한데, 아래가 우리에게 가장 중요한 것들입니다
{
  type: Table,
  props: {
    rows: rows
  },
  // ...
}
```

**여기서 반환된 객체가 React 세계의 가상 DOM을 구성하는 것들입니다.**

앞으로 렌더링이 일어나게 될 때마다 가상 DOM은 비교를 거쳐 (*가상*과 대비되는) *실제* DOM으로 마침내 변환이 됩니다.

다른 예시를 들어보겠습니다. 이번에는 클래스 어트리뷰트와 자식을 몇명 데리고 있는 `div` 요소입니다.

```js
React.createElement(
  'div',
  { className: 'cn' },
  'Content 1!',
  'Content 2!',
);
```

이는 다음과 같이 변환됩니다.

```
{
  type: 'div',
  props: {
    className: 'cn',
    children: [
      'Content 1!',
      'Content 2!'
    ]
  }
}
```

`React.createElement` 함수에서는 서로 떨어져있던 인자들이 `props` 안의 `children` 키 안에 같이 자리를 잡게 된 것에 유의하세요. 그러니까 요소의 자식이 배열 형식으로 들어갔던, 인자를 나열하는 형식으로 들어갔던 *상관이 없는* 거네요. 어찌되었든 결과로 나온 가상 DOM 객체에는 다같이 묶여 들어가게 되니까요.

더 신기한 것은 JSX 코드에 직접 props로 자식을 추가할수도 있다는 겁니다. 그래도 결과는 여전히 똑같습니다.

```html
<div className='cn' children={['Content 1!', 'Content 2!']} />
```

가상 DOM 객체가 만들어지면 `ReactDOM.render` 메소드가 이 객체를 DOM 노드로 변환하게 됩니다. 브라우저는 DOM 노드를 다음과 같은 규칙을 따라 화면에 표시합니다.

* 만약 `type` 어트리뷰트가 태그명을 *문자열*로 가지고 있다면, 태그를 만든 후 `props` 안에 모든 어트리뷰트를 넣습니다.
* 만약 `type` 안에 함수나 클래스가 들어가 있다면, 호출 후에 결과에 따라 재귀적으로 이 과정을 반복합니다.
* 만약 `props` 안에 `children`이 하나라도 있다면, 이 과정을 각 자식마다 개별적으로 진행하고 그 결과를 부모 DOM 노드 안에 넣습니다.

그 결과로 다음과 같은 HTML을 얻게 됩니다. (예시로 든 테이블의 경우입니다.)

```html
<table>
  <tr>
    <td>Title</td>
  </tr>
  ...
</table>
```

## DOM 재건하기

제목의 "재" 글자에 주의하세요! React가 진정한 마법을 부리는 시점은 아무것도 바꾸지 않으면서 페이지를 *업데이트*하고 싶을 때입니다. 이를 위한 방법이 몇가지 있습니다. 가장 간단한 방법부터 살펴보죠. 동일한 노드에 다시 한번 `ReactDOM.render`를 호출하는 겁니다. (실제로는 `render`는 거의 루트 요소에서만 한번 호출이 되고 그 이후에 업데이트가 발생하면 `state`에 적용이 됩니다.)

```js
// 두번째 호출
ReactDOM.render(
  React.createElement(Table, { rows: rows }),
  document.getElementById('#root')
);
```

두번째 호출때는 우리가 이미 본 첫번째와 다르게 동작합니다. 밑바닥에서부터 DOM 노드를 모두 만들어서 페이지에 올려놓기 보다는, React의 [reconciliation](https://reactjs.org/docs/reconciliation.html)(또는 "diffing") 알고리즘에 의해 노드 트리의 어느 부분이 갱신되어야 하는지, 그리고 어떤 부분은 손대지 말아야 하는지 결정이 내려집니다.

자, 그럼 이 알고리즘은 어떻게 돌아가는 걸까요? 간단한 시나리오가 몇가지 있는데  *이를 이해하고 넘어가면* 최적화에 매우 많은 도움이 될듯 합니다. 이제부터는 React 가상 DOM에서 노드를 표현하는 역할을 하는 객체를 살펴볼 겁니다.

* 시나리오 1: `type`이 문자열이고, `type`은 모든 호출에서 동일하게 유지. `props` 역시 변경없음.

```js
// 업데이트 전
{ type: 'div', props: { className: 'cn' } }

// 업데이트 후
{ type: 'div', props: { className: 'cn' } }
```

가장 간단한 경우네요. DOM은 동일하게 유지됩니다.

* 시나리오 2: `type`은 여전히 문자열이나 `props`가 달라짐.

```js
// 업데이트 전:
{ type: 'div', props: { className: 'cn' } }

// 업데이트 후:
{ type: 'div', props: { className: 'cnn' } }
```

`type`이 여전히 HTML *요소*를 가르키고 있으므로, React는 DOM 트리에서 노드 제거 없이 표준 DOM API 호출을 통해 프로퍼티를 바꾸는 방법을 알고 있습니다.

* 시나리오 3: `type`이 다른 `String`으로 바뀜, 혹은 `String`에서 컴포넌트로 변경됨.

```
// 업데이트 전:
{ type: 'div', props: { className: 'cn' } }

// 업데이트 후:
{ type: 'span', props: { className: 'cn' } }
```

이제 요소 타입이 달라졌다는 것을 React가 알게 되었기 때문에, 노드를 업데이트 하려는 시도조차 하지 않을 겁니다. 예전 요소는 **모든 자식과 함께** 제거(*unmounted*)가 됩니다. 그렇기 때문에 완전히 다른 요소로 DOM 트리 저 높은 곳의 노드를 갈아 끼우는 일은 치루는 데 비용이 꽤 들어갈 수 있습니다. 다행이게도 실제 업무 중엔 아주 드물게 일어나는 케이스에 속합니다.

* 시나리오 4: `type`이 컴포넌트일 때.

```
// 업데이트 전:
{ type: Table, props: { rows: rows } }

// 업데이트 후:
{ type: Table, props: { rows: rows } }
```

**"그런데 바뀐게 없잖아요!"라고 말하실 것 같은데, 틀린 말입니다.**

만약 `type`에 함수나 클래스의 참조(즉, 여러분이 만든 일반 React 컴포넌트)가 들어가있고, 트리 reconciliation 과정이 시작되었다면, React는 언제나 컴포넌트 *내부*를 조사해서 `render`로 반환된 값이 바뀌지 않았나 (일종의 부수 효과 예방 차원에서) 확인하려 들겁니다. 확인이 끝나면 흘려보내고 트리 구조상 하위에 위치한 컴포넌트도 모두 확인합니다. 네, 이 과정에는 복잡한 렌더링도 포함되어 있는데 이 렌더링 자체도 비용이 많이 들어갈 가능성이 있습니다. (컴포넌트의 `render` 메소드(클래스 컴포넌트에서만 이 메소드가 직접적으로 정의됩니다)는 `ReactDOM.render` 메소드와 같은 것이 아님을 알아두세요. React 세계에서 "render"라는 단어는 사실 조금 과도하게 사용되고 있습니다.)

## 자식 돌보기

위에서 설명한 네가지 시나리오 말고도, 요소의 자식이 하나 이상일 때 React의 행동은 어떤지도 알아봐야 합니다. 다음과 같은 요소가 있다고 해봅시다.

```
// ...
props: {
  children: [
      { type: 'div' },
      { type: 'span' },
      { type: 'br' }
  ]
},
// ...
```

그리고 요소에 딸린 자식들을 다음과 같이 섞어보도록 하겠습니다.

```
// ...
props: {
  children: [
    { type: 'span' },
    { type: 'div' },
    { type: 'br' }
  ]
},
// ...
```

이제 무슨 일이 일어나게 될까요?

"diff 비교" 과정이 진행되고 있는 와중에 React가`props.children`에 배열이 *하나라도* 들어있는 것을 보게 된다면, 그때부터 React는 배열 안에 들어있는 요소를 전에 본 것과 비교하기 시작합니다. 배열 요소는 순서대로 비교하는데, 인덱스 0에 위치한 요소끼리, 그리고 1에 위치한 것끼리 비교하는 식입니다. 비교되는 각 쌍마다 React에서는 위에서 설명한 규칙을 적용해 봅니다. 우리의 경우 `div`가 `span`이 된 것 같으므로 *3번 시나리오*가 적용이 되겠네요. 아주 효율적이지 못한 케이스입니다. 테이블 행이 1000개 있는데 여기서 첫번째 행을 제거한다고 생각해 보세요. React가 나머지 999개의 자식을 "업데이트"해야 하는 상황이 옵니다. 인덱스가 같은 요소끼리 비교하게 된다면 같은 내용을 가지는 요소가 하나도 없을 것이기 때문입니다.

다행이게도 이런 문제를 해결하기 위한 해결책이 React 안에 내장되어 있습니다. 만약 요소가 `key` 프로퍼티를 가지고 있으면 인덱스가 아니라 `key` 프로퍼티가 같은 것들끼리 비교가 진행됩니다. `key` 값이 유일한 이상 React는 이 요소들을 DOM 트리에서 제거 후에 다시 올려 놓는 과정 *없이* 그냥 옮기기만 합니다. (React에서 *마운팅/언마운팅*이라고 불리는 과정입니다.)

```
// ...
props: {
  children: [ // 이제 React에서는 key값을 참조하지, 인덱스를 보지는 않습니다
    { type: 'div', key: 'div' },
    { type: 'span', key: 'span' },
    { type: 'br', key: 'bt' }
  ]
},
// ...
```

## 상태가 바뀐다면

여태까지는 React 철학 중 살펴본 부분은 `props` 뿐이고 `state`는 무시했습니다. 아래는 "상태를 가지는" 컴포넌트의 간단 예시입니다.

```js
class App extends Component {
  state = { counter: 0 }

  increment = () => this.setState({
    counter: this.state.counter + 1,
  })

  render = () => (<button onClick={this.increment}>
    {'Counter: ' + this.state.counter}
  </button>)
}
```

자, 이제 상태 객체 안에 `counter` 키가 들어가게 되었습니다. 버튼을 클릭하면 값이 증가하고 버튼 안의 글자가 바뀌게 됩니다. 그런데 이때 DOM에는 무슨 일이 일어나는 걸까요? DOM 중에 어떤 곳이 재계산이 된 후에 업데이트 되는 걸까요?

`this.setState`를 호출하면 렌더링이 다시 진행됩니다. 그러나 페이지 전체는 아니고 *컴포넌트 자기 자신과 자식들*만 다시 렌더링됩니다. 그 컴포넌트의 부모와 자손뻘 컴포넌트에는 아무런 영향이 없습니다. 트리 규모가 크고 부분적으로만 다시 렌더링하고 싶을 때 유용하게 작용합니다.

## 문제를 정확히 밝히기

문제를 고치기 전에, 현실에서 일어날 수 있는 가장 흔한 실수를 직접 겪어보실 수 있게 저희가 [작은 데모 앱](https://iadramelk.github.io/optimizing-react-demo/dist/before.html) 하나를 준비해봤습니다. [React 개발자도구](https://github.com/facebook/react-devtools)도 필요하므로 브라우저에 설치했나 확인해 보세요.

가장 먼저 살펴볼 것은 바로 가상 DOM 업데이트를 발생시키는 *요소가 무엇인지, 또 언제인지*입니다. 브라우저 개발자 도구의 React 패널을 열어서 "Highlight Updates" 체크박스를 선택해 주세요.

![](https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/react_dev_tools-e78197e.png)

자 이제 테이블에 행을 추가해보세요. 보시다시피 페이지의 각 요소에 보더가 나타납니다. 우리가 행을 추가할 때마다 React에서 가상 DOM 트리 전체를 다시 계산해서 비교하기 때문에 보더가 나타나는 것입니다. 이제 행 안의 카운터 버튼을 눌러보세요. `state`가 변할 때 가상 DOM 업데이트가 어떻게 일어나는지 확인할 수 있습니다. 바뀐 `state`와 연관된 요소 및 그 요소의 자식들만 영향을 받습니다.

React 개발자도구는 문제가 어디서 발생하는 것인지 힌트는 제공해 줄 수 있지만 세부적인 사항에 대해서는 아무것도 알려주지 않습니다. 특히나 문제가 되는 업데이트가 "diff 비교"인지, 아니면 마운팅/언마운팅인지 알고 싶어도 별 도움이 안됩니다. 더 자세히 알아보기 위해서는 React에 내장된 [프로파일러](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab)를 사용해야 합니다. (참고로 프로파일러는 프로덕션 모드에서는 작동하지 않습니다.)

여러분 앱의 URL 끝에 `?react_perf`를 추가하고 Chrome 개발자도구의 "성능" 패널로 가보세요. 레코딩 버튼을 클릭한 후에 앱 안의 버튼을 눌러 테이블에 변경사항을 줘보세요. 행도 좀 추가해보고, 카운터에도 변경사항을 줘본 후에 "멈춤" 버튼을 누르세요.

![](https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/react_perf_tools-ba86f5e.png)

결과 화면 중에 관심가질 것은 "User timing" 부분입니다. "React Tree Reconciliation" 그룹과 하위 자식들이 나타날 때까지 타임라인을 확대해 주세요. 이 그룹에 속하는 컴포넌트는 이름 옆에 *[update]* 혹은 *[mount]*가 붙어 있습니다.

**대부분의 성능 문제는 이 두가지 중 하나에 속합니다.**

컴포넌트(+ 여기서 파생되는 모든 것들)가 모종의 이유 때문에 업데이트마다 재마운팅이 되는 데 이런 일이 일어나지 않도록 하고 싶은 경우(재마운팅은 속도가 느립니다), 혹은 아무것도 변한 것이 없음에도 볼구하고 큰 브랜치에 비용이 많이 드는 reconciliation을 발생시키고 있는 경우, 이 둘중 하나입니다.

## 문제 해결하기: 마운팅/언마운팅

React가 가상 DOM을 업데이트 결정 방법에 관한 몇가지 이론도 살펴보았고, 화면 뒤에 벌어지는 일을 감시하는 방법도 알아보았으니, 마침내 문제를 해결할 준비가 다 되었습니다! 제일 먼저, 마운트/언마운트 부터 다뤄보도록 하겠습니다.

모든 요소/컴포넌트에 자식이 여러개 있다면 내부적으로 이들은 *배열*로 표현된다는 사실에만 신경을 쓰면 상당히 괄목할 만한 속도 향상을 이뤄낼 수 있습니다.

다음과 같은 코드가 있습니다.

```html
<div>
  <Message />
  <Table />
  <Footer />
</div>
```

그리고 가상 DOM안에는 다음과 같이 표현되겠죠.

```js
// ...
props: {
  children: [
    { type: Message },
    { type: Table },
    { type: Footer }
  ]
}
// ...
```

텍스트가 들어있는 `div`로 되어있는 간단한 `Message`가 있고 (흔해 빠진 알림이라 생각하세요) 1000줄 이상의 행이 담겨 있는 거대한 `Table`이 있습니다. 두 컴포넌트 모두 `div` 안에 담겨있으므로 부모 노드의 `props.children` 하위에 위치합니다. 그리고 키값을 일부러 가질 필요는 없는 것들입니다. 심지어 이 경우에는 React도 콘솔을 통해 키값 부여를 하라고 경고해주지 않을 겁니다. 자식이 부모의 `React.createElement`에 배열이 아닌 인자로 나열되어 들어가기 때문입니다.

이제 우리의 사용자가 알림을 무시하셔서 `Message`가 트리에서 제거되었다 해봅시다. 이제 남은 것이라고는 `Table`과 `Footer`가 다입니다.

```
// ...
props: {
  children: [
    { type: Table },
    { type: Footer }
  ]
}
// ...
```

React는 이를 어떻게 해석할까요? 자식 배열의 모양이 달라졌다고 생각할 겁니다. '`children[0]`에는 `Message`가 들어있었는데, 이제는 `Table`이 들어있네.' 서로 비교할 키값이 없으므로 `type`을 비교하기 시작합니다. 그리고 비교하는 대상이 모두 함수 참조이므로 (그리고 *다른* 함수를 참조하고 있으므로), `Table` 컴포넌트 전체를 *언마운트*한 후에 다시 마운트시킵니다. 따라서 1000줄이 넘는 행으로 된 자식이 모두 렌더링됩니다.

그래서 이 상황을 개선하려면 유일한 키값을 추가(그러나 여기서는 키값 사용이 최상의 선택이 되지 못합니다)하거나 좀 더 똑똑한 트릭을 사용하거나 둘 중 하나를 택해야 합니다. 자바스크립트를 비롯해 최신 프로그래밍 언어에 많이 들어있는 기능인 [Short circuit boolean evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)을 사용하는 겁니다. 자 보세요.

```
// boolean 트릭을 사용합니다
<div>
  {isShown && <Message />}
  <Table />
  <Footer />
</div>
```

`Message`가 화면에 보이지 않더라도 부모 `div`의 `props.children`에는 여전히 요소가 *세 개* 들어있게 됩니다. `children[0]`에는 `false`(불리언 원시값)값이 들어가게 되는 것이죠. `true/false`, `null`, `undefined` 이 세개 모두 가상 DOM 객체의 `type` 프로퍼티로 사용할 수 있다는 사실을 기억하고 계시나요? 그러므로 다음과 같은 객체가 나오게 됩니다.

```
// ...
props: {
  children: [
    false, //  isShown && <Message /> 결과값이 false로 평가됩니다
    { type: Table },
    { type: Footer }
  ]
}
// ...
```

그러므로 `Message`가 있던 없던간에 인덱스는 변하지 않을 것이고 `Table` 역시 이전 `Table`하고만 비교가 이루어지게 됩니다. (`type`에 참조가 들어간 컴포넌트는 reconciliation이 어찌되었든 일어납니다.) *하지만 가상 DOM만 비교해도 된다면 DOM 노드를 제거하고 처음부터 다시 만드는 것보다 일이 훨씬 빠르게 진행이 됩니다.*

이제 좀 더 진화가 이루어진 것을 봐봅시다. 여러분이 [HOC](https://reactjs.org/docs/higher-order-components.html)를 좋아하신다는 것 쯤은 알고 있습니다. 고계도 컴포넌트는 컴포넌트를 인자로 받아서 이걸 가지고 뭔가 한 후에 다른 함수를 돌려주는 일을 하는 함수를 말합니다.

```
function withName(SomeComponent) {
  // 이름을 계산합니다. 비용이 꽤 들어가는 일 같은데요...
  return function(props) {
    return <SomeComponent {...props} name={name} />;
  }
}
```

매우 흔한 패턴입니다. 그러나 조심해서 사용해야 합니다. 다음과 같은 상황이 있다 해봅시다.

```

class App extends React.Component() {
  render() {
    // 렌더할 때마다 새로운 인스턴스를 생성합니다.
    const ComponentWithName = withName(SomeComponent);
    return <SomeComponentWithName />;
  }
}
```

부모의 `render` 메소드에서 HOC를 생성하는 코드입니다. 트리를 다시 렌더링하게 되면 가상 DOM은 다음과 같을 겁니다.

```
// 첫번째 렌더:
{
  type: ComponentWithName,
  props: {},
}

// 두번째 렌더:
{
  type: ComponentWithName, // 이름은 같지만 인스턴스가 다릅니다
  props: {},
}
```

이제 React는 `ComponentWithName`에 대해서만 diffing 알고리즘을 사용하고 싶어할 것 같은데, 이 경우 참조의 이름만 같으나 *인스턴스가 다르기 때문에*, 엄격한 비교를 할 경우 실패가 뜨게 되고 reconciliation 대신에 전체 재-마운팅이 일어나게 됩니다. [이 곳에 명시된 대로](https://github.com/facebook/react/blob/044015760883d03f060301a15beef17909abbf71/docs/docs/higher-order-components.md#dont-use-hocs-inside-the-render-method) 상태 역시 잃어버리게 됩니다. 다행이도 해결이 쉽습니다. 항상 `render` 밖에서 HOC를 만들면 됩니다.

```
// 새 인스턴스를 딱 한번만 만듭니다.
const ComponentWithName = withName(Component);

class App extends React.Component() {
  render() {
    return <ComponentWithName />;
  }
}
```

## 문제 해결하기: 업데이트

자, 이제 꼭 필요한 경우가 아니면 재-마운팅이 일어나지 않도록 만들어 두었습니다. 그러나 DOM 트리의 뿌리쪽에 가깝게 위치한 컴포넌트에 변경사항이 생긴다면 그 자식들이 모두 diffing과 reconciliation의 대상이 되어버립니다. 복잡한 구조라면 비용이 상당히 많이 들어가게 되므로 종종 회피의 대상이 되곤 합니다.

**React가 특정 브랜치는 보지 못하도록 할 수 있다면 좋을 것 같습니다. 그 브랜치에는 아무런 변경사항이 없을 것이라 확신할 수 있으니까요.**

그런 방법이 존재합니다. [컴포넌트 생명주기](https://reactjs.org/docs/react-component.html#the-component-lifecycle)의 한 부분인 `shouldComponentUpdate`라는 메소드가 참여하게 됩니다. 이 메소드는 각 컴포넌트의 `render` 메소드가 호출되기 *전에* 먼저 호출되며, props와 state의 새 값을 전달받습니다. 그러면 이제 현재 값과 비교를 해서 컴포넌트를 업데이트할지 말지 자유롭게 정할 수 있게 됩니다. (`true` 혹은 `false`를 반환하는 메소드입니다.) 만약 `false`를 반환하면 React는 문제가 되는 컴포넌트를 다시 렌더링하지 않을 것이고 그 컴포넌트의 자식도 들여다 보지 않을 겁니다.

`props`와 `state` 세트를 비교할 때 대부분의 경우 간단한 *얕은* 비교 정보면 충분합니다. 만약 최상위 층의 값이 다르면 업데이트 할 필요가 없다고 판정내립니다. 얕은 비교는 Javascript의 기능이 아니지만 이를 해낼 수 있는 [유틸리티](https://github.com/dashed/shallowequal)가 많이 있습니다.

유틸리티의 도움을 받아서 코드를 다음과 같이 작성할 수 있습니다.

```
class TableRow extends React.Component {

  // 새로운 props/state가 예전 것과 다르면 true를 반환하게 됩니다.
  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;
    return !shallowequal(props, nextProps)
           && !shallowequal(state, nextState);
  }

  render() { /* ... */ }
}
```

하지만 위 코드를 여러분이 직접 작성할 필요 조차 없습니다. React에는 `React.PureComponent`라고 불리우는 내장 기능이 있기 때문이죠. `React.Component`와 비슷한데, 다만 *얕은* props/state 비교가 필요할 것이라 가정하여 이미 여러분을 위해 `shouldComponentUpdate`가 구현되어 있습니다.

따로 생각할 필요가 없어 보이는데, 그냥 클래스 정의 부분의 `extends` 부분에 들어간 `Component`를 `PureComponent`로 바꿔보고 효율이 얼마나 좋나 감상해 보도록 하죠. 그런데 그다지 안 빠르네요! 다음과 같은 코드를 봐봅시다.

```
<Table
    // 맵을 사용하면 새로운 배열 인스턴스를 반환하게 되므로 얕은 비교 결과는 실패가 나옵니다
    rows={rows.map(/* ... */)}
    // 객체 리터럴은 항상 전의 것과 "다릅니다"
    style={ { color: 'red' } }
    // 화살표 함수는 스코프 내에 이름 없는 함수를 새로 만드는 것과 같으므로 항상 diff 비교작업이 전부 이뤄지게 됩니다
    onUpdate={() => { /* ... */ }}
/>
```

위 코드 스니펫에 가장 흔한 세가지 안티 패턴이 들어있습니다. 사용하지 않도록 하세요!

**객체, 배열, 함수를 새로 만들 때 `render` 정의 밖에서 만들고,  호출과 호출 사이에 아무것도 변한게 없다 확신할 수 있다면 여러분은 이제 안전한 겁니다.**

`PureComponent`의 사용 효과는 [데모 개선버전](https://iadramelk.github.io/optimizing-react-demo/dist/after.html)에서 관찰해 볼 수 있습니다. 테이블의 모든 `Row`가 정제를 거친 상태입니다. React 개발자도구의 "Highlight Updates"를 키고 새로운 행을 삽입해보면 테이블 그 자체와 새로 넣어진 행만 다시 렌더링되고 다른 모든 행에는 아무 일도 일어나지 않는 것을 관찰해 볼 수 있습니다.

그러나 pure 컴포넌트로 앱 구석구석까지 대체할 자신이 없다면 여기서 멈추세요. `props`와 `state` 두 세트를 비교하는 작업은 공짜로 할 수 있는 것이 아니기도 하고 대부분의 기본적인 컴포넌트에서는 그런 작업을 진행할 필요가 없습니다. Diffing 알고리즘보다 `shallowCompare` 돌리는 데 시간만 더 걸리게 될 겁니다.

여기 경험에서 우러난 법칙을 사용해 보세요. Pure 컴포넌트는 복잡한 폼과 테이블에는 좋지만 버튼과 아이콘 같이 상대적으로 간단한 요소에 사용하면 대부분 속도만 느려지게 됩니다.

---

읽어주셔서 감사합니다! 이제 여러분은 애플리케이션에 직접 여기서 배운 것들을 적용할 준비를 마치셨어요. 저희가 만든 작은 데모(`PureComponent` [있는](https://iadramelk.github.io/optimizing-react-demo/dist/after.html) 버전과 [없는](https://iadramelk.github.io/optimizing-react-demo/dist/before.html) 버전)가 담긴 이 [저장소](https://github.com/iAdramelk/optimizing-react-demo)를 여러분 실험의 시작점으로 사용하셔도 됩니다. 그리고 이 시리즈의 다음 글도 기대해주세요. Redux 및 앱의 전반적인 성능 향상을 위해 *data*를 최적화하는 법에 대해 다룰 예정입니다.
