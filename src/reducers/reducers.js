import { combineReducers } from 'redux';
import CurrentArticle from './CurrentArticle';
import loggedUser from './loggedUser';
import articles from './articles';
import ErrorStats from './ErrorStats';
import Status from './Status';

export default combineReducers({ Status, CurrentArticle, loggedUser, articles, ErrorStats });
