import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  userGetInformation: null,
});

export { Types };
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loading: false,
};

/* Reducers */

export const getUserInformation = state => ({...state, loading: true });


/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_GET_INFORMATION]: getUserInformation,
});
