import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  eventAddNew: ['datetime', 'name', 'where'],
});

export { Types };
export default Creators;

/* Initial State */
export const INITIAL_STATE = {
  list: [],
};
