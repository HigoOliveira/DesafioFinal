import ActionCreators, { reducer, INITIAL_STATE } from 'store/ducks/event';
import UserActions from 'store/ducks/user';

describe('Testing event reducer', () => {
  function getReducer(action) {
    return reducer(INITIAL_STATE, action);
  }

  it('Can add new event', () => {
    const id = Math.random();
    const state = getReducer(ActionCreators.eventAddNew(id, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    expect(state.list).toHaveLength(1);
    expect(state.list[0].id).toEqual(id);
    expect(state.list[0].datetime).toEqual('2018-04-19 08:56');
    expect(state.list[0].name).toEqual('Testar reducer');
    expect(state.list[0].where).toEqual('Casa');
  });

  it('Add new event was successful', () => {
    const id = Math.random();
    const initialState = getReducer(ActionCreators.eventAddNew(id, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    const state = reducer(initialState, ActionCreators.eventAddNewSuccess(id, 1));
    expect(state.list[0].id).toEqual(1);
  });

  it('Clean the list when user logout', () => {
    const initialState = getReducer(ActionCreators.eventAddNew(1, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    const state = reducer(initialState, UserActions.userLogout());

    expect(state.list).toEqual([]);
  });
});
