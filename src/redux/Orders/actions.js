import ordersTypes from './types';
import orderTypes from './types';

export const saveOrderHistory = (order) => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order,
});

export const getUserOrderHistory = (uid) => ({
  type: orderTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid,
});

export const setUserOrderHistory = (history) => ({
  type: orderTypes.SET_USER_ORDER_HISTORY,
  payload: history,
});
