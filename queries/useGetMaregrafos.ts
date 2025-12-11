import { QUERY_KEYS } from './../consts/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getMareGrafosService } from 'services/getMaregrafos.service';

interface useGetMareGrafosQueryProps {}

export const useGetMareGrafosQuery = ({}: useGetMareGrafosQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.maregrafosData],
    queryFn: () => getMareGrafosService(),
    // enabled: false,
    staleTime: 1000 * 60 * 1440, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
  });
};
