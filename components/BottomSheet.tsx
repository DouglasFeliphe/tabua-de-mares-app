import React, { useRef } from 'react';
import { View, Button, Text } from 'react-native';
import BottomSheet, { BottomSheetRef } from '@ahmetaltai/react-native-bottom-sheet';

interface BottomSheetComponentProps {
  ref?: React.RefObject<BottomSheetRef>;
  children?: React.ReactNode;
}

export const BottomSheetComponent = ({ ref, children }: BottomSheetComponentProps) => {
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
        <View className="flex-1 items-center p-12">
          <Text>This is the content inside the Bottom Sheet.</Text>
          {children}
        </View>
      </BottomSheet>
    </View>
  );
};
