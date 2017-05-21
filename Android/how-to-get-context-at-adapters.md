## Overview

`ListView`, `GridView` 등 `AdapterView`를 상속하고 있는 view들은 adapter 패턴을 사용해서 뷰에 표시할 내용들을 위임해서 처리한다.
한편, `AdapterView`의 Child View들은 `view`의 `tag`를 활용해서 재활용을 하게 되는데 보통 `adapter`의 `getView()` 메서드에서 데이터를 공급받고, view를 재활용할지 새로 생성할지를 판단한다.
`View`를 생성할 때는 `view inflater`를 사용해야 하는데, 이는 `View.inflate()` 메서드를 사용하거나 `context`에서 `inflater` 객체 정보를 가져와서 xml layout 파일 정보에서 view를 생성한다. `View.inflate`은 `inflater`를 랩핑한 스태틱 메서드이다.

## 결론

`BaseAdapter`를 상속하고 있는 `adapter.getView()`가 공급하는 파라메터 중에서 `ViewGroup`가 `context` 정보를 가지고 있다. 따라서 별도로 `context` 정보를 주입할 필요 없이, 다음과 같이 `context` 정보를 가지고 올 수 있다.

``` java
@Override
public View getView(int position, View convertView, ViewGroup viewGroup) {
    if (convertView == null) {
        Context context = viewGroup.getContext();
        convertView = View.inflate(context, ...);
        // set viewHolder at tag
    } else {
        // get viewHolder at tag
    }
}
```
