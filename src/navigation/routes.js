/* Core */
//import React from 'react';
import { StackNavigator } from 'react-navigation';

/* Pages */
import Start from 'pages/Start';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';

import Home from 'pages/Home';

const LoggedOutStack = StackNavigator({
  Start: { screen: Start },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
}, {
  headerMode: 'none',
});

const LoggedInStack = StackNavigator({
  Home: { screen: Home },
}, {
  headerMode: 'none',
});

const Routes = StackNavigator({
  LoggedOut: { screen: LoggedOutStack },
  LoggedIn: { screen: LoggedInStack },
}, {
  headerMode: 'none',
});

export default Routes;
