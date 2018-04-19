/* Core */
import React from 'react';
import { shallow } from 'enzyme';

/* Presentational */
import EventList from 'pages/Home/components/EventList';

/* redux */
import configureStore from 'redux-mock-store';
import ActionCreators from 'store/ducks/user';

const mockStore = configureStore([]);

const events = [
  {
    id: 1,
    datetime: '2018-04-19 14:39',
    name: 'Fazendo os testes',
    where: 'Trabalho',
  },
  {
    id: 2,
    datetime: '2018-04-19 14:40',
    name: 'Fazendo os testes',
    where: 'Trabalho',
  },
  {
    id: 3,
    datetime: '2018-04-20 14:39',
    name: 'Teste para data diferente',
    where: 'Trabalho',
  },
];

const initialStore = {
  event: {
    list: events,
  },
};

describe('EventList', () => {
  const store = mockStore(initialStore);

  it('Renders as execpted for specific date', () => {
    const wrapper = shallow(<EventList currentDate="2018-04-19" />, { context: { store } }).dive();
    expect(wrapper.children()).toHaveLength(2);
    wrapper.setProps({ currentDate: '2018-04-20' });
    expect(wrapper.children()).toHaveLength(1);
  });

  it('Shows empty message if there aren\'t event.', () => {

  });

});