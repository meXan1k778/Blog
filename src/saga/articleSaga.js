import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';

import {
    FETCH_ARTICLE,
    FETCH_ARTICLES_LIST,
    FETCH_UPDATE_ARTICLE,
    FETCH_DELETE_ARTICLE,
    FULL_ARTICLE,
    LIKE,
    putArticles,
    saveLikedData,
    putFullArticle,
  } from '../actions/articleActions';
  
  import {
    setLoader,
    offLoader
  } from '../actions/userActions';
  import {
    fetchNewArticle,
    fetchArticlesList,
    fetchUpdateArticle,
    fetchDeleteArticle,
    fetchLike,
    fetchDislike,
    fetchOpenArticle,
  } from '../apiServices/apiArticleServices';

function* workerFetchArticlesList(action) {
    try {
      const data = yield call(fetchArticlesList, action.payload);
      yield put(putArticles(data.articles));
    } catch (error) {
      console.log(error);
    }
  }

function* workerFetchFullArticle(action) {
    try {
      const data = yield call(fetchOpenArticle, action.payload);
  
      yield put(putFullArticle(data.article));
    } catch (error) {
      console.log(error);
    }
  }

function* workerFetchArticle(action) {
    try {
      yield call(fetchNewArticle, action.payload);
      yield put(setLoader());
      yield put(offLoader());
    } catch (error) {
      console.log(error);
    }
  }
  
function* workerFetchUpdateArticle(action) {
    try {
      yield call(fetchUpdateArticle, action.payload);
      yield put(setLoader());
      yield put(offLoader());
    } catch (error) {
      console.log(error);
    }
  }
  
function* workerFetchDeleteArticle(action) {
    try {
      yield call(fetchDeleteArticle, action.payload);
      yield put(setLoader());
      yield put(offLoader());
    } catch (error) {
      console.log(error);
    }
  }
  
function* workerFetchLike(action) {
    try {
      const data = yield call(fetchLike, action.payload.slug);
  
      if (data.article.favoritesCount === action.payload.likeCount) {
        const newData = yield call(fetchDislike, action.payload.slug);
  
        yield put(saveLikedData(newData));
      } else yield put(saveLikedData(data));
    } catch (error) {
      console.log(error);
    }
  }

function* fetchArticleListSaga (){
    yield takeEvery(FETCH_ARTICLES_LIST, workerFetchArticlesList);
  }

function* fetchFullArticleSaga (){
    yield takeEvery(FULL_ARTICLE, workerFetchFullArticle);
  }

function* fetchArticleSaga (){
    yield takeEvery(FETCH_ARTICLE, workerFetchArticle);
  }
  
function* fetchUdateArticleSaga (){
    yield takeEvery(FETCH_UPDATE_ARTICLE, workerFetchUpdateArticle);
  }
  
function* fetchDeleteArticleSaga (){
    yield takeEvery(FETCH_DELETE_ARTICLE, workerFetchDeleteArticle);
  }
  
function* fetchLikeSaga (){
    yield takeLatest(LIKE, workerFetchLike);
  }

export default function* articleSaga() {
    yield all([
        fetchArticleListSaga(),
        fetchFullArticleSaga(),
        fetchArticleSaga(),
        fetchUdateArticleSaga(),
        fetchDeleteArticleSaga(),
        fetchLikeSaga()
    ])
}