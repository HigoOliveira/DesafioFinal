/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

/* Redux */
import { connect } from 'react-redux';

/* Presentational */
import { View, TouchableOpacity, ScrollView, Animated, Dimensions, StatusBar, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Header } from 'react-navigation';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

/* Styles */
import { colors } from 'styles';
import styles from './styles';

/* Component */
import Modal from './components/Modal';
import EventList from './components/EventList';
import DayCalendar from './components/DayCalendar';

const HEADER_MIN_HEIGHT = 44;
let HEADER_MAX_HEIGHT = 0;
let HEADER_SCROLL_DISTANCE = 0;

const WIN_HEIGHT = Dimensions.get('window').height;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const minHeight = HEADER_MAX =>
  WIN_HEIGHT - HEADER_MIN_HEIGHT - Header.HEIGHT - STATUSBAR_HEIGHT - 20;// (Header.HEIGHT + HEADER_MIN_HEIGHT + STATUSBAR_HEIGHT);

const date = datetime => moment(datetime).format('YYYY-MM-DD');

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
    currentDate: moment().format('YYYY-MM-DD'),
    semana: false,
    allowVerticalScroll: true,
  }

  componentDidMount() {
    this.props.navigation.setParams({ showModal: () => this.showModal() });
  }

  getComponentDimensions = (event) => {
    if (!HEADER_MAX_HEIGHT) {
      HEADER_MAX_HEIGHT = event.nativeEvent.layout.height;
      HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
      this.forceUpdate();
    } else {
    // if (event.nativeEvent.layout.height === HEADER_MIN_HEIGHT) {
    //   this.setState({ semana: true });
    // } else if (this.state.semana) {
    //   this.forceUpdate();
    //   console.tron.log('CHAMOU ISSO DAQUI - 84');
    // }
      const { height } = event.nativeEvent.layout;
      // console.tron.log(height);
      // if (height === HEADER_MIN_HEIGHT) {
      //   console.tron.log('Sou o mesmo tamanho do height');
      //   this.setState(() => ({ semana: true }));
      // } else {
      //   if (this.state.semana) {
      //     this.setState(() => ({ semana: false }));
      //     console.tron.log(this.state.semana);
      //   }
      //   console.tron.log('Já eu não sou');
      // }
      if (height === HEADER_MIN_HEIGHT) {
        this.setState(() => ({ semana: true }));
      } else if (this.state.semana) {
        this.setState(() => ({ semana: false }));
      }
    }
  }

  getEvents = () => this.props.events.map(
    event => ({ [date(event.datetime)]: { marked: true } }))
    .reduce((a, b) => Object.assign(a, b), {});

  changedDate = d => this.setState({ currentDate: d });

  showModal = () => {
    this.setState({ showModal: true });
  }

  swipeScrollEvent = (allowParentScroll) => {
    // if (this.state.allowVerticalScroll !== allowParentScroll) {
    // }
    this.setState({ allowVerticalScroll: allowParentScroll });
  }

  renderCalendar = () => {
    if (this.state.semana) {
      return (
        <DayCalendar
          currentDay={this.state.currentDate}
          onChangeDate={this.changedDate}
        />
      );
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
        markedDates={Object.assign(this.getEvents(), {
          [this.state.currentDate]: {
            selected: true,
            marked: this.props.events.find(event =>
              date(event.datetime) === this.state.currentDate),
            },
            })}
        onDayPress={(day) => { this.changedDate(day.dateString); }}
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
        <ScrollView
          style={styles.scrollMain}
          scrollEnabled={this.state.allowVerticalScroll}
          scrollEventThrottle={16}
          onScroll={
            Animated.event([
                { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
              ])
            }
          contentContainerStyle={
            styles.scrollContent
          }
        >
          <View style={{ marginTop: HEADER_MAX_HEIGHT, minHeight: minHeight(HEADER_MAX_HEIGHT) }}>
            <EventList
              scroll={this.swipeScrollEvent}
              currentDate={this.state.currentDate}
            />
          </View>
        </ScrollView>
        <Animated.View
          style={[styles.header, { height: headerHeight }]}
          onLayout={this.getComponentDimensions}
        >
          {this.renderCalendar()}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  events: state.event.list,
});

export default connect(mapStateToProps)(Home);
