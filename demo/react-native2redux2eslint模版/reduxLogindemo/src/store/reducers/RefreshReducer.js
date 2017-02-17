// Reducer Example
const LOGIN_REFRESH = 'login_refresh';
const LOGOUT_REFRESH = 'logout_refresh';
const PAGEONE = 'page_one';
const PAGETWO = 'page_two';
// 推荐初始化state值
const INITIAL_STATE = {

};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_REFRESH:
    console.log('运行到Reducer'+action.payload);
    return { ...state, login:action.payload};
  case LOGOUT_REFRESH:
    console.log('运行到Reducer'+action.payload);
    return { ...state, login:action.payload};
  case PAGEONE:
    return { ...state, loginnumber:1};
  case PAGETWO:
    return { ...state, loginnumber:2};
  default:
    return state;
  }
};
