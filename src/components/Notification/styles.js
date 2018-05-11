import { StyleSheet } from 'react-native';
import { fonts, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.blue,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: fonts.regular,
    textAlign: 'center',
    color: colors.white,
  },
  button: {
    position: 'absolute',
    right: 20,
  },
});

export default styles;
