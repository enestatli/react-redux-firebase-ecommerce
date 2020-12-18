import { takeLatest, call, all, put, take } from 'redux-saga/effects';
import { auth } from '../../firebase/utils';
import { setProducts } from './actions';

import { handleAddProduct, handleFetchProducts } from './helpers';
import productsTypes from './types';

export function* addProduct({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createdAt: timestamp,
    });
  } catch (error) {
    // console.log(error)
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (error) {
    // console.log(error)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export default function* productSagas() {
  yield all([call(onAddProductStart), call(onFetchProductsStart)]);
}

// listen action
