const initialState = {
  user: {},
  isLogged: false,
};

const loggedUser = (state = initialState, action) => {
  if (action.type === 'FETCH_LOGIN_FINISHED') {
    return { ...state, user: action.payload, isLogged: true };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, user: {}, isLogged: false };
  }
  return state;
};

export default loggedUser;
