import './global.css';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <>
      <SafeAreaProvider>
        <Navigation theme={theme} />;
      </SafeAreaProvider>
    </>
  );
}

if (__DEV__) {
  require('./ReactotronConfig');
}
