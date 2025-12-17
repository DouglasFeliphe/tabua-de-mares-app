import React from 'react';
import { Image } from 'expo-image';
import waveGif from 'assets/icons/animated_jumping_map_pin.gif';

interface IconGifProps extends React.ComponentProps<typeof Image> {
  size?: number;
  url?: string;
}

export const IconGif = ({ size, url, ...props }: IconGifProps) => {
  return (
    <Image
      style={{
        height: size ?? 50,
        width: size ?? 50,
        borderWidth: 2,
        zIndex: 100,
      }}
      source={waveGif}
      {...props}
      //   contentFit="none"

      //   autoplay
    />
  );
};
