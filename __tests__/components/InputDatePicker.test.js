/* Core */
import React from 'react';

/* Test */
import { shallow } from 'enzyme';
import sinon from 'sinon';

/* Presentational */
import InputDatePicker from 'components/InputDatePicker';

import DatePicker from 'react-native-datepicker';

describe('Testing input', () => {
  it('onChangeDate', () => {
    const fn = sinon.fake();

    const wrapper = shallow(<InputDatePicker
      onDateChange={fn}
    />);

    wrapper.find(DatePicker).simulate('DateChange', '2018-05-18 08:33');
    expect(fn.called).toBe(true);
    expect(fn.lastArg).toEqual('2018-05-18 08:33');
  });
});
