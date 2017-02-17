// Actions Example
const LOGOUT_REFRESH = 'logout_refresh';
export const logoutRefresh = (response) => {
  console.log('运行到action了'+response);
  return {
    type: LOGOUT_REFRESH,
    payload:response
  };
};
