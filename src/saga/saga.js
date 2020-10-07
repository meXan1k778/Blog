import { takeEvery, call, put } from 'redux-saga/effects';

import {
  FETCH_REGISTRATION,
  FETCH_LOGIN,
  FETCH_COOKIE,
  FETCH_PROFILE,
  FETCH_ARTICLE,
  FETCH_ARTICLES_LIST,
  FETCH_UPDATE_ARTICLE,
  FETCH_DELETE_ARTICLE,
  FULL_ARTICLE,
  LIKE,
  changeRegStatus,
  putLogInData,
  putErrorData,
  putArticles,
  saveLikedData,
  putFullArticle,
} from '../actions/actions';
import {
  fetchRegistration,
  fetchLogIn,
  fetchCookie,
  fetchEditProfile,
  fetchNewArticle,
  fetchArticlesList,
  fetchUpdateArticle,
  fetchDeleteArticle,
  fetchLike,
  fetchDislike,
  fetchOpenArticle,
} from '../Api-service/Api-service';

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

export function* workerFetchFullArticle(action) {
  console.log(action.payload, 'saga');
  const data = yield call(fetchOpenArticle, action.payload);
  console.log(data.article);
  yield put(putFullArticle(data.article));
}

export function* workerFetchProfile(action) {
  try {
    const data = yield call(fetchEditProfile, action.payload);

    if (data.user) {
      yield put(putLogInData({ ...data.user }));
      yield put(changeRegStatus());
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

export function* workerFetchDeleteArticle(action) {
  yield call(fetchDeleteArticle, action.payload);
}

export function* workerFetchLike(action) {
  const data = yield call(fetchLike, action.payload.slug);

  if (data.article.favoritesCount === action.payload.likeCount) {
    const newData = yield call(fetchDislike, action.payload.slug);

    yield put(saveLikedData(newData));
  } else yield put(saveLikedData(data));
}

export function* whatchFetchReg() {
  yield takeEvery(FETCH_ARTICLES_LIST, workerFetchArticlesList);
  yield takeEvery(FETCH_REGISTRATION, workerFetchReg);
  yield takeEvery(FETCH_LOGIN, workerFetchLogIn);
  yield takeEvery(FETCH_COOKIE, workerFetchCookie);
  yield takeEvery(FULL_ARTICLE, workerFetchFullArticle);
  yield takeEvery(FETCH_PROFILE, workerFetchProfile);
  yield takeEvery(FETCH_ARTICLE, workerFetchArticle);
  yield takeEvery(FETCH_UPDATE_ARTICLE, workerFetchUpdateArticle);
  yield takeEvery(FETCH_DELETE_ARTICLE, workerFetchDeleteArticle);
  yield takeEvery(LIKE, workerFetchLike);
}
