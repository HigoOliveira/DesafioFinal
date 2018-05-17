/* Core */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* Presentational */
import { View, TouchableOpacity, Text, Share } from 'react-native';

import Swipeout from 'react-native-swipeout';

import Icon from 'react-native-vector-icons/FontAwesome';

import { colors } from 'styles';
import styles from './styles';

const EventItem = ({ event, onDelete, scroll }) => (
  <Swipeout
    autoClose
    scroll={scroll}
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
              onPress={onDelete}
              id="delete"
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
        text: 'Share',
        width: 200,
        component: (
          <View style={styles.buttonContainer} >
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.blue },
              ]}
              onPress={() => {
                try {
                  Share.share({
                    title: 'Schedule',
                    message: `evento: ${event.name}\n local: ${event.where}\n data: ${moment(event.datetime).format('DD/MM/YYYY [as] HH[h] mm[m]')}`,
                  });
                } catch (err) {
                  // Err;
                }
              }}
              id="share"
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
        <Text style={styles.name}>{event.name}</Text>
        <Text style={styles.where}>{event.where}</Text>
      </View>
      <View>
        <Text style={styles.datetime}>{moment(event.datetime).format('HH[h] mm[m]')}</Text>
      </View>
    </View>
  </Swipeout>
);

EventItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    where: PropTypes.string,
    datetime: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventItem;
