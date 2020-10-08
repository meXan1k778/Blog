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
  return state;
};

export default CurrentArticle;
