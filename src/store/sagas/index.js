/* Core */
import { takeLatest, all } from 'redux-saga/effects';

/* Types */
import { Types as UserTypes } from 'store/ducks/user';

/* Sagas */
import { getUserInformation, login } from './user';

export default function* root() {
  yield all([
    takeLatest(UserTypes.USER_GET_INFORMATION, getUserInformation),
    takeLatest(UserTypes.USER_LOGIN, login),
  ]);
}
