import { createReducer, createActions } from 'reduxsauce';
import { Types as UserTypes } from './user';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  eventAddNew: ['id', 'datetime', 'name', 'where'],
  eventAddNewSuccess: ['oldId', 'newId'],
  eventLoad: null,
  eventLoadSuccess: ['list'],
});

export { Types };
export default Creators;

/* Initial State */
export const INITIAL_STATE = {
  list: [],
  loading: false,
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

export const load = state => ({
  ...state,
  loading: true,
});

export const loadSuccess = (state, action) => ({
  ...state,
  list: action.list,
  loading: false,
});

export const cleanState = () => ({
  list: [],
});

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EVENT_ADD_NEW]: addNew,
  [Types.EVENT_ADD_NEW_SUCCESS]: addNewSuccess,
  [Types.EVENT_LOAD]: load,
  [Types.EVENT_LOAD_SUCCESS]: loadSuccess,

  [UserTypes.USER_LOGOUT]: cleanState,
});
