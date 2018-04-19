import ActionCreators, { reducer, INITIAL_STATE } from 'store/ducks/event';

describe('Testing event reducer', () => {
  it('Can add new event', () => {
    const state = reducer(INITIAL_STATE, ActionCreators.eventAddNew('2018-04-19 08:56', 'Testar reducer', 'Casa'));
    expect(state.list).toHaveLength(1);
    expect(state.list[0].datetime).toEqual('2018-04-19 08:56');
    expect(state.list[0].name).toEqual('Testar reducer');
    expect(state.list[0].where).toEqual('Casa');
  });
});
