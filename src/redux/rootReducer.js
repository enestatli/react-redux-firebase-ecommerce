import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/reducer';
import productsReducer from './Products/reducer';
import cartReducer from './Cart/reducer';
import ordersReducer from './Orders/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
  ordersData: ordersReducer,
});

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData'],
};

export default persistReducer(configStorage, rootReducer);
