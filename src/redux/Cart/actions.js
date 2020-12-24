import cartTypes from './types';

export const addProduct = (nextCardItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCardItem,
});

export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem,
});

export const reduceCartItem = (cartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  payload: cartItem,
});

export const clearCart = () => ({
  type: cartTypes.CLEAR_CART,
});
