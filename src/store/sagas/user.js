import api from 'services/api';
import { call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ActionCreators from 'store/ducks/user';

export function* getUserInformation(action) {
  const response = yield call(api.get, `/api/verify-user-exists/${action.cellphone}`);
  if (response.ok) {
    yield put(ActionCreators.userSuccessGetInformation(response.data));
    yield put(NavigationActions.navigate({ routeName: 'SignIn' }));
  } else {
    yield put(ActionCreators.userDoesExist(action.cellphone));
    yield put(NavigationActions.navigate({ routeName: 'SignUp' }));
  }
}

export function* login(action) {
  const response = yield call(api.post, '/api/auth', { username: action.username, password: action.password });
  if (response.ok) {
    yield put(ActionCreators.userLoginSuccess(response.data.token));
  } else {
    yield put(ActionCreators.userLoginError(response.data.non_field_errors[0]));
  }
}

export function* signUp(action) {
  const response = yield call(api.post, '/api/signup', {
    phone: action.cellphone,
    name: action.name,
    password: action.password,
  });
  if (response.ok) {
    yield put(ActionCreators.userSignUpSuccess('Usuário registrado com sucesso!'));
    yield put(NavigationActions.navigate({ routeName: 'SignIn' }));
  }
}

export function* updateInformation(action) {
  const { token } = yield select(state => state.user);
  const response = yield call(api.post, '/api/user/update', {
    name: action.name,
    password: action.password,
    password_confirm: action.passwordConfirm,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (response.ok) {
    yield put(ActionCreators.userUpdateInformationSuccess(action.name));
  }
}
