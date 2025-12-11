import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View } from 'react-native';

import { useLocation } from 'hooks/useLocation';
import { useGetMareGrafosQuery } from 'queries/useGetMaregrafos';
import React, { useEffect, useMemo, useState } from 'react';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetRef } from '@ahmetaltai/react-native-bottom-sheet';
import { BottomSheetComponent } from 'components/BottomSheet';
import { SelectDropdown } from 'components/SelectDropdown';
import colors from 'tailwindcss/colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Overview() {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const { location, state } = useLocation();

  const BottomSheetRef = React.useRef<BottomSheetRef>({} as BottomSheetRef);

  const openBottomSheet = () => {
    BottomSheetRef.current?.open();
  };

  const [region, setRegion] = useState({
    latitude: location ? location.coords.latitude : -15.7826,
    longitude: location ? location.coords.longitude : -47.9354,
    latitudeDelta: 35,
    longitudeDelta: 35,
  });

  const { data: mareGrafosData, isLoading, isError } = useGetMareGrafosQuery({});

  console.log('maregrafosData :', JSON.stringify(mareGrafosData, null, 2));

  function handlePressMap(event: MapPressEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  }

  function handlePressMarker() {
    openBottomSheet();
  }

  function handleSelectMareGrafo(nomeMareGrafo: string) {
    const mareGrafo = mareGrafosData?.find((m) => m.nomeMaregrafo === nomeMareGrafo);

    if (mareGrafo) {
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: mareGrafo.lat,
        longitude: mareGrafo.lon,
      }));
    }
  }

  useEffect(() => {
    if (isError) {
      Alert.alert('Erro', 'Não foi possível carregar maré, tente mais tarde.');
    }
  }, [isError]);

  const mappedData = useMemo(() => {
    return (
      mareGrafosData?.map((mareGrafo) => ({
        key: mareGrafo.siglaMaregrafo,
        value: mareGrafo.nomeMaregrafo,
      })) ?? []
    );
  }, [mareGrafosData]);

  if (isLoading) {
    return (
      <SafeAreaView>
        <View className="mt-10 flex-1 items-center justify-center space-x-8 text-center">
          <Text>Carregando dados de tábua de marés para o estado {state}...</Text>
          <ActivityIndicator size="large" color={colors.indigo[500]} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
        <SelectDropdown
          data={mappedData}
          searchPlaceholder="Buscar..."
          placeholder="Selecione um porto"
          setSelected={handleSelectMareGrafo}
        />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -15.7826,
            longitude: -47.9354,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
          region={region}
          onPress={handlePressMap}>
          {mareGrafosData?.map((mareGrafo) => (
            <Marker
              key={mareGrafo.siglaMaregrafo}
              coordinate={{
                latitude: mareGrafo.lat,
                longitude: mareGrafo.lon,
              }}
              pinColor={colors.indigo[500]}
              onPress={handlePressMarker}
            />
          ))}
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Você está aqui"
          />
        </MapView>

        <BottomSheetComponent ref={BottomSheetRef} />
      </SafeAreaView>
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },

  map: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // width: '100%',
    // height: '100%',
  },
});
