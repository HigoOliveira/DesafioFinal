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

/* Reducers */
export const addNew = (state, action) => ({
  ...state,
  list: [
    ...state.list,
    {
      datetime: action.datime,
      name: action.name,
      where: action.where,
    },
  ],
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_ADD_NEW]: addNew,
});
