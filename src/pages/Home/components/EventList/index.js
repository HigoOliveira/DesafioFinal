/* Core */
import React from 'react';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/event';

/* Presentational */
import { FlatList } from 'react-native';
import EventItem from './components/EventItem';

import styles from './styles';

const EventList = ({ events }) => (
  <FlatList
    style={styles.container}
    data={events}
    renderItem={(event) => <EventItem event={event} />}
  />
);

const mapStateToProps = state => ({
  events: state.event.list,
});

export default connect(mapStateToProps)(EventList);
