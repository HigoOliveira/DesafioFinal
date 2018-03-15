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
  const { dispatch, nav } = props;
  const navigation = addNavigationHelpers({
    dispatch,
    state: nav,
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
});

export default connect(mapStateToProps)(ReduxNavigation);
