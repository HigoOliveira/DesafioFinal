import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Button = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.container}
  >
    <Text style={styles.title}>{title.toUpperCase()}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
