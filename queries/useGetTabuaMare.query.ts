import { useQuery } from '@tanstack/react-query';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getTabuaMareByGeolocation } from 'services/getTabuaMareByGeolocation.service';

interface useGetTabuaMareQueryProps {
  lat: number;
  lng: number;
  state: string;
}

export const useGetTabuaMareQuery = ({ lat, lng, state }: useGetTabuaMareQueryProps) => {
  return useQuery({
    queryKey: ['tabuaMareData', lat, lng, state],
    queryFn: () => getTabuaMareByGeolocation(lat, lng, state),
    enabled: !!lat && !!lng && !!state,
  });
};
