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
import { TouchableOpacity } from 'react-native';

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
const datetime = '2019-04-19 16:35';

describe('Modal', () => {
  const store = mockStore(initialStore);
  let wrapper;
  let alert;
  let onCloseModal;

  function createWrapper() {
    onCloseModal = jest.fn();
    return shallow(
      <Modal onCloseModal={onCloseModal} visible />,
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

  it('Can add event when every fields is fill and close modal', () => {
    wrapper.setState({
      datetime,
      name,
      where,
    });
    wrapper.find(Button).simulate('press');
    const { id } = store.getActions()[0];
    expect(store.getActions())
      .toContainEqual(ActionCreators.eventAddNew(id, datetime, name, where));
    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('Clean the fields when cancel', () => {
    wrapper.setState({
      datetime,
      name,
      where,
    });
    wrapper.find(TouchableOpacity).simulate('press');
    expect(wrapper.state()).toEqual({ datetime: '', name: '', where: '' });
    expect(onCloseModal).toHaveBeenCalledTimes(1);
  });

  it('Date and text changed', () => {
    const dateInput = wrapper.find(InputDatePicker);
    dateInput.simulate('DateChange', datetime);

    const nameInput = wrapper.find('#name');
    nameInput.simulate('ChangeText', name);

    const whereInput = wrapper.find('#where');
    whereInput.simulate('ChangeText', where);
    expect(wrapper.state()).toEqual({ datetime, name, where });
  });
});
