import ActionCreators, { reducer, INITIAL_STATE } from 'store/ducks/user';

describe('Testing event reducer', () => {
  const cellphone = '+559999999999';
  const name = 'Higo de Oliveira Ribeiro';
  const password = 'higo1234';

  const data = {
    phone: cellphone,
    name,
  };

  function getReducer(action) {
    return reducer(INITIAL_STATE, action);
  }

  it('Get user information', () => {
    const state = getReducer(ActionCreators.userGetInformation(cellphone));
    expect(state.loading).toBe(true);
  });

  it('Get user success information', () => {
    const state = getReducer(ActionCreators.userSuccessGetInformation(data));
    expect(state.cellphone).toBe(cellphone);
    expect(state.name).toBe(name);
    expect(state.loading).toBe(false);
  });

  it('Get user information, but it doesn\'t exist', () => {
    const state = getReducer(ActionCreators.userDoesExist(cellphone));
    expect(state.cellphone).toBe(cellphone);
  });

  it('Can login', () => {
    const initialState = getReducer(ActionCreators.userSuccessGetInformation(data));
    const state = reducer(initialState, ActionCreators.userLogin(cellphone, password));
    expect(state.cellphone).toBe(cellphone);
  });

  it('Login were a success', () => {
    const token = 'meutoken';
    const state = getReducer(ActionCreators.userLoginSuccess(token));

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.token).toEqual(token);
  });

  it('Login error', () => {
    const msg = 'Impossível fazer login com as credenciais fornecidas.';

    const initialState = getReducer(ActionCreators.userSuccessGetInformation(data));

    const state = reducer(initialState, ActionCreators.userLoginError(msg));
    expect(state.loading).toBe(false);
    expect(state.cellphone).toEqual(cellphone);
    expect(state.msg).toEqual(msg);
  });
});
