import { combineReducers } from 'redux';

import userReducer from './User/reducer';
import productsReducer from './Products/reducer';

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
});
