import { all, call } from 'redux-saga/effects';
import userSagas from './User/sagas';

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
