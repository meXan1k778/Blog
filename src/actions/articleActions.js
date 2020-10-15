export const FULL_ARTICLE = 'FULL_ARTICLE';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const FETCH_ARTICLES_LIST = 'FETCH_ARTICLES_LIST';
export const FETCH_UPDATE_ARTICLE = 'FETCH_UPDATE_ARTICLE';
export const FETCH_DELETE_ARTICLE = 'FETCH_DELETE_ARTICLE';
export const LIKE = 'LIKE';

const putFullArticle = (article) => {
  return {
    type: 'PUT_FULL_ARTICLE',
    payload: article,
  };
};

const getFullArticle = (slug) => {
  return {
    type: FULL_ARTICLE,
    payload: slug,
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
  getFullArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleLike,
  saveLikedData,
  putFullArticle,
};
