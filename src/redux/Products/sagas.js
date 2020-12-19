import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth } from '../../firebase/utils';
import { fetchProductsStart, setProducts } from './actions';

import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProducts,
} from './helpers';
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
    yield put(fetchProductsStart());
  } catch (error) {
    // console.log(error)
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload: { filterType } }) {
  try {
    const products = yield handleFetchProducts({ filterType });
    yield put(setProducts(products));
  } catch (error) {
    // console.log(error)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (error) {
    // console.log(error)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}

// listen action
