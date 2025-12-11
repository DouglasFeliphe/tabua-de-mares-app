import { useNavigation } from '@react-navigation/native';

import { Alert, Dimensions, StyleSheet, Text, View, Animated } from 'react-native';

import { useLocation } from 'hooks/useLocation';
import { useEffect, useState } from 'react';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { EvilIcons } from '@expo/vector-icons';
import { useGetMaregrafosQuery } from 'queries/useGetMaregrafos';

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

export default function Overview() {
  const navigation = useNavigation();

  const { location, state } = useLocation();

  const [region, setRegion] = useState({
    latitude: location ? location.coords.latitude : -15.7826,
    longitude: location ? location.coords.longitude : -47.9354,
    latitudeDelta: 35,
    longitudeDelta: 35,
  });

  const { data: maregrafosData, isLoading, isError } = useGetMaregrafosQuery({});

  console.log('maregrafosData :', maregrafosData);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  useEffect(() => {
    if (isError) {
      Alert.alert('Erro', 'Não foi possível carregar maré, tente mais tarde.');
    }
  }, [isError]);

  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <SafeAreaView>
        <View className="mt-10 flex-1 items-center justify-center space-x-8 text-center">
          <Text>Carregando dados de tábua de marés para o estado {state}...</Text>
          <EvilIcons name="spinner" size={24} color="black" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, { paddingBottom: insets.bottom }]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7826,
          longitude: -47.9354,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        region={region}
        onPress={handleMapPress}>
        {maregrafosData?.map((maregrafo) => (
          <Marker
            key={maregrafo.siglaMaregrafo}
            coordinate={{
              latitude: maregrafo.lat,
              longitude: maregrafo.lon,
            }}
            pinColor="#38e0fa"
            title={maregrafo.nomeMaregrafo}
            description={maregrafo.local}
          />
        ))}
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="My Location"
          description="A cool place"
        />
      </MapView>
      {/* </ScreenContent> */}
      <Button
        isLoading={isLoading}
        className="mt-4"
        onPress={() =>
          navigation.navigate('Details', {
            name: 'Dan',
          })
        }
        title="Show Details"
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    // paddingBottom: insets.bottom,
    // padding: 24,
    // borderWidth: 2,
  },

  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
