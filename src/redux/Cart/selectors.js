import { createSelector } from 'reselect';

export const selectCartData = (state) => state.cartData;

export const selectCartItems = createSelector(
  [selectCartData],
  (cartData) => cartData.cartItems
);

export const selectCartCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);
