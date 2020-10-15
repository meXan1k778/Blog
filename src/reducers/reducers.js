import { combineReducers } from 'redux';
import currentArticle from './currentArticle';
import loggedUser from './loggedUser';
import articles from './articles';
import errorStats from './errorStats';
import status from './status';

export default combineReducers({ status, currentArticle, loggedUser, articles, errorStats });
