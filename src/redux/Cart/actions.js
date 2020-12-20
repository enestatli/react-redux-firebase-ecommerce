import cartTypes from './types';

export const addProduct = (nextCardItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCardItem,
});
