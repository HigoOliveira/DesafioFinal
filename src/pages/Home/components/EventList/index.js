/* Core */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* Redux */
import { connect } from 'react-redux';
import ActionCreators from 'store/ducks/event';

/* Presentational */
import { View, Text } from 'react-native';
import Alert from 'components/Alert';

import EventItem from './components/EventItem';

import styles from './styles';

const EventList = ({
  events,
  currentDate,
  deleteEventLocal,
  deleteEventRemote,
  scroll,
}) => {
  const eventsFiltered = events(currentDate);
  return (
    <React.Fragment>
      {
        eventsFiltered.length >= 1
        ? eventsFiltered.map(event =>
          (<EventItem
            key={event.id}
            event={event}
            scroll={scroll}
            onDelete={() =>
              Alert.multipleChoices('Escolha uma opção para exlcuir', [
                { text: 'Local', onPress: () => deleteEventLocal(event.id) },
                { text: 'Todos lugares', onPress: () => deleteEventRemote(event.id) },
                { text: 'Cancelar', style: 'cancel' },
              ])
            }
          />))
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
  events: currentDate => state.event.list.filter(event =>
    moment(event.datetime).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD')),
});

const mapDispatchToProps = dispatch => ({
  deleteEventLocal: id => dispatch(ActionCreators.eventDeleteLocal(id)),
  deleteEventRemote: id => dispatch(ActionCreators.eventDeleteRemote(id)),
});

EventList.propTypes = {
  events: PropTypes.arrayOf(EventItem.propTypes.event).isRequired,
  currentDate: PropTypes.string.isRequired,
  deleteEventLocal: PropTypes.func.isRequired,
  deleteEventRemote: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
