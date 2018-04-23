/* Core */
import { takeLatest, all } from 'redux-saga/effects';

/* Types */
import { Types as UserTypes } from 'store/ducks/user';

/* Sagas */
import { getUserInformation, login, signUp, updateInformation } from './user';

export default function* root() {
  yield all([
    takeLatest(UserTypes.USER_GET_INFORMATION, getUserInformation),
    takeLatest(UserTypes.USER_LOGIN, login),
    takeLatest(UserTypes.USER_SIGN_UP, signUp),
    takeLatest(UserTypes.USER_UPDATE_INFORMATION, updateInformation),
  ]);
}
