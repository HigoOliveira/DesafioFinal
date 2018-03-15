/* Core */
//import React from 'react';
import { StackNavigator } from 'react-navigation';

/* Pages */
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';

const HomeRoutes = StackNavigator({
  Home: { screen: Home },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
});

const Routes = StackNavigator({
  Init: { screen: HomeRoutes },
});

export default Routes;
