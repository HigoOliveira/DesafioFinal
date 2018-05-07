import api from 'services/api';
import { call, put, select } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/event';

export function* addEvent(action) {
  const { token } = yield select(state => state.user);
  const response = yield call(api.post, '/api/event/create', {
    name: action.name,
    where: action.where,
    datetime: action.datetime,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    yield put(ActionCreators.eventAddNewSuccess(action.id, response.data.id));
  }
}
