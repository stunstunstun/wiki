## Handling Events

### bind() vs arrow function & property initializers?

프로젝트 초기에 [Handling Events](https://reactjs.org/docs/handling-events.html)시 아래의 두 케이스 중 어떤 Syntax를 선택해서 일관적으로 작성할지에 대한 논의
- Class constructor에서 Function.prototype.bind()
- Arrow function & property initializers (ES7)

GitHub 이슈, React 문서, Airbnb React/JSX Style 어디에도 Class에서의 `property initializers`가 더욱 좋다거나`.bind()`를 사용하지 말라는 언급은 없음

- https://github.com/facebook/react/issues/9851 
- https://reactjs.org/docs/handling-events.html
- https://github.com/airbnb/javascript/tree/master/react

### Arrow function & property initializers is really Okay?

그 이유로 Class property initializers는 ES6+ 스펙으로 experimental 상태이고 거기다 Babel로 컴파일한 결과가 `.bind()`한 것과 완벽한 Syntactic sugar가 아님
- https://goo.gl/bkQgt5
- https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1

arrow function은 ES6 스펙이며 당연히 사용해야 하지만 논점은 프로젝트에서 위와 같은 다양한 상황에서 어떻게 일관적인 코드를 작성하는가와 experimental 스펙을 사용할지에 대한 결정이 필요

### Follow Good Practices like Airbnb React/JSX Style

이외의 Syntax도 논의하는 과정에서 React는 너무나 방대한 자료와 개발자의 취향이 다양해 최대한 React의 공식 문서를 활용하고, 현재는 여기에 프로젝트의 Airbnb JavaScript Style과 동일한 [Airbnb의 React/JSX Style](https://github.com/airbnb/javascript/tree/master/react
)을 기준으로 Conventions을 정리

추가로 Airbnb React Style에서는 stage3 이전의 내용은 Style Guide에 포함되어 있지 않으며 권장되지도 않습니다. 리딩하는 [@ljharb](https://github.com/ljharb)의 철학이 JavaScript의 실험성을 위배하고 엔진이 최적화할 수 있는 것을 제한하는 것을 싫어하는 것 같네요.
- https://github.com/airbnb/javascript/issues/873
- https://github.com/airbnb/javascript/issues/891
- https://github.com/airbnb/javascript/issues/1086
- https://github.com/airbnb/javascript/pull/1335

## References
- https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1
- https://ryanfunduk.com/articles/never-bind-in-render/
- https://medium.com/@machnicki/handle-events-in-react-with-arrow-functions-ede88184bbb
