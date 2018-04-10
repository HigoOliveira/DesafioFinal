import React from 'react';

import { View, Text } from 'react-native';

import styles from './styles';

const EventItem = ({ event }) => (
  <View style={styles.container}>
    <View style={styles.mainContainer}>
      <Text style={styles.name}>{event.item.name}</Text>
      <Text style={styles.where}>{event.item.where}</Text>
    </View>
    <View>
      <Text style={styles.datetime}>9h</Text>
    </View>
  </View>
);

export default EventItem;
