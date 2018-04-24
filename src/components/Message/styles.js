import { StyleSheet } from 'react-native';
import { metrics, fonts, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    marginVertical: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fonts.regular,
    textAlign: 'center',
    color: colors.dark,
  },
});

export default styles;
