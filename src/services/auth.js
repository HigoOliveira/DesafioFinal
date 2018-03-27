import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = '@DesafioFinal:token';

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return (token !== null);
};
