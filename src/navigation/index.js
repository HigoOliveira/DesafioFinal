/* Core */
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';

/* Redux */
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import Routes from './routes';

class ReduxNavigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    nav: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.array,
    }).isRequired,
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const addListener = createReduxBoundAddListener('root');
    const { dispatch, nav, isLoggedIn } = this.props;
    const state = isLoggedIn
      ? nav.stateForLoggedIn
      : nav.stateForLoggedOut;
    const navigation = addNavigationHelpers({
      dispatch,
      state,
      addListener,
    });

    return (<Routes navigation={navigation} />);
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(ReduxNavigation);
