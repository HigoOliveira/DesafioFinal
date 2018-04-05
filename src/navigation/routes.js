/* Core */
import { StackNavigator } from 'react-navigation';

/* Presentational */
import { colors } from 'styles';

/* Pages */
import Start from 'pages/Start';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';

import Home from 'pages/Home';
import Profile from 'pages/Profile';

const LoggedOutStack = StackNavigator({
  Start: { screen: Start },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
}, {
  headerMode: 'none',
});

const LoggedInStack = StackNavigator({
  Home: { screen: Home },
  Profile: { screen: Profile },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary,
      borderBottom: 0,
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
    },
    headerTintColor: colors.white,
  },
});

const Routes = StackNavigator({
  LoggedOut: { screen: LoggedOutStack },
  LoggedIn: { screen: LoggedInStack },
}, {
  headerMode: 'none',
});

export default Routes;
