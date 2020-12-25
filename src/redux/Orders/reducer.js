import ordersTypes from './types';

const INITIAL_STATE = {
  orderHistory: [],
  orderDetails: {},
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
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
