import { StyleSheet } from 'react-native';
import { colors, metrics, fonts } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  theme: {
    backgroundColor: colors.primaryDarker,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  headerRight: {
    marginRight: metrics.padding,
  },
  headerLeft: {
    marginLeft: metrics.padding,
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
  scrollMain: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
  },
});

export default styles;
