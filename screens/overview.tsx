import { useNavigation } from '@react-navigation/native';
import { ScreenContent } from 'components/ScreenContent';

import { StyleSheet, View, Text } from 'react-native';

import { Button } from '../components/Button';
import { useLocation } from 'hooks/useLocation';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { getTabuaMareByGeolocation } from 'services/getTabuaMareByGeolocation.service';

export default function Overview() {
  const navigation = useNavigation();

  const { location, state } = useLocation();

  const [tabuaMareData, setTabuaMareData] = useState();
  console.log('tabuaMareData :', tabuaMareData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTabuaMareData = async (lat: number, lng: number, state: string) => {
    setIsLoading(true);
    try {
      const data = await getTabuaMareByGeolocation(lat, lng, state);
      setTabuaMareData(data);
    } catch (error) {
      console.error('Error fetching Tabua Mare data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location && state) {
      fetchTabuaMareData(location.coords.latitude, location.coords.longitude, state ?? '');
    }
  }, [location, state]);

  return (
      <MapView
        initialRegion={{
          latitude: location ? location.coords.latitude : -15.7826,
          longitude: location ? location.coords.longitude : -47.9354,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: location?.coords.latitude ?? -15.7826,
            longitude: location?.coords.longitude ?? -47.9354,
          }}
          title="My Location"
          description="A cool place"
        />
      </MapView>
      <Button
        onPress={() =>
          navigation.navigate('Details', {
            name: 'Dan',
          })
        }
        title="Show Details"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
