/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import { View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

/* Styles */
import { colors } from 'styles';
import styles from './styles';

class Home extends Component {
  static propTypes = {
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'SCHEDULE',
    headerTitleStyle: styles.headerTitle,
    headerLeft: (
      <TouchableOpacity onPress={() => {}} style={styles.headerLeft}>
        <IconMaterial name="add-circle" size={24} color={colors.secondary} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate({ routeName: 'Profile' })}} style={styles.headerRight} >
        <IconAwesome name="user" size={22} color={colors.white} />
      </TouchableOpacity>
    ),
  });
  render() {
    return (
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
  }
}

export default connect()(Home);
