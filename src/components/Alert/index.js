import { Alert } from 'react-native';

const alert = text => Alert.alert(
  'Scheduler',
  text,
  [
    { text: 'Ok' },
  ],
  { cancelable: false },
);

const confirm = (text, onConfirm = () => {}, onCancel = () => {}) => Alert.alert(
  'Scheduler',
  text,
  [
    { text: 'Ok', onPress: onConfirm },
    { text: 'Cancelar', style: 'cancel', onPress: onCancel },
  ],
  { cancelable: false },
);

export default { alert, confirm };
