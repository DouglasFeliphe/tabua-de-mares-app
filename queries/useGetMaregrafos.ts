import { useQuery } from '@tanstack/react-query';
import { getMaregrafos } from 'services/getMaregrafos.service';

interface useGetTabuaMareQueryProps {}

export const useGetMaregrafosQuery = ({}: useGetTabuaMareQueryProps) => {
  return useQuery({
    queryKey: ['tabuaMareData'],
    queryFn: () => getMaregrafos(),
    // enabled: false,
    staleTime: 1000 * 60 * 1440, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
  });
};
