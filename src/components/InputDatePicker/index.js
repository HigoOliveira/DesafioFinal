import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import DatePicker from 'react-native-datepicker';

import Icon from 'react-native-vector-icons/FontAwesome';

import { colors, fonts } from 'styles';

import styles from './styles';

export default class InputDatePicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    secondary: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    value: '',
    secureTextEntry: false,
    editable: true,
    secondary: true,
  };
 
  constructor(props) {
    super(props);
    this.input = null;
  }

  render() {
    const {
      value,
      type,
      placeholder,
      onChangeText,
      secureTextEntry,
      editable,
      secondary,
    } = this.props;

    return (
      <View style={[styles.container, secondary ? { backgroundColor: colors.gallery } : null]} >
        <Icon name="calendar" size={20} color={secondary ? colors.dustyGrey : colors.white} style={styles.icon} />
        <DatePicker
          placeholder={placeholder}
          style={[styles.input, { color: secondary ? colors.dustyGrey : null }]}
          date={value}
          mode="datetime"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateInput: {
              borderWidth: 0,
              alignItems: 'flex-start',
            },
            dateText: {
              color: secondary ? colors.dustyGrey : colors.white,
              textAlign: 'left',
              fontSize: fonts.regular,
            },
            placeholderText: {
              color: secondary ? colors.dustyGrey : colors.white,
              fontSize: fonts.regular,
            },
          }}
          onDateChange={this.props.onDateChange}
        />
      </View>
    );
  }
}
console.disableYellowBox = true;
