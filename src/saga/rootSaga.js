import { all } from 'redux-saga/effects';
import articleSaga from './articleSaga'
import userSaga from './userSaga'

export default function* rootSaga() {
    yield all([articleSaga(), userSaga()])
}
