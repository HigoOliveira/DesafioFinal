import { StyleSheet } from 'react-native';
import { colors, fonts } from 'styles';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackOpacity,
  },
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: fonts.big,
    color: colors.darker,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: colors.light,
    borderRadius: 5,
    borderWidth: 1,
  },
  containerButton: {
    marginTop: 10,
    flexDirection: 'row',
  },
  cancelButton: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonTitle: {
    color: colors.light,
  },
});

export default styles;
