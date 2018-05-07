import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  userGetInformation: ['cellphone'],
  userSuccessGetInformation: ['data'],

  userDoesExist: ['cellphone'],

  userSignUp: ['cellphone', 'name', 'password'],
  userSignUpSuccess: ['msg'],

  userLogin: ['username', 'password'],
  userLoginSuccess: ['token'],
  userLoginError: ['msg'],

  userLogout: null,

  userUpdateInformation: ['name', 'password', 'passwordConfirm'],
  userUpdateInformationSuccess: ['name'],
});

export { Types };
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loading: false,
  cellphone: '',
  name: '',
  isLoggedIn: false,
  msg: '',
  token: '',
};

/* Reducers */

export const getUserInformation = state => ({ ...state, loading: true });
export const successGetInformation = (state, action) => ({
  ...state,
  cellphone: action.data.phone,
  name: action.data.name,
  loading: false,
});

export const doesExist = (state, action) => ({
  ...state,
  cellphone: action.cellphone,
  loading: false,
});

export const signUp = (state, action) => ({
  ...state,
  cellphone: action.cellphone,
  loading: true,
});
export const signUpSuccess = (state, action) => ({
  ...state,
  msg: action.msg,
  loading: false,
});

export const login = state => ({ ...state, loading: true });
export const loginSuccess = (state, action) => ({
  ...state,
  token: action.token,
  loading: false,
  isLoggedIn: true,
});
export const loginError = (state, action) => ({
  ...state,
  loading: false,
  msg: action.msg,
});

export const logout = () => INITIAL_STATE;

export const updateInformation = state => ({
  ...state,
  loading: true,
});

export const updateInformationSuccess = (state, action) => ({
  ...state,
  name: action.name,
  loading: false,
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_GET_INFORMATION]: getUserInformation,
  [Types.USER_SUCCESS_GET_INFORMATION]: successGetInformation,
  [Types.USER_DOES_EXIST]: doesExist,
  [Types.USER_SIGN_UP]: signUp,
  [Types.USER_SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.USER_LOGIN]: login,
  [Types.USER_LOGIN_SUCCESS]: loginSuccess,
  [Types.USER_LOGIN_ERROR]: loginError,
  [Types.USER_LOGOUT]: logout,
  [Types.USER_UPDATE_INFORMATION]: updateInformation,
  [Types.USER_UPDATE_INFORMATION_SUCCESS]: updateInformationSuccess,
});
