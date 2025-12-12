import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';

import { BottomSheetRef } from '@ahmetaltai/react-native-bottom-sheet';
import { Feather, Ionicons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { BottomSheetComponent } from 'components/BottomSheet';
import { Button } from 'components/Button';
import { SelectDropdown } from 'components/SelectDropdown';
import { TideChart } from 'components/TideChart';
import { useLocation } from 'hooks/useLocation';
import { useGetMareGrafosQuery } from 'queries/useGetMaregrafos';
import { useGetPrevisionQuery } from 'queries/useGetPrevision';
import React, { useEffect, useMemo, useState } from 'react';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMareGrafosResponse } from 'services/getMaregrafos.service';
import colors from 'tailwindcss/colors';

import { formatDateWithTimeZone } from 'helpers/formatDate';
import { formatDateForGraphLabel } from 'helpers/formatDateForGraphLabel';
import Toast from 'react-native-toast-message';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const INITIAL_REGION = {
  latitude: -15.7826,
  longitude: -47.9354,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

const PREVISION_INTERVAL_IN_HOURS = 3; // prevision of hours from now

export default function Overview() {
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const { location, state } = useLocation();

  const bottomSheetRef = React.useRef<BottomSheetRef>({} as BottomSheetRef);

  const { data: mareGrafosData, isLoading, isError } = useGetMareGrafosQuery({});

  const [selectedMareGrafo, setSelectedMareGrafo] = useState<getMareGrafosResponse | null>(null);

  const dateWithHoursAhead = new Date(
    new Date().getTime() + PREVISION_INTERVAL_IN_HOURS * 60 * 60 * 1000
  );

  const {
    data: previsionData,
    isLoading: isPrevisionLoading,
    error: errorPrevision,
    isError: isPrevisionError,
  } = useGetPrevisionQuery({
    siglaMaregrafo: selectedMareGrafo?.siglaMaregrafo ?? '',
    momentoInicial: formatDateWithTimeZone(),
    momentoFinal: formatDateWithTimeZone(dateWithHoursAhead),
  });

  const [region, setRegion] = useState({
    latitude: location ? location.coords.latitude : -15.7826,
    longitude: location ? location.coords.longitude : -47.9354,
    latitudeDelta: 35,
    longitudeDelta: 35,
  });

  const openBottomSheet = () => bottomSheetRef.current?.open();
  // const closeBottomSheet = () => bottomSheetRef.current?.close();

  function handlePressMap(event: MapPressEvent) {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  }

  function handlePressMarker(mareGrafo: getMareGrafosResponse) {
    setSelectedMareGrafo(mareGrafo);
    openBottomSheet();
  }

  function handleSelectMareGrafo(nomeMareGrafo: string) {
    const mareGrafo = mareGrafosData?.find((m) => m.nomeMaregrafo === nomeMareGrafo);

    setSelectedMareGrafo(mareGrafo ?? null);

    if (mareGrafo) {
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: mareGrafo.lat,
        longitude: mareGrafo.lon,
      }));
    }
  }

  // useEffect(() => {
  //   if (isError) {
  //     Alert.alert('Erro', 'Não foi possível carregar maré, tente mais tarde.');
  //   }
  // }, [isError]);

  useEffect(() => {
    if (isAxiosError(errorPrevision) && errorPrevision.response) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar informações de previsão',
        text2: errorPrevision.response.data.message,
      });
    }
  }, [errorPrevision]);
  console.log('errorPrevision :', errorPrevision);

  const mappedData = useMemo(
    () =>
      mareGrafosData?.map((mareGrafo) => ({
        key: mareGrafo.siglaMaregrafo,
        value: mareGrafo.nomeMaregrafo,
      })) ?? [],
    [mareGrafosData]
  );

  const mappedDataForGraph = useMemo(
    () =>
      previsionData?.map((item) => ({
        value: item.previsao,
        label: formatDateForGraphLabel(item.dtHrPrevisao),
      })) ?? [],
    [previsionData]
  );

  //create a function to get the tide now, filtering by hour and minutes now
  function getTidesNow() {
    const dateNow = formatDateWithTimeZone(new Date());
    console.log('dateNow :', dateNow);

    const filteredTidesNow = previsionData?.filter((data) => data.dtHrPrevisao > dateNow);
    console.log('filteredData :', filteredTidesNow);
    return filteredTidesNow;
  }
  // const tideNow = previsionData?.map((item) => item.previsao)[0].toFixed(1);
  const tidesNow = getTidesNow();
  const tideNow = tidesNow?.[0];

  console.log('tideNow :', tideNow);

  const tideTrend = tidesNow?.map((item) =>
    item.previsao > Number(tideNow?.previsao) ? 1 : -1
  )[0];

  const renderTideTrend = () => {
    if (!tideTrend) return;
    console.log('tideTrend :', tideTrend);

    if (tideTrend > 0) {
      return 'Subindo';
    }
    if (tideTrend < 0) {
      return 'Descendo';
    }
    return 'Estável';
  };

  console.log('tideTrend :', tideTrend);

  const nextHighTide = tidesNow?.sort((a, b) => b.previsao - a.previsao)[0];

  const nextLowTide = tidesNow?.sort((a, b) => a.previsao - b.previsao)[0];

  const renderTideHeightText = () => {
    if (!nextLowTide) return;

    const tideHeight = nextLowTide?.previsao;

    if (tideHeight < 0) {
      return 'Baixa';
    } else if (tideHeight > 1) {
      return 'Alta';
    } else {
      return 'Normal';
    }
  };

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
          initialRegion={INITIAL_REGION}
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
              onPress={() => handlePressMarker(mareGrafo)}
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

        <BottomSheetComponent ref={bottomSheetRef}>
          <View>
            <Text className="text-xl font-bold">
              {selectedMareGrafo ? selectedMareGrafo.nomeMaregrafo : ''}
            </Text>
            <View className="w-fit flex-row items-center">
              <Ionicons name="water" color={colors.blue[500]} size={18} />
              <Text className="text-xl font-bold text-blue-500">
                {selectedMareGrafo ? selectedMareGrafo.siglaUF + ' / Brasil' : ''}
              </Text>
            </View>
          </View>

          <View className="w-auto flex-row items-center justify-center gap-8 rounded-full border-transparent bg-white p-4 shadow-md">
            <View className="border-r-2 border-r-slate-200 px-4">
              <Text className="font-bold text-slate-500">Maré {renderTideHeightText()}</Text>
              <View className="flex-row items-end">
                <Text className="text-[24px] font-bold">{tideNow?.previsao.toFixed(1)}</Text>
                <Text className="text-xl font-bold text-slate-500">m</Text>
              </View>
            </View>
            <View className="h-full">
              <Text className="font-bold text-slate-500">Tendencia</Text>
              <View className="h-fit flex-row items-center justify-center gap-1 rounded-full bg-green-100 px-2 py-1">
                <Ionicons name="trending-up" color={colors.green[400]} size={16} />
                <Text className="font-bold text-green-400">{renderTideTrend()}</Text>
              </View>
            </View>
          </View>

          <View className="flex-row justify-between gap-2">
            <View className="w-fit flex-row items-center gap-2 rounded-full border-2 border-blue-100 bg-blue-50 px-4 py-2">
              <View className="rounded-full bg-blue-200 p-2">
                <Feather name="arrow-up-right" color={colors.blue[500]} size={18} />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-500">Próxima Alta</Text>
                <View className="flex-row gap-1">
                  {/* <Text className="font-extrabold">16:45</Text> */}
                  <Text className="font-extrabold">
                    {formatDateForGraphLabel(nextHighTide?.dtHrPrevisao ?? '')}
                  </Text>
                  <Text className="text-slate-400">{nextHighTide?.previsao.toFixed(1)}m</Text>
                </View>
              </View>
            </View>

            <View className="w-fit flex-row items-center gap-2 rounded-full border-2 border-slate-100 bg-slate-50 px-4 py-2">
              <View className="rounded-full bg-slate-200 p-2">
                <Feather name="arrow-down-right" color={colors.slate[500]} size={18} />
              </View>
              <View>
                <Text className="text-sm font-bold text-slate-500">Próxima Baixa</Text>
                <View className="flex-row gap-1">
                  <Text className="font-extrabold">
                    {formatDateForGraphLabel(nextLowTide?.dtHrPrevisao ?? '')}
                  </Text>
                  <Text className="text-slate-400">{nextLowTide?.previsao.toFixed(1)}m</Text>
                </View>
              </View>
            </View>
          </View>

          <TideChart data={mappedDataForGraph} />

          <Button title="Dados da previsão" isLoading={isPrevisionLoading} />
        </BottomSheetComponent>
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
