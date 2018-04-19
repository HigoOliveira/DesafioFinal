import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextInputMask } from 'react-native-masked-text';

import { View, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';

import styles from './styles';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    secondary: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    value: '',
    icon: '',
    secureTextEntry: false,
    editable: true,
    secondary: false,
    onChangeText: (text) => {},
  };

  constructor(props) {
    super(props);
    this.input = null;
  }

  renderIcon = () => {
    const {
      icon,
      secondary,
    } = this.props;

    return icon !== ''
      ? (
        <Icon
          name={icon}
          size={20}
          color={secondary ? colors.dustyGrey : colors.white}
          style={styles.icon}
        />
      )
      : null;
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

    const InputText = type === 'none' ? TextInput : TextInputMask;

    return (
      <View style={[styles.container, secondary ? { backgroundColor: colors.gallery } : null]} >
        {this.renderIcon()}
        <InputText
          ref={(ref) => { this.input = ref; }}
          type={type}
          style={[styles.input, secondary ? { color: colors.dustyGrey } : null]}
          underlineColorAndroid="rgba(0,0,0,0)"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={secondary ? colors.dustyGrey : colors.white}
          editable={editable}
        />
      </View>
    );
  }
}
console.disableYellowBox = true;
