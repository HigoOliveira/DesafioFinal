import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  userGetInformation: ['cellphone'],
  userSuccessGetInformation: ['data'],
  userDoesExist: ['cellphone'],
  userSignUp: null,
  userLogin: ['username', 'password'],
  userLoginSuccess: null,
  userLogout: null,
  userUpdateInformation: ['name', 'password', 'confirmPassword'],
});

export { Types };
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loading: false,
  cellphone: '',
  name: '',
  isLoggedIn: false,
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

export const signUp = state => ({ ...state, loading: true });
export const login = state => state;
export const loginSuccess = state => ({
  ...state,
  loading: false,
  isLoggedIn: true,
});

export const logout = () => INITIAL_STATE;

export const updateInformation = state => ({
  ...state,
  updating: true,
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_GET_INFORMATION]: getUserInformation,
  [Types.USER_SUCCESS_GET_INFORMATION]: successGetInformation,
  [Types.USER_DOES_EXIST]: doesExist,
  [Types.USER_SIGN_UP]: signUp,
  [Types.USER_LOGIN]: login,
  [Types.USER_LOGIN_SUCCESS]: loginSuccess,
  [Types.USER_LOGOUT]: logout,
  [Types.USER_UPDATE_INFORMATION]: updateInformation,
});
