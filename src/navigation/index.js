/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import Routes from './routes';

function ReduxNavigation(props) {
  const addListener = createReduxBoundAddListener('root');
  const { dispatch, nav, isLoggedIn } = props;
  const state = isLoggedIn
    ? nav.stateForLoggedIn
    : nav.stateForLoggedOut;
  const navigation = addNavigationHelpers({
    dispatch,
    state,
    addListener,
  });

  const Navigator = <Routes navigation={navigation} />;

  Navigator.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.shape({
      index: PropTypes.number,
      routes: PropTypes.array,
    }).isRequired,
  };

  return Navigator;
}
const mapStateToProps = state => ({
  nav: state.nav,
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(ReduxNavigation);
