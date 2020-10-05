import { takeEvery, call, put } from 'redux-saga/effects';

import {
  FETCH_REGISTRATION,
  FETCH_LOGIN,
  FETCH_COOKIE,
  FETCH_PROFILE,
  changeRegStatus,
  putLogInData,
  putErrorData,
} from '../actions/actions';
import { fetchRegistration, fetchLogIn, fetchCookie, fetchEditProfile } from '../components/Api/api';

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
    console.log(data);
    if (data.user) {
      yield put(putLogInData({ ...data.user }));
    } else yield put(putErrorData(data.errors));
  } catch (error) {
    alert('Something went wrong, try again');
  }
}

export function* whatchFetchReg() {
  yield takeEvery(FETCH_REGISTRATION, workerFetchReg);
  yield takeEvery(FETCH_LOGIN, workerFetchLogIn);
  yield takeEvery(FETCH_COOKIE, workerFetchCookie);
  yield takeEvery(FETCH_PROFILE, workerFetchProfile);
}
