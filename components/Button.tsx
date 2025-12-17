import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { forwardRef } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import colors from 'tailwindcss/colors';
import { Loader } from './Loader';

type ButtonProps = {
  title: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`${styles.button} ${touchableProps.className}`}>
      <View className={`${styles.wrapper}`}>
        <Text className={styles.buttonText}>
          {touchableProps.isLoading ? 'Carregando dados...' : title}
        </Text>
        {/* {!touchableProps.isLoading && <ActivityIndicator color="white" />} */}
        {touchableProps.isLoading && <Loader />}
      </View>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const styles = {
  button: 'h-12 flex justify-center bg-indigo-500 rounded-[28px] shadow-md',
  buttonText: 'text-white text-lg font-semibold text-center',
  wrapper: 'flex-row items-center justify-center ',
};
