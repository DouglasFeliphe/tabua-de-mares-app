import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { TideHeightStatusTypes, TideTrendStatusTypes } from 'interface/tideDetails.interface';
import { formatDateForGraphLabel } from 'helpers/formatDateForGraphLabel';
import { Divider } from './Divider';
import { cn } from 'utils/lib';

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

const VARIANT_CLASSES: Record<
  Variants,
  { wrapper: string; iconBg: string; title: string; sub: string }
> = {
  default: {
    wrapper:
      'flex-row items-center gap-2 rounded-full border-2 border-blue-100 bg-blue-50 px-4 py-2',
    iconBg: 'bg-blue-200',
    title: 'text-sm font-bold text-blue-500',
    sub: 'text-blue-400',
  },
  highlighted: {
    wrapper:
      'flex-row items-center gap-2 rounded-full border-2 border-blue-100 bg-blue-50 px-4 py-2',
    iconBg: 'bg-blue-200',
    title: 'text-sm font-bold text-blue-500',
    sub: 'text-blue-400',
  },
  trivial: {
    wrapper:
      'flex-row items-center gap-2 rounded-full border-2 border-slate-100 bg-slate-50 px-4 py-2',
    iconBg: 'bg-slate-200',
    title: 'text-sm font-bold text-slate-500',
    sub: 'text-slate-400',
  },
};

const renderIconColor = (variant: Variants) => {
  switch (variant) {
    case 'default':
      return colors.blue[500];
    case 'highlighted':
      return colors.blue[500];
    case 'trivial':
      return colors.slate[500];
    default:
      return colors.blue[500];
  }
};

const InfoItem: React.FC<InfoItemProps> = ({ title, hour, height, variant, iconName }) => {
  const classes = VARIANT_CLASSES[variant];

  return (
    <View className={classes.wrapper}>
      <View className={`${classes.iconBg} rounded-full p-2`}>
        <Feather name={iconName} color={renderIconColor(variant)} size={18} />
      </View>
      <View>
        <Text className={classes.title}>{title}</Text>
        <View className="flex-row gap-1">
          <Text className="font-extrabold">{formatDateForGraphLabel(hour)}</Text>
          <Text className={classes.sub}>{height.toFixed(1)}m</Text>
        </View>
      </View>
    </View>
  );
};

interface InfoTendencyItemProps {
  tideTrend: TideTrendStatusTypes;
}

const InfoTendencyItem: React.FC<InfoTendencyItemProps> = ({ tideTrend }) => {
  const trendIcon =
    tideTrend === 'Subindo'
      ? 'trending-up'
      : tideTrend === 'Descendo'
        ? 'trending-down'
        : 'trending-flat';

  const trendColor =
    tideTrend === 'Subindo' ? 'green' : tideTrend === 'Descendo' ? 'slate' : 'blue';
  console.log('trendColor :', trendColor);

  const wrapperClass = cn('h-fit flex-row items-end gap-1 rounded-full px-2 py-1', {
    'bg-green-400': tideTrend === 'Subindo',
    'bg-slate-400': tideTrend === 'Descendo',
    'bg-blue-400': tideTrend === 'Estável',
  });

  const renderIconColor = () => {
    if (tideTrend === 'Subindo') {
      return colors.green['400'];
    }

    if (tideTrend === 'Descendo') {
      return 'white';
    }

    if (tideTrend === 'Estável') {
      return colors.blue['400'];
    }
  };

  const textClass = cn(`font-bold`, {
    'text-white': tideTrend === 'Descendo',
    'text-slate-500': tideTrend === 'Subindo',
    'text-blue-500': tideTrend === 'Estável',
  });

  return (
    <View className={wrapperClass}>
      <MaterialIcons name={trendIcon as any} color={renderIconColor()} size={16} />
      <Text className={textClass}>{tideTrend}</Text>
    </View>
  );
};

// kept for reference if needed elsewhere
const DATA_COLORS = {
  default: 'blue',
  highlighted: 'purple',
  trivial: 'slate',
} as const;
