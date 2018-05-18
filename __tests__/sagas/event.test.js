/* Redux */
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import rootSaga from 'store/sagas';
import api from 'services/api';

import ActionCreators from 'store/ducks/event';
import NotificationActions from 'store/ducks/notification';

const eventFixture = require('./fixtures/event.json');

const id = Math.random();

describe('Testing Event Saga', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: {
        event: {
          list: [],
        },
        user: {
          token: 'umtokenvalido',
        },
      },
    });
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it('Add new event was successful', async () => {
    const response = eventFixture['/api/event/create'];
    apiMock.onPost('/api/event/create')
      .reply(200, response);

    sagaTester.dispatch(ActionCreators.eventAddNew(id, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    await sagaTester.waitFor(ActionCreators.eventAddNewSuccess().type);
    expect(sagaTester.getCalledActions())
      .toContainEqual(ActionCreators.eventAddNewSuccess(id, response.id));
    expect(sagaTester.getCalledActions())
      .toContainEqual(NotificationActions.notificationSendAlert({ text: 'Adicionado com sucesso!' }));
  });

  it('Add new event failed', async () => {
    apiMock.onPost('/api/event/create')
      .reply(400);

    sagaTester.dispatch(ActionCreators.eventAddNew(id, '2018-04-19 08:56', 'Testar reducer', 'Casa'));
    await sagaTester.waitFor(NotificationActions.notificationSendWarning().type);
    expect(sagaTester.getCalledActions())
      .toContainEqual(NotificationActions.notificationSendWarning({ text: 'Falha ao criar evento' }));
  });

  it('Load events when signin', async () => {
    const response = eventFixture['/api/event/list'];
    apiMock.onGet('/api/event/list')
      .reply(200, response);

    sagaTester.dispatch(ActionCreators.eventLoad());
    await sagaTester.waitFor(ActionCreators.eventLoadSuccess().type);
  });

  it('User remove event local and remote', async () => {
    apiMock.onPost('/api/event/delete/1')
      .reply(200);

    sagaTester.dispatch(ActionCreators.eventDeleteRemote(1));
    await sagaTester.waitFor(ActionCreators.eventDeleteRemoteSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(ActionCreators.eventDeleteRemoteSuccess(1));
    expect(sagaTester.getCalledActions()).toContainEqual(NotificationActions.notificationSendAlert({ text: 'Seu evento foi apagado com sucesso!' }));
  });

  it('User remove event local and remote with fail', async () => {
    apiMock.onPost('/api/event/delete/1')
      .reply(400);

    sagaTester.dispatch(ActionCreators.eventDeleteRemote(1));
    await sagaTester.waitFor(NotificationActions.notificationSendWarning().type);
    expect(sagaTester.getCalledActions())
      .toContainEqual(NotificationActions.notificationSendWarning({ text: 'Falha ao excluir seu evento' }));
  });
});
