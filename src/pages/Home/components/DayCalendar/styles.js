import { StyleSheet } from 'react-native';
import { metrics, colors, fonts } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
    backgroundColor: colors.primaryDarker,
  },
  arrow: {
    padding: 10,
  },
  text: {
    fontSize: fonts.big,
    color: colors.white,
  },
});

export default styles;
