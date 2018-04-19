/* Core */
import React from 'react';

import _ from 'lodash';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import { View, Text } from 'react-native';
import EventItem from './components/EventItem';

import styles from './styles';

const EventList = ({ events, currentDate }) => {
  const eventsFiltered = _.filter(events, (n) => {
    const datetime = (n.datetime && n.datetime.split(' ')[0]) || '';
    return datetime === currentDate;
  });
  return (
    <React.Fragment>
      {
        eventsFiltered.length >= 1
        ? eventsFiltered.map(event => <EventItem key={event.name} event={event} />)
        : (
          <View style={styles.container}>
            <Text style={styles.text}>Não possui eventos para esse dia.</Text>
          </View>
        )
      }
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  events: state.event.list,
});

export default connect(mapStateToProps)(EventList);
