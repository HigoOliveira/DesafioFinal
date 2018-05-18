import ActionCreators, { reducer, INITIAL_STATE } from 'store/ducks/notification';

const text = 'Uma mensagem';
describe('Testing notification reducer', () => {
  function getReducer(action) {
    return reducer(INITIAL_STATE, action);
  }
  it('Sending a notification all kinds', () => {
    let state = getReducer(ActionCreators.notificationSend({ text }));
    expect(state.data.text).toEqual(text);
    expect(state.data.type).toEqual('info');

    state = getReducer(ActionCreators.notificationSendAlert({ text }));
    expect(state.data.text).toEqual(text);
    expect(state.data.type).toEqual('alert');

    state = getReducer(ActionCreators.notificationSendWarning({ text }));
    expect(state.data.text).toEqual(text);
    expect(state.data.type).toEqual('warning');
  });

  it('Clean notification', () => {
    let state = getReducer(ActionCreators.notificationSend({ text }));
    expect(state.data.text).toEqual(text);

    state = reducer(state, ActionCreators.notificationClean());

    expect(state).toEqual(INITIAL_STATE);
  });
});
