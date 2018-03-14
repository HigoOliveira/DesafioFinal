/* Core */
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import rootSaga from 'store/sagas';
import api from 'services/api';

import ActionCreators from 'store/ducks/user';

const userFixture = require('./fixtures/user.json');

describe('Testing User Saga', () => {
  let sagaTester = null;
  let apiMock = null;
  beforeEach(() => {
    sagaTester = new SagaTester({});
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it('Can get user information', () => {
    apiMock.onGet('/api/user/')
      .reply(userFixture['/api/user/']);

    sagaTester.dispatch(ActionCreators.userGetInformation('9999999999'));
  });
});
