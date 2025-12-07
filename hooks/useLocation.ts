import * as Location from 'expo-location';

import { useState, useEffect, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  console.log('location :', location);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    setLocation(location);
  }

  async function getStateByGeolocation(lat: number, long: number) {
    try {
      const result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: long });
      if (result) {
        const postalAddress = result[0];

        const extractedState = extractStateFromAddress(postalAddress?.formattedAddress ?? '');
        setState(extractedState);
      }
    } catch (error) {
      console.error('Error getting address from geolocation:', error);
    }
  }

  // extract state from address string, e.g., "Sitio Palmital, 265 - Palmital de Minas, Cabeceira Grande - MG, 38625-000, Brasil" -> "MG"
  function extractStateFromAddress(address: string): string {
    const parts = address.split(',');
    const ThirdToLastPart = parts[parts.length - 3].trim();
    const stateMatch = ThirdToLastPart.match(/- (\w{2})/);

    return stateMatch ? stateMatch[1].toLowerCase() : '';
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getStateByGeolocation(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  return {
    location,
    state,
  };
};
