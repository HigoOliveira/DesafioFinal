import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  notificationSend: ['data'],
  notificationSendAlert: ['data'],
  notificationSendWarning: ['data'],
  notificationClean: null,
});

export { Types };
export default Creators;

/* Initial State */
export const INITIAL_STATE = {
  data: {
    text: '',
    time: 4000,
    type: 'info',
    open: false,
  },
};

/* Reducers */
export const notificate = (state, action) => ({
  data: {
    text: action.data.text,
    time: action.data.time || 4000,
    type: action.data.type || 'info',
    open: true,
  },
});

const changeType = (action, type) => ({ ...action, data: { ...action.data, type } });

export const notificateAlert = (state, action) => notificate(state, changeType(action, 'alert'));
export const notificateWarning = (state, action) => notificate(state, changeType(action, 'warning'));

export const clean = () => INITIAL_STATE;

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_SEND]: notificate,
  [Types.NOTIFICATION_SEND_ALERT]: notificateAlert,
  [Types.NOTIFICATION_SEND_WARNING]: notificateWarning,
  [Types.NOTIFICATION_CLEAN]: clean,
});
