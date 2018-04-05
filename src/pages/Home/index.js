import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

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

Home.navigationOptions = {
  title: 'SCHEDULE',
  headerTitleStyle: styles.headerTitle,
  headerLeft: (
    <TouchableOpacity onPress={() => {}} style={styles.headerLeft}>
      <IconMaterial name="add-circle" size={24} color={colors.secondary} />
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity onPress={() => {}} style={styles.headerRight} >
      <IconAwesome name="user" size={22} color={colors.white} />
    </TouchableOpacity>
  ),
};

export default Home;
