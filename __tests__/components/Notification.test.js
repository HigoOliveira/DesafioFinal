/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import Notification from 'components/Notification';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/notification';

const mockStore = configureStore([]);

const initialStore = {
  notification: {
    text: '',
  },
};

describe('Notification', () => {
  const store = mockStore(initialStore);
  let wrapper;

  function createWrapper() {
    return shallow(
      <Notification />,
      { context: { store } },
    );
  }

  beforeEach(() => {
    wrapper = createWrapper().dive();
    sinon.spy(wrapper.instance, 'show');
    store.clearActions();
  });

  it('Call show when open props was changed to open true', () => {
    wrapper.setProps({ open: true });
    expect(wrapper.instance.show.calledOnce).toBe(true);
  });
});
