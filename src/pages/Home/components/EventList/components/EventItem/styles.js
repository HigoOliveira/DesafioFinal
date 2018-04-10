import { StyleSheet } from 'react-native';
import { colors, metrics, fonts } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    padding: metrics.padding,
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
  },
  name: {
    color: colors.nimeShaft,
    fontWeight: 'bold',
    fontSize: fonts.base,
  },
  where: {
    color: colors.dustyGrey,
    fontSize: fonts.base,
  },
  datetime: {
    color: colors.dustyGrey,
    fontSize: fonts.base,
  },
});

export default styles;
