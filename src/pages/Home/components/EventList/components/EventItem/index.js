import React from 'react';

import { View, TouchableOpacity, Text } from 'react-native';

import Swipeout from 'react-native-swipeout';

import { colors } from 'styles';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const EventItem = ({ event }) => (
  <Swipeout
    right={[
      {
        text: 'Delete',
        width: 200,
        component: (
          <View style={styles.buttonContainer} >
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.red },
              ]}
              onPress={()=>{}}
              >
              <Icon name="times" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        ),
      },
    ]}
    left={[
      {
        backgroundColor: colors.primary,
        text: 'Delete',
        width: 200,
        component: (
          <View style={styles.buttonContainer} >
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.blue },
              ]}
              onPress={()=>{}}
            >
              <Icon name="share" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        ),
      },
    ]}
    style={styles.swipeout}
  >
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.name}>{event.item.name}</Text>
        <Text style={styles.where}>{event.item.where}</Text>
      </View>
      <View>
        <Text style={styles.datetime}>9h</Text>
      </View>
    </View>
  </Swipeout>
);

export default EventItem;
