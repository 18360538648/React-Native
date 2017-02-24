# Redux

## Redux的一些API

### 1.1 createStore(reducer, [preloadedState], enhancer)


reducer：为应用中的Reducer对象；

preloadedState：初始时的 state；

enhancer：Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator

例子：

```
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './store/reducers';
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
```

### 1.2 <Provider store>

使组件级的connect()方法能给获得Redux store

### 1.3 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

使组件和Redux store连接在一起

[mapStateToProps(state, [ownProps]): stateProps]:此参数会监听Redux store的变化，任何时候，只要Redux store发生变化，mapStateToProps函数就会被调用，并且返回一个对象，这个对象会和组件的props合并。

[mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)：如果是一个对象，那么每一个定义在该对象中的函数都将会被当作Redux action creator，其中的所定义的方法名将作为属性名，合并到组件的props中


参考链接：[redux](http://cn.redux.js.org/docs/react-redux/api.html)

