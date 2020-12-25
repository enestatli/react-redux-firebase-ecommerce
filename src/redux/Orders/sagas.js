import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth } from '../../firebase/utils';
import { clearCart } from '../Cart/actions';
import { handleSaveOrder } from './helpers';

import ordersTypes from './types';

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
    yield put(clearCart());
  } catch (error) {
    // console.log(error)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export default function* ordersSagas() {
  yield all([call(onSaveOrderHistoryStart)]);
}
