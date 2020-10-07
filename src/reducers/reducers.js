const initialState = {
  userRegistered: false,
  loggedUser: {},
  articles: [],
  currentArticle: {
    author: { username: '', image: '' },
    body: '',
    tagList: [],
    title: '',
    updatedAt: new Date(),
  },
  isLogged: false,
  isLoading: false,
  isLoginValid: false,
  error: {},
  fetchSucces: false,
};

const Reducers = (state = initialState, action) => {
  if (action.type === 'FETCH_REGISTRATION') {
    return { ...state, isLoading: true };
  }
  if (action.type === 'FETCH_FINISHED') {
    return { ...state, userRegistered: !state.userRegistered, isLoading: false };
  }
  if (
    action.type === 'FETCH_LOGIN' ||
    action.type === 'FETCH_COOKIE' ||
    action.type === 'FETCH_EDIT' ||
    action.type === 'FETCH_ARTICLE' ||
    action.type === 'FETCH_ARTICLES_LIST' ||
    action.type === 'FETCH_UPDATE_ARTICLE' ||
    action.type === 'FETCH_DELETE_ARTICLE' ||
    action.type === 'FULL_ARTICLE'
  ) {
    return { ...state, isLoading: true };
  }
  if (action.type === 'FETCH_LOGIN_FINISHED') {
    return { ...state, loggedUser: action.payload, isLoading: false, isLogged: true };
  }
  if (action.type === 'FETCH_LOGIN_FAILED') {
    return { ...state, error: action.error, isLoginValid: true, isLoading: false };
  }
  if (action.type === 'PUT_FULL_ARTICLE') {
    return { ...state, currentArticle: action.payload, isLoading: false };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, loggedUser: {}, isLogged: false };
  }
  if (action.type === 'CHANGE_VALID_STATUS') {
    return { ...state, isLoginValid: false, error: {} };
  }
  if (action.type === 'REQUEST_SUCCES') {
    return { ...state, articles: action.payload, isLoading: false };
  }
  if (action.type === 'FETCH_SUCCES') {
    return { ...state, fetchSucces: !state.fetchSucces };
  }
  if (action.type === 'SAVE_LIKE_DATA') {
    const newArticles = state.articles.map((item) =>
      item.slug === action.payload.article.slug ? action.payload.article : item
    );
    return { ...state, articles: newArticles };
  }

  return state;
};

export default Reducers;
