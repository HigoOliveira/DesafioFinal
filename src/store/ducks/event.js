import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  eventAddNew: ['id', 'datetime', 'name', 'where'],
  eventAddNewSuccess: ['oldId', 'newId'],
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
      id: action.id,
      datetime: action.datetime,
      name: action.name,
      where: action.where,
    },
  ],
});

export const addNewSuccess = (state, action) => ({
  ...state,
  list: state.list.map(event =>
    (action.oldId === event.id ? { ...event, id: action.newId } : event)),
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_ADD_NEW]: addNew,
  [Types.EVENT_ADD_NEW_SUCCESS]: addNewSuccess,
});
