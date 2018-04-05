import api from 'services/api';
import { call, put } from 'redux-saga/effects';
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
    // yield put(ActionCreators.userLoginSuccess({
    //   cellphone: '+5533',
    //   name: 'Higo de Oliveira Ribeiro',
    // }));
    // yield AsyncStorage.setItem(TOKEN_KEY, response.data.token);
    // console.tron.log(response);
    yield put(ActionCreators.userLoginSuccess());
    yield put(NavigationActions.navigate({ routeName: 'Home' }));
  }
}
