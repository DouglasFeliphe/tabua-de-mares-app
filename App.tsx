import './global.css';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme, View, Text } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

import * as Location from 'expo-location';

import 'react-native-gesture-handler';

import Navigation from './navigation';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  console.log('location :', location);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{text}</Text>
      <Text>{location?.coords.latitude}</Text>
      <Text>{location?.coords.longitude}</Text>
    </View>
  );
  // return <Navigation theme={theme} />;
}
