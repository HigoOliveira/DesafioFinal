import Routes from './routes';
/* Types */
import { Types as UserTypes } from 'store/ducks/user';

const ActionForLoggedOut = Routes.router.getActionForPathAndParams('LoggedOut');
const ActionForLoggedIn = Routes.router.getActionForPathAndParams('LoggedIn');

const stateForLoggedOut = Routes.router.getStateForAction(ActionForLoggedOut);
const stateForLoggedIn = Routes.router.getStateForAction(ActionForLoggedIn);

// const initialState = Routes.router.getStateForAction(Routes.router.getActionForPathAndParams('LoggedOut'));
const initialState = { stateForLoggedOut, stateForLoggedIn };

// const navReducer = (state = initialState, action) => {
//   const nextState = Routes.router.getStateForAction(action, state);
//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@@redux/INIT':
      return {
        ...state,
        stateForLoggedIn: Routes.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut),
      };
    case UserTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        stateForLoggedIn: Routes.router.getStateForAction(ActionForLoggedIn, stateForLoggedOut),
      };
    default:
      return {
        ...state,
        stateForLoggedIn: Routes.router.getStateForAction(action, state.stateForLoggedIn),
        stateForLoggedOut: Routes.router.getStateForAction(action, state.stateForLoggedOut),
      };
  }
}

export default navReducer;
