import { StyleSheet } from 'react-native';
import { colors, metrics, fonts } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.radius,
    padding: metrics.padding,
    marginHorizontal: metrics.margin,
    marginVertical: 10,
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
  swipeout: {
    backgroundColor: colors.transparent,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  button: {
    height: 78,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: metrics.radius,
  },
});

export default styles;
