import React, { JSX } from 'react';
import { View, Text } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { TideHeightStatusTypes, TideTrendStatusTypes } from 'interface/tideDetails.interface';
import { formatDateForGraphLabel } from 'helpers/formatDateForGraphLabel';
import { DefaultColors } from 'tailwindcss/types/generated/colors';
import { GlyphMap, Icon, IconProps } from '@expo/vector-icons/build/createIconSet';
import { Divider } from './Divider';

interface TideDetailsPros {
  locationName: string;
  state: string;
  tideHeightLabelNow: TideHeightStatusTypes;
  tideTrend: TideTrendStatusTypes;
  tideHeightNow: number;
  nextHighTideHour: string;
  nextHighTideHeight: number;
  nextLowTideHour: string;
  nextLowTideHeight: number;
}

export const TideDetails = ({
  locationName,
  state,
  tideHeightLabelNow,
  tideHeightNow,
  tideTrend,
  nextHighTideHour,
  nextHighTideHeight,
  nextLowTideHour,
  nextLowTideHeight,
}: TideDetailsPros) => {
  return (
    <>
      <InfoHeader title={locationName} subTitle={state} />

      <View className="w-full flex-row items-center justify-center gap-6 rounded-full border-transparent bg-white py-4 shadow-md">
        <View className="h-full w-fit">
          <Text className="font-bold text-slate-500">Maré {tideHeightLabelNow}</Text>
          <View className="h-fit flex-row items-end gap-1">
            <Text className="text-[24px] font-bold">{tideHeightNow.toFixed(1)}</Text>
            <Text className="text-xl font-bold text-slate-500">m</Text>
          </View>
        </View>

        <Divider type="vertical" />

        <View className="h-full w-fit">
          <Text className="font-bold text-slate-500">Tendencia</Text>
          <InfoTendencyItem tideTrend={tideTrend} />
        </View>
      </View>

      <View className="flex-row justify-between gap-2">
        <InfoItem
          title={'Próxima Alta'}
          hour={nextHighTideHour}
          height={nextHighTideHeight}
          variant="highlighted"
          iconName="arrow-up-right"
        />
        <InfoItem
          title={'Próxima Baixa'}
          hour={nextLowTideHour}
          height={nextLowTideHeight}
          variant="trivial"
          iconName="arrow-down-right"
        />
      </View>

      {/* <TideChart data={mappedDataForGraph} /> */}
    </>
  );
};

interface InfoHeaderProps {
  title: string;
  subTitle: string;
}

const InfoHeader = ({ title, subTitle }: InfoHeaderProps) => {
  return (
    <View>
      <Text className="text-xl font-bold">{title}</Text>
      <View className="w-fit flex-row items-center">
        <Ionicons name="water" color={colors.blue[500]} size={18} />
        <Text className="text-xl font-bold text-blue-500">{subTitle + ' / Brasil'}</Text>
      </View>
    </View>
  );
};

interface InfoItemProps {
  title: string;
  hour: string;
  height: number;
  variant: Variants;
  iconName: keyof typeof Feather.glyphMap;
}

type Variants = 'default' | 'highlighted' | 'trivial';

const getColorByVariant = (variant: Variants) => {
  return DATA_COLORS[variant];
};

const InfoItem = ({ title, hour, height, variant, iconName }: InfoItemProps) => {
  const mainColor = getColorByVariant(variant);

  return (
    <View
      className={`flex-row items-center gap-2 rounded-full border-2 border-${mainColor}-100 bg-${mainColor}-50 px-4 py-2`}>
      <View className={`bg-${mainColor}-200 rounded-full p-2`}>
        <Feather name={iconName} color={colors.slate[500]} size={18} />
      </View>
      <View>
        <Text className={`text-sm font-bold text-${mainColor}-500`}>{title}</Text>
        <View className="flex-row gap-1">
          <Text className="font-extrabold">{formatDateForGraphLabel(hour)}</Text>
          <Text className={`text-${mainColor}-400`}>{height.toFixed(1)}m</Text>
        </View>
      </View>
    </View>
  );
};

interface InfoTendencyItemProps {
  tideTrend: TideTrendStatusTypes;
}

const InfoTendencyItem = ({ tideTrend }: InfoTendencyItemProps) => {
  const renderIconName = (): keyof typeof MaterialIcons.glyphMap => {
    if (tideTrend === 'Subindo') return 'trending-up';
    if (tideTrend === 'Descendo') return 'trending-down';
    return 'trending-flat';
  };

  const renderColors = (): keyof DefaultColors => {
    if (tideTrend === 'Subindo') return 'green';
    if (tideTrend === 'Descendo') return 'slate';
    return 'blue';
  };

  return (
    <>
      <View
        className={`h-fit flex-row items-end gap-1 rounded-full bg-${renderColors()}-400 px-2 py-1`}>
        <MaterialIcons name={renderIconName()} color={colors[renderColors()][400]} size={16} />
        <Text className={`font-bold text-${renderColors()}-400`}>{tideTrend}</Text>
      </View>
    </>
  );
};

const DATA_COLORS: Record<Variants, keyof DefaultColors> = {
  default: 'blue',
  highlighted: 'purple',
  trivial: 'slate',
};
