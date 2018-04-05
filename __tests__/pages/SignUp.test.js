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

const mockStore = configureStore([]);

const initialStore = {
  user: {
    cellphone: '9999999999',
  },
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
    wrapper.setProps({
      cellphone: '(99) 9999-9999',
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
      fullname: 'Higo de Oliveira Ribeiro',
      password: 'higo1234',
    });
    wrapper.find('#signup').simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userSignUp());
  });

  it('Can\'t sign up if informations is valid', () => {
    sinon.spy(Alert, 'alert');
    wrapper.find('#signup').simulate('press');
    expect(store.getActions()).toEqual([]);
    expect(Alert.alert.calledOnce).toBe(true);
  });
});
