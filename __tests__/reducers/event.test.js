import ActionCreators, { reducer, INITIAL_STATE } from 'store/ducks/event';
import UserActions from 'store/ducks/user';

describe('Testing event reducer', () => {
  function getReducer(action) {
    return reducer(INITIAL_STATE, action);
  }

  it('Can add new event', () => {
    const id = Math.random();
    const datetime = '2018-04-19 08:56';
    const name = 'Testar reducer';
    const where = 'Casa';
    const state = getReducer(ActionCreators.eventAddNew(id, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    expect(state.list).toHaveLength(1);
    expect(state.list)
      .toContainEqual({
        id,
        datetime,
        name,
        where,
        remote: false,
      });
  });

  it('Add new event was successful', () => {
    const id = Math.random();
    const initialState = getReducer(ActionCreators.eventAddNew(1, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    let state = reducer(initialState, ActionCreators.eventAddNew(id, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    state = reducer(state, ActionCreators.eventAddNewSuccess(id, 2));
    expect(state.list[1].id).toEqual(2);
    expect(state.list[0].id).toEqual(1);
  });

  it('Clean the list when user logout', () => {
    const initialState = getReducer(ActionCreators.eventAddNew(1, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    const state = reducer(initialState, UserActions.userLogout());

    expect(state.list).toEqual([]);
  });

  it('Remove event', () => {
    const event = ActionCreators.eventAddNew(2, '2018-04-19 08:56', 'Testar reducer', 'Casa');
    const initialState = getReducer(ActionCreators.eventAddNew(1, '2018-04-19 08:56', 'Testar reducer', 'Casa'));

    let state = reducer(initialState, event);
    state = reducer(state, ActionCreators.eventDeleteLocal(1));

    delete event.type;

    expect(state.list).toHaveLength(1);
    expect(state.list).toContainEqual({ ...event, remote: false });
    state = reducer(state, ActionCreators.eventDeleteLocal(2));
    expect(state.list).toEqual([]);
  });

  it('Load start', () => {
    const state = getReducer(ActionCreators.eventLoad());
    expect(state.loading).toBe(true);
  });

  it('Load was successful', () => {
    const list = [
      {
        id: 1,
        name: 'Evento',
        where: 'Trabalho',
        datetime: '2018-05-18 10:41',
      },
    ];
    const state = getReducer(ActionCreators.eventLoadSuccess(list));
    expect(state.list).toEqual(list);
  });
});
