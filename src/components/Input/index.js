import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextInputMask } from 'react-native-masked-text';

import { View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';

import styles from './styles';

export default class Input extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.input = null;
  }

  render() {
    const {
      icon,
      value,
      type,
      placeholder,
      onChangeText,
    } = this.props;
    return (
      <View style={styles.container} >
        <Icon name={icon} size={20} color={colors.white} style={styles.icon} />
        <TextInputMask
          ref={(ref) => { this.input = ref; }}
          type={type}
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={colors.white}
        />
      </View>
    );
  }
}
