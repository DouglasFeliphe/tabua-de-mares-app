import { useNavigation } from '@react-navigation/native';
import { ScreenContent } from 'components/ScreenContent';

import { StyleSheet, View } from 'react-native';

import { Button } from '../components/Button';
import { useLocation } from 'hooks/useLocation';

export default function Overview() {
  const navigation = useNavigation();
  const { location } = useLocation();

  return (
    <View style={styles.container}>
      <ScreenContent path="screens/overview.tsx" title="Overview">
        <Text>{JSON.stringify(location?.coords.latitude)}</Text>
        <Text>{JSON.stringify(location?.coords.longitude)}</Text>
</ScreenContent>
      <Button
        onPress={() =>
          navigation.navigate('Details', {
            name: 'Dan',
          })
        }
        title="Show Details"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
