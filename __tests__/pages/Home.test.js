import React from 'react';
import { shallow } from 'enzyme';


import { Button } from 'react-native';

import Home from 'pages/Home';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const initialStore = {
  user: {},
};

describe('Testing Home Page', () => {
  const store = mockStore(initialStore);

  function createWrapper() {
    return shallow(
      <Home />,
      { context: { store } },
    );
  }
  it('Can get user information when is valid cell phone', () => {
    const wrapper = createWrapper().dive();
    wrapper.setState({ cellphone: '(99) 9999-9999' });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.userGetInformation());
  });

  it('Can\'t get user information when is invalid cell phone', () => {
    const wrapper = createWrapper().dive();
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).not.toContain(ActionCreators.userGetInformation());
  });
});
