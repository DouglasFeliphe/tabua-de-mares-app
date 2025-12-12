import './global.css';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Navigation from './navigation';

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation theme={theme} />;
          <Toast />
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  );
}

if (__DEV__) {
  require('./ReactotronConfig');
}
