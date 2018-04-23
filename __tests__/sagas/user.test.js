/* Redux */
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
    apiMock.onGet('/api/verify-user-exists/+559999999999')
      .reply(200, userFixture['/api/verify-user-exists/+559999999999']);
    sagaTester.dispatch(ActionCreators.userGetInformation('+559999999999'));

    await sagaTester.waitFor(ActionCreators.userSuccessGetInformation().type);
    await sagaTester.waitFor(NavigationActions.navigate({ routeName: 'SignIn' }).type);

    expect(sagaTester.wasCalled(ActionCreators.userSuccessGetInformation().type)).toBe(true);
    expect(sagaTester.getLatestCalledAction()).toEqual(NavigationActions.navigate({ routeName: 'SignIn' }));
  });

  it('Can\'t get user information', async () => {
    apiMock.onGet('/api/verify-user-exists/doesexist')
      .reply(400, userFixture['/api/verify-user-exists/doesexist']);
    sagaTester.dispatch(ActionCreators.userGetInformation('doesexist'));

    await sagaTester.waitFor(ActionCreators.userDoesExist().type);
    await sagaTester.waitFor(NavigationActions.navigate({ routeName: 'SignIn' }).type);

    expect(sagaTester.wasCalled(ActionCreators.userDoesExist().type)).toBe(true);
    expect(sagaTester.getLatestCalledAction()).toEqual(NavigationActions.navigate({ routeName: 'SignUp' }));
  });

  it('User login valid access', async () => {
    apiMock.onPost('/api/auth')
      .reply(200, userFixture['/api/auth']);
    sagaTester.dispatch(ActionCreators.userLogin('+559999999999', 'senha'));

    await sagaTester.waitFor(ActionCreators.userLoginSuccess().type);

    expect(sagaTester.getLatestCalledAction()).toEqual(ActionCreators.userLoginSuccess());
  });

  it('User signup valid', async () => {
    apiMock.onPost('/api/signup')
      .reply(200);

    sagaTester.dispatch(ActionCreators.userSignUp('+559999999999', 'Higo de Oliveira Ribeiro', 'senha1234'));
    await sagaTester.waitFor(ActionCreators.userSignUpSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(NavigationActions.navigate({ routeName: 'SignIn' }));
    expect(sagaTester.wasCalled(NavigationActions.navigate({ routeName: 'SignIn' }).type)).toBe(true);
  });

  it('Update user', async () => {
    apiMock.onPost('/api/user/update')
      .reply(200);

    sagaTester.dispatch(ActionCreators.userUpdateInformation('Higo Ribeiro', 'newpass', 'newpass'));
    await sagaTester.waitFor(ActionCreators.userUpdateInformationSuccess().type);
    expect(sagaTester.getLatestCalledAction()).toEqual(ActionCreators.userUpdateInformationSuccess('Higo Ribeiro'));
  });
});
