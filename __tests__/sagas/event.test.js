/* Redux */
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import rootSaga from 'store/sagas';
import api from 'services/api';

import ActionCreators from 'store/ducks/event';

const eventFixture = require('./fixtures/user.json');

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
  });
});
