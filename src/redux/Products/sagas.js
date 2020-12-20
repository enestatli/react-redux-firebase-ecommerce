import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth } from '../../firebase/utils';
import { fetchProductsStart, setProduct, setProducts } from './actions';

import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProduct,
  handleFetchProducts,
} from './helpers';
import productsTypes from './types';

// add new product
export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
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

// fetch all products
export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (error) {
    // console.log(error)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

// delete a product
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

//fetch a product
export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (error) {
    // console.log(error)
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
  ]);
}
