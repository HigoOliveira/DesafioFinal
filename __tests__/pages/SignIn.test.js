/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import SignIn from 'pages/SignIn';
import Alert from 'components/Alert';

import Button from 'components/Button';
import Input from 'components/Input';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const initialStore = {
  user: {
    cellphone: '99999999999',
  },
};

const cellphone = '+559999999999';
const password = 'higo1234';

describe('Testing SignIn Page', () => {
  const store = mockStore(initialStore);
  let wrapper;

  function createWrapper() {
    return shallow(
      <SignIn />,
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

  it('Render 2 fields for user to fill', () => {
    expect(wrapper.find(Input)).toHaveLength(2);
  });

  it('Render at least one password', () => {
    expect(wrapper.find({ secureTextEntry: true })).toHaveLength(1);
  });

  it('Can sign in if informations is valid', () => {
    wrapper.setState({
      password,
    });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userLogin(cellphone, password));
  });

  it('Can\'t sign up if informations is valid', () => {
    sinon.spy(Alert, 'alert');
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toEqual([]);
    expect(Alert.alert.calledOnce).toBe(true);
  });
});
