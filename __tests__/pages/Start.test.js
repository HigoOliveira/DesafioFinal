/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import Button from 'components/Button';
import Input from 'components/Input';

import Start from 'pages/Start';
import Alert from 'components/Alert';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const initialStore = {
  user: {
    loading: false,
  },
};

const cellphone = '9999999999';

describe('Testing Start Page', () => {
  const store = mockStore(initialStore);
  let wrapper;

  function createWrapper() {
    return shallow(
      <Start />,
      { context: { store } },
    );
  }

  beforeEach(() => {
    wrapper = createWrapper().dive();
    // Injeta o input que vem do maskedinput. Vem atráves do ref.
    wrapper.instance().input = {
      input: {
        isValid: jest.fn().mockImplementation(() => wrapper.state('cellphone') === cellphone),
        getRawValue: jest.fn().mockImplementation(() => cellphone),
      },
    };

    store.clearActions();
  });

  it('Can get user information when is valid cell phone', () => {
    wrapper.setState({ cellphone });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userGetInformation(`+55${cellphone}`));
  });

  it('Can\'t get user information when is invalid cell phone', () => {
    sinon.spy(Alert, 'alert');
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).not.toContainEqual(ActionCreators.userGetInformation(''));
    expect(Alert.alert.calledOnce).toBe(true);
  });

  it('MaskedText changed state', () => {
    const nameInput = wrapper.find(Input);
    nameInput.simulate('ChangeText', cellphone);
    expect(wrapper.state()).toEqual({ cellphone });
  });
});
