import api from 'services/api';

import { call, put, select, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import ActionCreators from 'store/ducks/event';
import NotificationActions from 'store/ducks/notification';

import { TIMEOUT } from 'config/App';

export function* addEvent(action) {
  const { token } = yield select(state => state.user);
  const { response } = yield race({
    response: call(api.post, '/api/event/create', {
      name: action.name,
      where: action.where,
      datetime: action.datetime,
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
    timeout: call(delay, TIMEOUT),
  });

  if (response && response.ok) {
    yield put(NotificationActions.notificationSendAlert({ text: 'Adicionado com sucesso!' }));
    yield put(ActionCreators.eventAddNewSuccess(action.id, response.data.id));
  } else {
    yield put(NotificationActions.notificationSendWarning({
      text: 'Falha ao atualizar evento on-line',
    }));
  }
}

export function* loadEvents() {
  const { token } = yield select(state => state.user);
  const response = yield race({
    response: call(api.get, '/api/event/list', {
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
    timeout: call(delay, TIMEOUT),
  });

  if (response && response.ok) {
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
  const response = yield race({
    response: call(api.post, `/api/event/delete/${action.id}`, {
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    }),
    timeout: call(delay, TIMEOUT),
  });
  if (response && response.ok) {
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
