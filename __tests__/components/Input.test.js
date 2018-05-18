/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/* Presentational */
import Input from 'components/Input';
import { TextInput } from 'react-native';

import { TextInputMask } from 'react-native-masked-text';

import Icon from 'react-native-vector-icons/FontAwesome';

describe('Testing input', () => {
  it('onChangeText', () => {
    const fn = sinon.fake();

    const wrapper = shallow(<Input
      onChangeText={fn}
      type="none"
    />);

    wrapper.find(TextInput).simulate('ChangeText', 'resultado');
    expect(fn.called).toBe(true);
    expect(fn.lastArg).toEqual('resultado');
  });

  it('Icon found when icon args is to passed', () => {
    const wrapper = shallow(<Input
      type="none"
      icon="phone"
    />);
    const icon = wrapper.find(Icon);
    expect(icon.length).toEqual(1);
  });

  it('TextInputMask found when type is defined', () => {
    const wrapper = shallow(<Input
      type="cel-phone"
    />);

    expect(wrapper.find(TextInputMask).length).toEqual(1);
    expect(wrapper.find(TextInput).length).toEqual(0);
  });
});
