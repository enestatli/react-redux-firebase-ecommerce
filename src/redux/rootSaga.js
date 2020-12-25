import { all, call } from 'redux-saga/effects';
import userSagas from './User/sagas';
import productSagas from './Products/sagas';
import ordersSagas from './Orders/sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(productSagas), call(ordersSagas)]);
}
