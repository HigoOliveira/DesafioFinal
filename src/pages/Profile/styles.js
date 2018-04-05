import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  mainContainer: {
    paddingHorizontal: metrics.padding,
  },
  theme: {
    backgroundColor: colors.primaryDarker,
  },
  headerRight: {
    marginRight: metrics.padding,
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: fonts.extreme,
    lineHeight: 24,
    marginTop: 5,
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  panel: {
    height: 82,
    backgroundColor: colors.primaryDarker,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.margin,
  },
  panelText: {
    color: colors.white,
    fontSize: fonts.bigger,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: colors.primaryDarker,
    marginBottom: 10,
  },
});

export default styles;
