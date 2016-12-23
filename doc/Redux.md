# Redux

## 1. Redux简介


Redux是一个JavaScript应用的可预见状态容器，可以帮助你写应用保持一贯的风格和运行在不同的环境中

```
npm install --save redux react-redux
```

## 2. Redux使用

Redux状态管理
![111](http://chuantu.biz/t5/44/1481157610x988815626.png)

## 2.1 创建一个Redux Store

Redux Store维持应用的State，每一个Redux应用只有一个的store

```
//Reducer：就是一个纯函数（只要传入参数相同，返回计算得到的下一个 state 就一定相同），接收旧的 state 和 action，返回新的 state
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
   // 遇到未知的 action 时，一定要返回旧的 state
  default:
    return state
  }
}

let store = createStore(counter)
```

### 2.2 创建一个Action

Action是把数据从应用传到store的有效载荷。它是store数据的唯一来源。我们约定，Action内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。使用如下的Action创建函数可以生成一个Action
```
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

### 2.3 应用发出一个Action

改变内部State的唯一方式是发出一个action

```
store.dispatch(addTodo(text))
```

### 2.4 使用subscribe更新UI

当View发出一个Action时，Store会接收到这个Action，Store中的Reducer会根据Action返回一个新的State，此时store.subscribe就会监听到，从而更新UI


## 3. 相关API

### 3.1 Provider store

Provider store使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider> 中才能使用 connect() 方法

### 3.2 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

连接 React 组件与 Redux store。连接操作不会改变原来的组件类。反而返回一个新的已与 Redux store 连接的组件类

* mapStateToProps：这个参数会监听Redux store的变化，任何时候Redux store发生变化，mapStateToProps函数就会调用，并返回一个纯对象，这个对象会与组件的props合并

```
const mapStateToProps = ({ auth }) => {
  const { name } = auth;
  return { name };
};

export default connect(mapStateToProps, {
  nameChanged
})(Login);
```
### 3.3 combineReducers

将多个Reducer合并在一起

```
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer
});
```

链接：

[官网链接](http://redux.js.org/index.html)

[中文官网链接](http://cn.redux.js.org/docs/introduction/PriorArt.html)
