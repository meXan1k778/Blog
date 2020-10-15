import { takeEvery, call, put, all } from 'redux-saga/effects';

import {
  FETCH_REGISTRATION, 
  FETCH_LOGIN,
  FETCH_COOKIE,
  FETCH_PROFILE,
  setLoader,
  offLoader,
  putLogInData,
  putErrorData,
} from '../actions/userActions';
import {
  fetchRegistration,
  fetchLogIn,
  fetchCookie,
  fetchEditProfile,
} from '../apiServices/apiUserServices';

function* workerFetchReg(action) {
    try {
      const data = yield call(fetchRegistration, action.payload);
      if (data.user) {
        const userData = yield call(fetchLogIn, action.payload);
        document.cookie = userData.user.token;
        yield put(putLogInData({ ...userData.user, token: null }));
        yield put(setLoader());
        yield put(offLoader());
      } else yield put(putErrorData(data.errors));
    } catch (error) {
      console.log(error.message);
    }
  }
  
function* workerFetchLogIn(action) {
    try {
      const data = yield call(fetchLogIn, action.payload);
  
      if (data.user) {
        document.cookie = data.user.token;
        yield put(putLogInData({ ...data.user, token: null }));
      } else yield put(putErrorData());
    } catch (error) {
      console.log(error.message);
    }
  }
  
function* workerFetchCookie() {
    try {
      if (document.cookie.length !== 0) {
        const { user } = yield fetchCookie(document.cookie);
        yield put(putLogInData({ ...user, token: null }));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

function* workerFetchProfile(action) {
    try {
      const data = yield call(fetchEditProfile, action.payload);
      console.log(data)
      if (data.user) {
        yield put(putLogInData({ ...data.user, token: null }));
        yield put(setLoader());
        yield put(offLoader());
      } else yield put(putErrorData(data.errors));
    } catch (error) {
      console.log(error.message);
    }
  }

function* fetchRegSaga (){
    yield takeEvery(FETCH_REGISTRATION, workerFetchReg);
  }

function* fetchLogInSaga (){
    yield takeEvery(FETCH_LOGIN, workerFetchLogIn);
  }
  
function* fetchCookieSaga (){
    yield takeEvery(FETCH_COOKIE, workerFetchCookie);
  }

function* fetchProfileSaga (){
    yield takeEvery(FETCH_PROFILE, workerFetchProfile);
  }

export default function* userSaga(){
      yield all([
        fetchRegSaga(),
        fetchLogInSaga(),
        fetchCookieSaga(),
        fetchProfileSaga(),
      ])
  }