/* Core */
import React from 'react';

import _ from 'lodash';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import EventItem from './components/EventItem';

// import styles from './styles';

const EventList = ({ events, currentDate }) => (
  <React.Fragment>
    {_.filter(events, (n) => {
      const datetime = (n.datetime && n.datetime.split(' ')[0]) || '';
      return datetime === currentDate;
    }).map(event => <EventItem event={event} />)}
  </React.Fragment>
);

const mapStateToProps = state => ({
  events: state.event.list,
});

export default connect(mapStateToProps)(EventList);
