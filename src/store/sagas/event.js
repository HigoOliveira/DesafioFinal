import api from 'services/api';
import { call, put, select } from 'redux-saga/effects';
import ActionCreators from 'store/ducks/event';
import NotificationActions from 'store/ducks/notification';

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
    yield put(NotificationActions.notificationSend({ text: 'Adicionado com sucesso!' }));
    yield put(ActionCreators.eventAddNewSuccess(action.id, response.data.id));
  } else {
    yield put(NotificationActions.notificationSendWarning({
      text: 'Falha ao criar evento',
    }));
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
    yield put(NotificationActions.notificationSendAlert({
      text: 'Dados carregados com sucesso',
    }));
  } else {
    yield put(NotificationActions.notificationSendWarning({
      text: 'Falha ao resgatar dados',
    }));
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
    yield put(NotificationActions.notificationSendAlert({
      text: 'Seu evento foi apagado com sucesso!',
    }));
    yield put(ActionCreators.eventDeleteRemoteSuccess(action.id));
  } else {
    yield put(NotificationActions.notificationSendWarning({
      text: 'Falha ao excluir seu evento',
    }));
  }
}
