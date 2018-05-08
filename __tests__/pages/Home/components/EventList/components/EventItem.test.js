import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { TouchableOpacity, View } from 'react-native';
import Swipeout from 'react-native-swipeout';

import EventItem from 'pages/Home/components/EventList/components/EventItem';

const event = {
  id: 1,
  datetime: '2018-04-19 14:39',
  name: 'Fazendo os testes',
  where: 'Trabalho',
};

describe('Testing Event Item', () => {
  it('Delete event', () => {
    const deleteEventSpy = sinon.spy();

    const wrapper = shallow(<EventItem event={event} onDelete={deleteEventSpy} />);
    console.log(wrapper.find(Swipeout));
    wrapper.find('#delete').simulate('press');
    expect(deleteEventSpy.withArgspost(event.id).calledOnce).toBe(true);
  });
});
