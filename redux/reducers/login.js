const defaultState = {
  isSign: false,
  userInfo: {},
}
const login = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_IN':
      state.isSign = true;
      state.userInfo = action.options || {};
      return state;
    case 'LOGIN_OUT':
      state.isSign = false;
      state.userInfo = {};
      return state;
    default:
      return state;
  }
}

export default login;