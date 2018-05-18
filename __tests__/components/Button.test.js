/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/* Presentational */
import { ActivityIndicator, Text } from 'react-native';
import Button from 'components/Button';

describe('Testing button', () => {
  it('Testing onPress', () => {
    const fn = sinon.fake();

    const wrapper = shallow(<Button
      title="Button teste"
      onPress={fn}
    />);

    wrapper.simulate('press');
    expect(fn.called).toBe(true);
  });

  it('Shows loading', () => {
    const wrapper = shallow(<Button
      title="Button teste"
      onPress={() => {}}
      loading
    />);

    expect(wrapper.find(ActivityIndicator).length).toEqual(1);
    expect(wrapper.find(Text).length).toEqual(0);
  });
});
