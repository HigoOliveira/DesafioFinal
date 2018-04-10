/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * Presentational
 */
import Modal from 'pages/Home/components/Modal';
import Alert from 'components/Alert';
import Button from 'components/Button';
import Input from 'components/Input';
import InputDatePicker from 'components/InputDatePicker';

/* Redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/event';

const mockStore = configureStore([]);

const initialStore = {
  user: {
  },
};

const name = 'Aprendendo GoNative';
const where = 'Viçosa, Minas Gerais';
const datetime = new Date();

describe('Modal', () => {
  const store = mockStore(initialStore);
  let wrapper;
  let alert;

  function createWrapper() {
    const onCloseModal = jest.fn();
    return shallow(
      <Modal onCloseModal={onCloseModal} />,
      { context: { store } },
    );
  }

  function sameTestToCantAdd() {
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toEqual([]);
    expect(Alert.alert.calledOnce).toBe(true);
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
    expect(wrapper.find(Input)).toHaveLength(2);
    expect(wrapper.find(InputDatePicker)).toHaveLength(1);
  });

  it('Can\'t add event when anything is blank', () => {
    sameTestToCantAdd();
  });

  it('Can\'t add event when only datetime is blank', () => {
    wrapper.setState({
      name,
      where,
    });
    sameTestToCantAdd();
  });

  it('Can\'t add event when only name is blank', () => {
    wrapper.setState({
      datetime,
      where,
    });
    sameTestToCantAdd();
  });

  it('Can\'t add event when only where is blank', () => {
    wrapper.setState({
      datetime,
      name,
    });
    sameTestToCantAdd();
  });

  it('Can add event when every fields is fill', () => {
    wrapper.setState({
      datetime,
      name,
      where,
    });
    wrapper.find(Button).simulate('press');
    expect(store.getActions()).toContainEqual(ActionCreators.eventAddNew(datetime, name, where));
  });

});
