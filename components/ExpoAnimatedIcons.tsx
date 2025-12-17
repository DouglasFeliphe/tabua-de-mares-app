import React, { useRef, useEffect } from 'react';
import { Easing, View } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { MotiView } from 'moti';
// Create an animated icon component
interface ExpoAnimatedIconsProps {
  icon?: keyof typeof Icons;
}

export const ExpoAnimatedIcons = ({ icon = 'AntDesign', ...props }: ExpoAnimatedIconsProps) => {
  //   const Icon = Icons[icon];

  return (
    <View style={{ padding: 20 }}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing' }}
        {...props}>
        {/* <Icon /> */}
      </MotiView>
    </View>
  );
};
