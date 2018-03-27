import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text } from 'react-native';

import styles from './styles';

const Button = ({ onPress, title, clean }) => (
  <TouchableOpacity
    onPress={onPress}
    style={!clean ? styles.container : styles.clean}
  >
    <Text style={[styles.title, clean ? styles.titleClean : null]}>{clean ? title : title.toUpperCase()}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  clean: PropTypes.bool,
};

Button.defaultProps = {
  clean: false,
};

export default Button;
