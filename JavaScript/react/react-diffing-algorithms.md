## Reconciliation

React는 애플리케이션의 모든 변경 사항이 어떤 변화를 일으키는지 걱정할 필요가 없도록 선언적인 API를 제공합니다.

이것은 개발을 쉽게 할 수 있도록 도와주지만, React 내부가 어떻게 동작하는지 명확히 이해하기 힘든 것을 의미합니다.

### The Diffing Algorithm

#### Elements Of Different Types

#### DOM Elements Of The Same Type

#### Component Elements Of The Same Type

#### Recursing On Children

#### Keys

key값은 re-render시에 자식에 대한 힌트를 얻는 용도로 활용되네요. 정확히는 DOM 노드에서 자식을 반복할 때 효율적으로 처리하기 위함입니다. 이 때 diff 알고리즘이 동작하는 방식에 영향이 미칩니다.

현재 상태를 문서를 기준으로 정리하면 이렇습니다. 
- 자식들의 recursing이 일어나기 때문에 Component에 key값이 필요하다.
- 보통 이런 경우 리스트내의 Component가 유사한 형태를 가집니다. 하지만 리스팅되는 Snippet들은 그렇지 않죠.

실제 테스트해보면 이렇습니다.
- Snapshot Testing 또는 Console에서 `Warning: Each child in an array or iterator should have a unique "key" prop.` 메세지가 노출됩니다. 
- 하지만 SnippetDict과 서버 데이터를 참조해 Snippet을 render 한 뒤 배열이 변경되는 일은 없어 key props로 인한 성능의 차이는 없습니다.
- Dict에 명시된 key props는 warning을 제거하기 위한 용도입니다. Reconciliation은 저희가 관여할 수 없는 부분이므로 경험적인 방법을 따르는게 좋습니다.

일반적인 경우에는 리스팅시에 문서의 하단의 내용을 숙지해야겠네요, 참고하세요.

### Tradeoffs

Because React relies on heuristics, if the assumptions behind them are not met, performance will suffer.

The algorithm will not try to match subtrees of different component types. If you see yourself alternating between two component types with very similar output, you may want to make it the same type. In practice, we haven’t found this to be an issue.

Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.

## References

> https://reactjs.org/docs/reconciliation.html
> https://reactjs.org/docs/reconciliation.html#keys
> https://reactjs.org/docs/reconciliation.html#tradeoffs
> https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e
> http://meetup.toast.com/posts/110



