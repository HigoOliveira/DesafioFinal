import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  userGetInformation: null,
  userSignUp: null,
  userSignIn: null,
});

export { Types };
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loading: false,
};

/* Reducers */

export const getUserInformation = state => ({...state, loading: true });

export const signUp = state => state;
export const signIn = state => state;

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_GET_INFORMATION]: getUserInformation,
  [Types.USER_SIGN_UP]: signUp,
  [Types.USER_SIGN_IN]: signIn,
});
