import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const Button = ({
  onPress,
  title,
  clean,
  loading,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={!clean ? styles.container : styles.clean}
  >
    { loading
      ? <ActivityIndicator size="small" />
      : (
        <Text style={[styles.title, clean ? styles.titleClean : null]}>
          {clean ? title : title.toUpperCase()}
        </Text>
      )
    }
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  clean: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  clean: false,
  loading: false,
};

export default Button;
