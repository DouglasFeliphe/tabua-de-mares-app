import React, { useRef } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetRef } from '@ahmetaltai/react-native-bottom-sheet';
import colors from 'tailwindcss/colors';

interface BottomSheetComponentProps {
  ref?: React.RefObject<BottomSheetRef>;
  children?: React.ReactNode;
  isLoading: boolean;
}

export const BottomSheetComponent = ({ isLoading, ref, children }: BottomSheetComponentProps) => {
  //   const ExpandBottomSheet = () => {
  //     BottomSheetRef.current?.expand();
  //   };

  //   const SnapBottomSheet = (index: number) => {
  //     BottomSheetRef.current?.snap(index);
  //   };

  const onPressBackdrop = () => {
    console.log('Backdrop Pressed');
    return {};
  };

  const onChangePoint = (index: number) => {
    console.log('Present Change: ' + index);
    return {};
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        index={0}
        ref={ref}
        points={['50%', '75%']}
        onPressBackdrop={onPressBackdrop}
        onChangePoint={onChangePoint}>
        <View className="flex-1 gap-4 px-8 py-12">
          {isLoading ? <ActivityIndicator size="large" color={colors.indigo[500]} /> : children}
        </View>
      </BottomSheet>
    </View>
  );
};
