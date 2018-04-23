/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Time Operations */
import moment from 'moment';

/* Presentational */
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';

import styles from './styles';

class DayCalendar extends Component {
  static propTypes = {
    currentDay: PropTypes.string.isRequired,
    onChangeDate: PropTypes.func,
  }

  static defaultProps = {
    onChangeDate: (date) => {},
  }

  constructor(props) {
    super(props);
    console.tron.log(props);
    this.state = {
      day: (props.currentDay && moment(props.currentDay)) || moment(),
    };
  }


  pressRight = () => {
    this.state.day.add(1, 'days');
    this.props.onChangeDate(this.state.day.format('YYYY-MM-DD'));
    this.forceUpdate();
  }

  pressLeft = () => {
    this.state.day.subtract(1, 'days');
    this.forceUpdate();
    this.props.onChangeDate(this.state.day.format('YYYY-MM-DD'));
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
