import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: colors.secondary,
    borderRadius: metrics.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clean: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fonts.big,
    fontWeight: 'bold',
  },
  titleClean: {
    fontSize: fonts.small,
  },
});

export default styles;
