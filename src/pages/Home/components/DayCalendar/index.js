/* Core */
import React, { Component } from 'react';

import moment from 'moment';

/* Presentational */
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';

import styles from './styles';

class DayCalendar extends Component {
  constructor(props) {
    super(props);
    console.tron.log(props);
    this.state = {
      day: props.currentDay && moment(props.currentDay) || moment(),
    };
  }

  pressRight = () => {
    this.state.day.add(1, 'days');
    this.forceUpdate();
  }

  pressLeft = () => {
    this.state.day.subtract(1, 'days');
    this.forceUpdate();
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.pressLeft}
        >
          <Icon name="caret-left" color={colors.white} size={16} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.day.format('dddd, D [de] MMM')}</Text>
        <TouchableOpacity
          onPress={this.pressRight}
        >
          <Icon name="caret-right" color={colors.white} size={16} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default DayCalendar;
