import Routes from './routes';

const initialState = Routes.router.getStateForAction(Routes.router.getActionForPathAndParams('LoggedOut'));

const navReducer = (state = initialState, action) => {
  const nextState = Routes.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
