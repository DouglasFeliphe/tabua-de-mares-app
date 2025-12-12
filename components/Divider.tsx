import React from 'react';
import { View } from 'react-native';

interface DividerProps {
  type: 'horizontal' | 'vertical';
}

export const Divider = ({ type }: DividerProps) => {
  const style = type === 'horizontal' ? 'w-full' : 'h-full';

  return <View className={`${style} border-1 border-slate-200`} />;
};
