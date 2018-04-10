import React from 'react';

import { View, Text } from 'react-native';

const EventItem = ({ event }) => (
  <View>
    <Text>{event.item.name}</Text>
    <Text>{event.item.where}</Text>
  </View>
);

export default EventItem;
