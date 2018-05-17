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
    data: {
      text: '',
    },
  },
};

