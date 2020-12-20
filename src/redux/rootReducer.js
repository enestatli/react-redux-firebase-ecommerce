import { combineReducers } from 'redux';

import userReducer from './User/reducer';
import productsReducer from './Products/reducer';
import cartReducer from './Cart/reducer';

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
});
