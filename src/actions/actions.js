export const FETCH_REGISTRATION = 'FETCH_REGISTRATION';
export const FETCH_LOGIN = 'FETCH_LOGIN';
export const FETCH_COOKIE = 'FETCH_COOKIE';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const FETCH_ARTICLES_LIST = 'FETCH_ARTICLES_LIST';
export const FETCH_UPDATE_ARTICLE = 'FETCH_UPDATE_ARTICLE';
export const FETCH_DELETE_ARTICLE = 'FETCH_DELETE_ARTICLE';
export const LIKE = 'LIKE';

const sendRegForm = (data) => {
  return {
    type: FETCH_REGISTRATION,
    payload: data,
  };
};

const getDataFromCookie = () => {
  return {
    type: FETCH_COOKIE,
  };
};

const changeRegStatus = () => {
  return {
    type: 'FETCH_FINISHED',
  };
};

const editProfile = (data) => {
  return {
    type: FETCH_PROFILE,
    payload: data,
  };
};

const sendLogInForm = (data) => {
  return {
    type: FETCH_LOGIN,
    payload: data,
  };
};

const putLogInData = (data) => {
  return {
    type: 'FETCH_LOGIN_FINISHED',
    payload: data,
  };
};

const putErrorData = (data = {}) => {
  return {
    type: FETCH_LOGIN_FAILED,
    error: data,
  };
};

const logOutData = () => {
  document.cookie = `${document.cookie}; max-age=0`;
  return {
    type: 'LOG_OUT',
  };
};

const setVallidStatus = () => {
  return {
    type: 'CHANGE_VALID_STATUS',
  };
};

const createArticle = (data) => {
  return {
    type: FETCH_ARTICLE,
    payload: data,
  };
};

const getArticles = (page) => {
  return {
    type: FETCH_ARTICLES_LIST,
    payload: page,
  };
};

const putArticles = (data) => {
  return {
    type: 'REQUEST_SUCCES',
    payload: data,
  };
};

const updateArticle = (data) => {
  return {
    type: FETCH_UPDATE_ARTICLE,
    payload: data,
  };
};

const deleteArticle = (slug) => {
  return {
    type: FETCH_DELETE_ARTICLE,
    payload: slug,
  };
};

const toggleFetch = () => {
  return {
    type: 'FETCH_SUCCES',
  };
};

const toggleLike = (slug) => {
  return {
    type: LIKE,
    payload: slug,
  };
};

const saveLikedData = (article) => {
  return {
    type: 'SAVE_LIKE_DATA',
    payload: article,
  };
};

export {
  getArticles,
  putArticles,
  sendRegForm,
  changeRegStatus,
  putLogInData,
  sendLogInForm,
  logOutData,
  getDataFromCookie,
  putErrorData,
  setVallidStatus,
  editProfile,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleFetch,
  toggleLike,
  saveLikedData,
};
