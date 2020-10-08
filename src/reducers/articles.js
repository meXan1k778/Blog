const articles = (state = [], action) => {
  if (action.type === 'REQUEST_SUCCES') {
    return action.payload;
  }

  if (action.type === 'SAVE_LIKE_DATA') {
    return state.map((item) => (item.slug === action.payload.article.slug ? action.payload.article : item));
  }
  return state;
};

export default articles;
