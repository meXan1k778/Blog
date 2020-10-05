const initialState = {
  userRegistered: false,
  loggedUser: {},

  isLogged: false,
  isLoading: false,
  isLoginValid: false,
  error: {},
};

const Reducers = (state = initialState, action) => {
  if (action.type === 'FETCH_REGISTRATION') {
    return { ...state, isLoading: true };
  }
  if (action.type === 'FETCH_FINISHED') {
    return { ...state, userRegistered: !state.userRegistered, isLoading: false };
  }
  if (action.type === 'FETCH_LOGIN' || action.type === 'FETCH_COOKIE' || action.type === 'FETCH_EDIT') {
    return { ...state, isLoading: true };
  }
  if (action.type === 'FETCH_LOGIN_FINISHED') {
    return { ...state, loggedUser: action.payload, isLoading: false, isLogged: true };
  }
  if (action.type === 'FETCH_LOGIN_FAILED') {
    return { ...state, error: action.error, isLoginValid: true, isLoading: false };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, loggedUser: {}, isLogged: false };
  }
  if (action.type === 'CHANGE_VALID_STATUS') {
    return { ...state, isLoginValid: false, error: {} };
  }

  return state;
};

export default Reducers;
