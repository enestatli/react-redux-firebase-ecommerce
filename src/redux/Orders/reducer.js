import ordersTypes from './types';

const INITIAL_STATE = {
  orderHistory: [],
};
const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.tyoe) {
    case ordersTypes.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
