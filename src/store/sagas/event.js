import api from 'services/api';
import { call, put } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/event';

export function* addEvent(action) {
  const response = yield call(api.post, '/api/event/create', {
    name: action.name,
    where: action.where,
    datetime: action.datetime,
  });
  if (response.ok) {
    yield put(ActionCreators.eventAddNewSuccess(action.id, response.data.id));
  }
}
