import ActionCreators, { reducer, INITIAL_STATE } from 'store/ducks/user';

const cellphone = '+559999999999';
const name = 'Higo de Oliveira Ribeiro';
const password = 'higo1234';
const token = 'meutoken';

const data = {
  phone: cellphone,
  name,
};

describe('Testing user reducer', () => {
  function getReducer(action) {
    return reducer(INITIAL_STATE, action);
  }

  const loggedUser = () => reducer(
    getReducer(ActionCreators.userSuccessGetInformation(data)),
    ActionCreators.userLoginSuccess(token),
  );

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

  it('Login was a success', () => {
    const state = loggedUser();

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.token).toEqual(token);
  });

  it('Login error', () => {
    const initialState = getReducer(ActionCreators.userSuccessGetInformation(data));

    const state = reducer(initialState, ActionCreators.userLoginError());
    expect(state.loading).toBe(false);
    expect(state.cellphone).toEqual(cellphone);
  });

  it('Update information was successful', () => {
    const initialState = loggedUser();

    let state = reducer(
      initialState,
      ActionCreators.userUpdateInformation(name, password, password),
    );

    expect(state.loading).toBe(true);
    state = reducer(initialState, ActionCreators.userUpdateInformationSuccess('Higo'));
    expect(state.loading).toBe(false);
    expect(state.name).toEqual('Higo');
  });

  it('Update information failed', () => {
    const initialState = loggedUser();

    let state = reducer(
      initialState,
      ActionCreators.userUpdateInformation(name, password, password),
    );

    expect(state.loading).toBe(true);
    state = reducer(initialState, ActionCreators.userUpdateInformationError());
    expect(state.loading).toBe(false);
    expect(state.name).toEqual(name);
  });

  it('Logout', () => {
    const initialState = loggedUser();
    expect(initialState.isLoggedIn).toBe(true);
    const state = reducer(initialState, ActionCreators.userLogout());
    expect(state).toEqual(INITIAL_STATE);
  });

  it('User can signup', () => {
    const initialState = getReducer(ActionCreators.userSignUp(cellphone, name, password));

    expect(initialState.loading).toBe(true);
    expect(initialState.cellphone).toBe(cellphone);
    expect(initialState.name).toEqual(name);

    const state = reducer(initialState, ActionCreators.userSignUpSuccess());

    expect(state.loading).toBe(false);
  });

  it('User  can\'t sign up', () => {
    const initialState = getReducer(ActionCreators.userSignUp(cellphone, name, password));

    expect(initialState.loading).toBe(true);
    expect(initialState.cellphone).toBe(cellphone);
    expect(initialState.name).toEqual(name);

    const state = reducer(initialState, ActionCreators.userSignUpError());

    expect(state.loading).toBe(false);
  });
});
