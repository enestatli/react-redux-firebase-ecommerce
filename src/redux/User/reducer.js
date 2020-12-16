import userTypes from './types';

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signUpError: [],
  signUpSuccess: false,
  resetPasswordSuccess: false,
  resetPasswordErrors: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordErrors: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;