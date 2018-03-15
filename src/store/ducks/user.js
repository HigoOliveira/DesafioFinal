import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  userGetInformation: ['cellphone'],
  userSuccessGetInformation: ['data'],
  userDoesExist: ['cellphone'],
  userSignUp: null,
  userSignIn: null,
});

export { Types };
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loading: false,
  cellphone: '',
  fullname: '',
};

/* Reducers */

export const getUserInformation = state => ({ ...state, loading: true });
export const successGetInformation = (state, action) => ({
  ...state,
  cellphone: action.data.cellphone,
  fullname: action.data.fullname,
  loading: false,
});

export const doesExist = (state, action) => ({
  ...state,
  cellphone: action.cellphone,
  loading: false,
});

export const signUp = state => state;
export const signIn = state => state;

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_GET_INFORMATION]: getUserInformation,
  [Types.USER_SUCCESS_GET_INFORMATION]: successGetInformation,
  [Types.USER_DOES_EXIST]: doesExist,
  [Types.USER_SIGN_UP]: signUp,
  [Types.USER_SIGN_IN]: signIn,
});
