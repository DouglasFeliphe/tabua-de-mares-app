import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Image, StyleSheet } from 'react-native';

interface LoaderProps extends React.ComponentProps<typeof Animated.Image> {
  size?: number;
  color?: string;
}

export const Loader = ({ size = 50, color = 'white', ...props }: LoaderProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, // Adjust spin speed (milliseconds)
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for performance
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  console.log('spin :', spin);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        tintColor: color, // Optional: apply a color tint if your image allows
        transform: [{ rotate: spin }],
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...props}>
      <EvilIcons name="spinner" size={24} color={'white'} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
