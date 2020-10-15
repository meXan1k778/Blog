const initialState = {
  fetchSucces: false,
  isLoading: false,
};

const Status = (state = initialState, action) => {
  if (action.type === 'LOADER_ON' || action.type === 'LOADER_OFF') {
    return { ...state, fetchSucces: !state.fetchSucces, isLoading: false };
  }
  if (
    action.type === 'FETCH_LOGIN' ||
    action.type === 'FETCH_COOKIE' ||
    action.type === 'FETCH_EDIT' ||
    action.type === 'FETCH_ARTICLE' ||
    action.type === 'FETCH_ARTICLES_LIST' ||
    action.type === 'FETCH_UPDATE_ARTICLE' ||
    action.type === 'FETCH_DELETE_ARTICLE' ||
    action.type === 'FULL_ARTICLE' ||
    action.type === 'FETCH_REGISTRATION'
  ) {
    return { ...state, isLoading: true };
  }

  if (
    action.type === 'PUT_FULL_ARTICLE' ||
    action.type === 'FETCH_LOGIN_FINISHED' ||
    action.type === 'REQUEST_SUCCES' ||
    action.type === 'FETCH_LOGIN_FAILED'
  ) {
    return { ...state, isLoading: false };
  }

  return state;
};

export default Status;
