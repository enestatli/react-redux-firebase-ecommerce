import userTypes from './types';

const INITIAL_STATE = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErrors: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErrors: [],
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErrors: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
