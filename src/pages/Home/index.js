/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import { View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

/* Styles */
import { colors } from 'styles';
import styles from './styles';

/* Component */
import Modal from './components/Modal';
import EventList from './components/EventList';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      setParams: PropTypes.func,
    }).isRequired,
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'SCHEDULE',
    headerTitleStyle: styles.headerTitle,
    headerLeft: (
      <TouchableOpacity
        onPress={navigation.state.params ? navigation.state.params.showModal : null}
        style={styles.headerLeft}
      >
        <IconMaterial name="add-circle" size={24} color={colors.secondary} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate({ routeName: 'Profile' })}} style={styles.headerRight} >
        <IconAwesome name="user" size={22} color={colors.white} />
      </TouchableOpacity>
    ),
  });

  state = {
    showModal: false,
  }

  componentDidMount() {
    this.props.navigation.setParams({ showModal: () => this.showModal() });
  }

  showModal = () => {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          theme={{
            backgroundColor: colors.primaryDarker,
            calendarBackground: colors.primaryDarker,
            selectedDayBackgroundColor: colors.secondary,
            selectedDayTextColor: colors.white,
            textDisabledColor: colors.white,
            monthTextColor: colors.white,
            dayTextColor: colors.white,
            arrowColor: colors.white,
            todayTextColor: colors.white,
          }}
        />
        <Modal
          visible={this.state.showModal}
          onCloseModal={() => this.setState({ showModal: false })}
        />
        <EventList />
      </View>
    );
  }
}

export default connect()(Home);
