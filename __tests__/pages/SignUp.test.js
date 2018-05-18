/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import SignUp from 'pages/SignUp';
import Alert from 'components/Alert';
import Input from 'components/Input';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';
import { NavigationActions } from 'react-navigation';

const mockStore = configureStore([]);

const initialStore = {
  user: {
    cellphone: '99999999999',
  },
};

const cellphone = '+559999999999';
const name = 'Higo de Oliveira Ribeiro';
const password = 'higo1234';

describe('Testing SignUp Page', () => {
  const store = mockStore(initialStore);
  let wrapper;

  function createWrapper() {
    return shallow(
      <SignUp />,
      { context: { store } },
    );
  }

  beforeEach(() => {
    wrapper = createWrapper().dive();
    wrapper.setProps({
      cellphone,
    });
    store.clearActions();
  });

  it('Render 3 fields for user to fill', () => {
    expect(wrapper.find(Input)).toHaveLength(3);
  });

  it('Render at least one password', () => {
    expect(wrapper.find({ secureTextEntry: true })).toHaveLength(1);
  });

  it('Can sign up if informations is valid', () => {
    wrapper.setState({
      name,
      password,
    });
    wrapper.find('#signup').simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userSignUp(cellphone, name, password));
  });

  it('Can\'t sign up if informations is valid', () => {
    sinon.spy(Alert, 'alert');
    wrapper.find('#signup').simulate('press');
    expect(store.getActions()).toEqual([]);
    expect(Alert.alert.calledOnce).toBe(true);
  });

  it('User already sign upped', () => {
    wrapper.find('#signin').simulate('press');
    expect(store.getActions()).toContainEqual(NavigationActions.navigate({ routeName: 'Start' }));
  });

  it('Texts changed state', () => {
    const nameInput = wrapper.find('#name');
    nameInput.simulate('ChangeText', name);

    const passwordInput = wrapper.find('#password');
    passwordInput.simulate('ChangeText', password);

    expect(wrapper.state()).toEqual({ name, password });
  });
});
