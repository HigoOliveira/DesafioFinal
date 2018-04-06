import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    backgroundColor: colors.primaryDarker,
    borderRadius: metrics.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.inputTextPaddingHorizontal,
    marginBottom: metrics.inputTextMarginBottom,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: fonts.regular,
    color: colors.white,
    fontFamily: 'Helvetica',
    lineHeight: 18,
    marginBottom: 0,
    padding: 0,
    borderWidth: 0,
    textAlign: 'left',
  },
});

export default styles;
