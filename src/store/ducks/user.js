import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  // Informações
  userGetInformation: ['cellphone'],
  userSuccessGetInformation: ['data'],
  userDoesExist: ['cellphone'],
  // Registro
  userSignUp: ['cellphone', 'name', 'password'],
  userSignUpSuccess: null,
  userSignUpError: null,
  // Acesso
  userLogin: ['username', 'password'],
  userLoginSuccess: ['token'],
  userLoginError: null,
  // Sair
  userLogout: null,
  // Atualizar dados
  userUpdateInformation: ['name', 'password', 'passwordConfirm'],
  userUpdateInformationSuccess: ['name'],
  userUpdateInformationError: null,
});

export { Types };
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  loading: false,
  cellphone: '',
  name: '',
  isLoggedIn: false,
  msg: '',
  token: '',
};

/* Reducers */

export const loading = (state, value = false) => ({
  ...state,
  loading: value,
});

export const getUserInformation = state => loading(state, true);
export const successGetInformation = (state, action) => ({
  ...state,
  cellphone: action.data.phone,
  name: action.data.name,
  loading: false,
});

export const doesExist = (state, action) => ({
  ...state,
  cellphone: action.cellphone,
  loading: false,
});

export const signUp = (state, action) => ({
  ...state,
  cellphone: action.cellphone,
  name: action.name,
  loading: true,
});

export const signUpSuccess = state => loading(state);

export const signUpError = state => loading(state);

export const login = state => loading(state, true);
export const loginSuccess = (state, action) => ({
  ...state,
  token: action.token,
  loading: false,
  isLoggedIn: true,
});
export const loginError = state => loading(state);

export const logout = () => INITIAL_STATE;

export const updateInformation = state => loading(state, true);

export const updateInformationSuccess = (state, action) => ({
  ...state,
  name: action.name,
  loading: false,
});

export const updateInformationError = state => loading(state);

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  // Informações
  [Types.USER_GET_INFORMATION]: getUserInformation,
  [Types.USER_SUCCESS_GET_INFORMATION]: successGetInformation,
  [Types.USER_DOES_EXIST]: doesExist,
  // Registro
  [Types.USER_SIGN_UP]: signUp,
  [Types.USER_SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.USER_SIGN_UP_ERROR]: signUpError,
  // Acessso
  [Types.USER_LOGIN]: login,
  [Types.USER_LOGIN_SUCCESS]: loginSuccess,
  [Types.USER_LOGIN_ERROR]: loginError,
  // Sair
  [Types.USER_LOGOUT]: logout,
  // Atualizar dados
  [Types.USER_UPDATE_INFORMATION]: updateInformation,
  [Types.USER_UPDATE_INFORMATION_SUCCESS]: updateInformationSuccess,
  [Types.USER_UPDATE_INFORMATION_ERROR]: updateInformationError,
});
