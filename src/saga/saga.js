import { takeEvery, call, put } from 'redux-saga/effects';

import {
  FETCH_REGISTRATION,
  FETCH_LOGIN,
  FETCH_COOKIE,
  FETCH_PROFILE,
  FETCH_ARTICLE,
  FETCH_ARTICLES_LIST,
  FETCH_UPDATE_ARTICLE,
  changeRegStatus,
  putLogInData,
  putErrorData,
  putArticles,
} from '../actions/actions';
import {
  fetchRegistration,
  fetchLogIn,
  fetchCookie,
  fetchEditProfile,
  fetchNewArticle,
  fetchArticlesList,
  fetchUpdateArticle,
} from '../components/Api/api';

export function* workerFetchArticlesList(action) {
  const data = yield call(fetchArticlesList, action.payload);

  yield put(putArticles(data.articles));
}

export function* workerFetchReg(action) {
  const data = yield call(fetchRegistration, action.payload);

  if (data.user) {
    yield put(changeRegStatus());
  } else yield put(putErrorData(data.errors));
}

export function* workerFetchLogIn(action) {
  try {
    const data = yield call(fetchLogIn, action.payload);

    if (data.user) {
      document.cookie = data.user.token;
      yield put(putLogInData({ ...data.user }));
    } else yield put(putErrorData());
  } catch (error) {
    alert('Something went wrong, try again');
  }
}

export function* workerFetchCookie() {
  if (document.cookie.length !== 0) {
    const { user } = yield fetchCookie(document.cookie);
    yield put(putLogInData({ ...user }));
  } else console.log('there is no cookie');
}

export function* workerFetchProfile(action) {
  try {
    const data = yield call(fetchEditProfile, action.payload);

    if (data.user) {
      yield put(putLogInData({ ...data.user }));
    } else yield put(putErrorData(data.errors));
  } catch (error) {
    alert('Something went wrong, try again');
  }
}

export function* workerFetchArticle(action) {
  yield call(fetchNewArticle, action.payload);
}

export function* workerFetchUpdateArticle(action) {
  yield call(fetchUpdateArticle, action.payload);
}

export function* whatchFetchReg() {
  yield takeEvery(FETCH_ARTICLES_LIST, workerFetchArticlesList);
  yield takeEvery(FETCH_REGISTRATION, workerFetchReg);
  yield takeEvery(FETCH_LOGIN, workerFetchLogIn);
  yield takeEvery(FETCH_COOKIE, workerFetchCookie);
  yield takeEvery(FETCH_PROFILE, workerFetchProfile);
  yield takeEvery(FETCH_ARTICLE, workerFetchArticle);
  yield takeEvery(FETCH_UPDATE_ARTICLE, workerFetchUpdateArticle);
}