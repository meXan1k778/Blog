const initialState = {
  author: { username: '', image: '' },
  body: '',
  tagList: [],
  title: '',
  updatedAt: new Date(),
};

const CurrentArticle = (state = initialState, action) => {
  if (action.type === 'PUT_FULL_ARTICLE') {
    return action.payload;
  }
  if (action.type === 'SAVE_LIKE_DATA') {
    return action.payload.article
  }
  return state;
};

export default CurrentArticle;
