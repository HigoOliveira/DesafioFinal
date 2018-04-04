import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { colors } from 'styles';

import styles from './styles';

const Home = () => (
  <View style={styles.container}>
    <Calendar
      theme={{
        backgroundColor: colors.primaryDarker,
        calendarBackground: colors.primaryDarker,
        selectedDayBackgroundColor: colors.secondary,
        selectedDayTextColor: colors.white,
        textDisabledColor: colors.white,
        monthTextColor: colors.white,
        dayTextColor: colors.white,
        arrowColor: colors.white,
        todayTextColor: colors.white,
      }}
    />
  </View>
);

export default Home;
