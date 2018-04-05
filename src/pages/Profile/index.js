/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View } from 'react-native';

/* Styles */
import styles from './styles';

class Profile extends Component {
  static navigationOptions = {
    title: 'SCHEDULE',
    headerTitleStyle: styles.headerTitle,
    headerRight: (
      <View />
    ),
  };
  render() {
    return (
      <View style={styles.container} />
    );
  }
}

export default Profile;
