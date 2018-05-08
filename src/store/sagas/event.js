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

export function* loadEvents() {
  const { token } = yield select(state => state.user);
  const response = yield call(api.get, '/api/event/list', {
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    yield put(ActionCreators.eventLoadSuccess(response.data));
  }
}

export function* deleteEvent(action) {
  const { token } = yield select(state => state.user);
  const response = yield call(api.post, `/api/event/delete/${action.id}`, {
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok) {
    yield put(ActionCreators.eventDeleteRemoteSuccess(action.id));
  }
}
