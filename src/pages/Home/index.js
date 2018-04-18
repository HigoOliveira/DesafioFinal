/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import { View, TouchableOpacity, ScrollView, Animated, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

/* Styles */
import { colors } from 'styles';
import styles from './styles';

/* Component */
import Modal from './components/Modal';
import EventList from './components/EventList';
import DayCalendar from './components/DayCalendar';

const HEADER_MIN_HEIGHT = 45;
let HEADER_MAX_HEIGHT = 0;
let HEADER_SCROLL_DISTANCE = 0;

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
      <TouchableOpacity onPress={() => { navigation.navigate({ routeName: 'Profile' }); }} style={styles.headerRight} >
        <IconAwesome name="user" size={22} color={colors.white} />
      </TouchableOpacity>
    ),
  });
  state = {
    showModal: false,
    scrollY: new Animated.Value(0),
  }

  componentDidMount() {
    this.props.navigation.setParams({ showModal: () => this.showModal() });
  }

  showModal = () => {
    this.setState({ showModal: true });
  }

  _getComponentDimensions = (event) => {
    if (!HEADER_MAX_HEIGHT) {
      HEADER_MAX_HEIGHT = event.nativeEvent.layout.height;
      HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
      this.forceUpdate();
    }
    if (event.nativeEvent.layout.height ===  HEADER_MIN_HEIGHT) {
      this.setState({ semana: true });
    } else {
      this.setState({ semana: false });
    }
  }

  renderCalendar = () => {
    if (this.state.semana) {
      return <DayCalendar />;
    }
    return (
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
    );
  }

  render() {
    let headerHeight;
    if (!HEADER_MAX_HEIGHT) {
      headerHeight = 'auto';
    } else {
      headerHeight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      });
    }


    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showModal}
          onCloseModal={() => this.setState({ showModal: false })}
        />
        {/* <EventList /> */}
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
        >
          <View style={{ marginTop: HEADER_MAX_HEIGHT }}>
            <EventList />
          </View>
        </ScrollView>
        <Animated.View style={[styles1.header, { height: headerHeight }]} onLayout={event => this._getComponentDimensions(event)}>
          {this.renderCalendar()}
        </Animated.View>
      </View>
    );
  }
}

const styles1 = {
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
};

export default connect()(Home);
