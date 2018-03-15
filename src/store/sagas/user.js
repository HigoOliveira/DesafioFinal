import api from 'services/api';
import { call, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ActionCreators from 'store/ducks/user';

export function* getUserInformation(action) {
  const response = yield call(api.get, `/api/user/${action.cellphone}`);
  if (response.ok) {
    if (response.data.user) {
      yield put(ActionCreators.userSuccessGetInformation(response.data));
      yield put(NavigationActions.navigate({ routeName: 'SignIn' }));
    } else {
      yield put(ActionCreators.userDoesExist(action.cellphone));
      yield put(NavigationActions.navigate({ routeName: 'SignUp' }));
    }
  }
}
