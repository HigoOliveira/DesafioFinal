/* Core */
import { takeLatest, all } from 'redux-saga/effects';

/* Types */
import { Types as UserTypes } from 'store/ducks/user';
import { Types as EventTypes } from 'store/ducks/event';

/* Sagas */
import { getUserInformation, login, signUp, updateInformation } from './user';
import { addEvent, loadEvents } from './event';

export default function* root() {
  yield all([
    takeLatest(UserTypes.USER_GET_INFORMATION, getUserInformation),
    takeLatest(UserTypes.USER_LOGIN, login),
    takeLatest(UserTypes.USER_SIGN_UP, signUp),
    takeLatest(UserTypes.USER_UPDATE_INFORMATION, updateInformation),
    takeLatest(EventTypes.EVENT_ADD_NEW, addEvent),
    takeLatest(EventTypes.EVENT_LOAD, loadEvents),
  ]);
}
