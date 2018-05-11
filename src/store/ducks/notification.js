import { createReducer, createActions } from 'reduxsauce';
import { Types as UserTypes } from './user';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  notificate: ['text', 'time', 'type'],
  clean: null,
});

export { Types };
export default Creators;

/* Initial State */
export const INITIAL_STATE = {
  text: '',
  time: 4000,
  type: 'notice',
  open: false,
};

/* Reducers */
export const notificate = (state, action) => ({
    text: action.text,
    time: action.time || 4000,
    type: action.type || 'notice',
    open: true,
});

export const clean = () => INITIAL_STATE;

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATE]: notificate,
  [Types.CLEAN]: clean,
});
