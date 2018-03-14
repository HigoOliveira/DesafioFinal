/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import { Button, TextInput } from 'react-native';

import SignUp from 'pages/SignUp';
import Alert from 'components/Alert';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const initialStore = {
  user: {},
};

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
    store.clearActions();
  });

  it('Render 3 fields for user to fill', () => {
    expect(wrapper.find(TextInput)).toHaveLength(3);
  });

  it('Render at least one password', () => {
    expect(wrapper.find({ secureTextEntry: true })).toHaveLength(1);
  });

  it('Can sign up if informations is valid', () => {
    wrapper.setState({
      cellphone: '(99) 9999-9999',
      fullname: 'Higo de Oliveira Ribeiro',
      password: 'higo1234',
    });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userSignUp());
  });

  it('Can\'t sign up if informations is valid', () => {
    sinon.spy(Alert, 'alert');
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).not.toContainEqual(ActionCreators.userSignUp());
    expect(Alert.alert.calledOnce).toBe(true);
  });
});
