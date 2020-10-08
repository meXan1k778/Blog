const initialState = {
  error: {},
  isLoginValid: false,
};

const ErrorStats = (state = initialState, action) => {
  if (action.type === 'FETCH_LOGIN_FAILED') {
    return { ...state, error: action.error, isLoginValid: true };
  }

  if (action.type === 'CHANGE_VALID_STATUS') {
    return { ...state, isLoginValid: false, error: {} };
  }
  return state;
};

export default ErrorStats;
