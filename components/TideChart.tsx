import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const windowWidth = Dimensions.get('window').width;

interface TideChartProps {
  data: TideDataPoint[];
}

type TideDataPoint = {
  value: number;
  label: string;
};

export function TideChart({ data }: TideChartProps) {
  if (data.length === 0) {
    return (
      <View className="my-8 items-center justify-center gap-4">
        <Text>Nenhuma informação encontrada.</Text>
        <Ionicons name="alert-circle-outline" size={24} color="black" />
      </View>
    );
  }

  return (
    <View
      style={{
        // flex: 1,
        // width: '100%',
        // justifyContent: 'center',
        paddingVertical: 20,
        // borderWidth: 2,
      }}>
      <LineChart
        curved
        data={data}
        thickness={4}
        color="#389CFA"
        // Área abaixo da curva
        startFillColor="rgba(56,156,250,0.5)"
        // endFillColor="rgba(47,128,237,0.1)"
        // startOpacity={1}
        // endOpacity={0.1}
        areaChart
        // Grid horizontal
        noOfSections={3}
        yAxisColor="none"
        yAxisThickness={0}
        rulesColor="#9fc9e3"
        rulesType="dashed"
        rulesThickness={2}
        // Eixo X
        xAxisColor="transparent"
        xAxisThickness={1}
        xAxisLabelTextStyle={{
          color: 'slategrey',
          fontSize: 12,
          fontWeight: '500',
          // position: 'absolute',
          //   paddingBottom: 88,
        }}
        // Remover círculos automáticos
        hideDataPoints
        // Customizar só o marcador destacado
        customDataPoint={(point) =>
          point.dataPointRadius ? (
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderColor: 'white',
                backgroundColor: '#2F80ED',
                borderWidth: 2,
              }}
            />
          ) : null
        }
        // Espaçamento
        spacing={windowWidth / data?.length}
        // adjustToWidth={true}
        // Deixar mais próximo do design limpo
        hideYAxisText
        hideOrigin
      />
    </View>
  );
}
