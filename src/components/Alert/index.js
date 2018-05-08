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

const multipleChoices = (text, buttons) => Alert.alert(
  'Scheduler',
  text,
  buttons,
  { cancelable: false },
);

export default { alert, confirm, multipleChoices };
