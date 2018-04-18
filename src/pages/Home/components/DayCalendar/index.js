import React from 'react';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';

import styles from './styles';

const DayCalendar = () => (
  <View style={styles.container}>
    <Icon name="caret-left" color={colors.white} size={16} style={styles.arrow} />
    <Text style={styles.text}>Segunda, 8 de Fev</Text>
    <Icon name="caret-right" color={colors.white} size={16} style={styles.arrow} />
  </View>
);

export default DayCalendar;
