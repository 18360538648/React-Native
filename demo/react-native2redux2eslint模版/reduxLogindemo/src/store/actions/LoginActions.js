// Actions Example
const LOGIN_REFRESH = 'login_refresh';
export const loginRefresh = (response) => {
  console.log('运行到action了'+response);
  return {
    type: LOGIN_REFRESH,
    payload:response
  };
};
