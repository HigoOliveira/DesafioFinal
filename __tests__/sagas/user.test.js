/* Core */
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import rootSaga from 'store/sagas';
import api from 'services/api';

import ActionCreators from 'store/ducks/user';

import { NavigationActions } from 'react-navigation';

const userFixture = require('./fixtures/user.json');

describe('Testing User Saga', () => {
  let sagaTester = null;
  let apiMock = null;

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: {},
    });
    apiMock = new MockAdapter(api.axiosInstance);

    sagaTester.start(rootSaga);
  });

  it('Can get user information', async () => {
    apiMock.onGet('/api/user/9999999999')
      .reply(200, userFixture['/api/user/9999999999']);
    sagaTester.dispatch(ActionCreators.userGetInformation('9999999999'));

    await sagaTester.waitFor(ActionCreators.userSuccessGetInformation().type);
    await sagaTester.waitFor(NavigationActions.navigate({ routeName: 'SignIn' }).type);

    expect(sagaTester.getLatestCalledAction()).toEqual(NavigationActions.navigate({ routeName: 'SignIn' }));
  });
});
