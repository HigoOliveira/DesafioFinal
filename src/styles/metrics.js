import { Platform } from 'react-native';

export default {
  padding: 20,
  margin: 20,
  radius: 5,
  statusBarHeight: (Platform.OS === 'ios') ? 20 : 0,
  inputTextPaddingHorizontal: 20,
  inputTextMarginBottom: 15,
};
