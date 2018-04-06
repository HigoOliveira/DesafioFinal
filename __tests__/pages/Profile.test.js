/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import Profile from 'pages/Profile';
import Alert from 'components/Alert';
import Input from 'components/Input';
import Button from 'components/Button';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const initialStore = {
  user: {
    cellphone: '99999999999',
    name: 'Higo de Oliveira Ribeiro',
  },
};

const cellphone = '+559999999999';
const name = 'Higo de Oliveira Ribeiro';


describe('Profile', () => {
  const store = mockStore(initialStore);
  let wrapper;
  let alert;

  function createWrapper() {
    const navigation = { setParams: jest.fn() };
    return shallow(
      <Profile navigation={navigation} />,
      { context: { store } },
    );
  }

  beforeEach(() => {
    alert = sinon.spy(Alert, 'alert');
    wrapper = createWrapper().dive();
    store.clearActions();
  });

  afterEach(() => {
    alert.restore();
  });

  it('Render 3 fields for user to fill', () => {
    expect(wrapper.find(Input)).toHaveLength(3);
  });

  it('Can\'t save updates when anything is blank', () => {
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toEqual([]);
    expect(Alert.alert.calledOnce).toBe(true);
  });

  it('Can save name update when it\'s filled', () => {
    wrapper.setState({
      name,
    });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userUpdateInformation(name, '', ''));
  });

  it('Can\'t update password when password or confirmPassword aren\'t equal', () => {
    wrapper.setState({
      password: 'pass1',
      confirmPassword: 'pass2',
    });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toEqual([]);
    expect(Alert.alert.calledOnce).toBe(true);
  });
});
