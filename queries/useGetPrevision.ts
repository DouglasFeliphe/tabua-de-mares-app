import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'consts/queryKeys';
import { getPrevisionParams, getPrevisionService } from 'services/getPrevision.service';

interface useGetPrevisionQueryProps extends getPrevisionParams {}

export const useGetPrevisionQuery = ({
  momentoFinal,
  momentoInicial,
  siglaMaregrafo,
}: useGetPrevisionQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEYS.previsionData, siglaMaregrafo, momentoInicial, momentoFinal],
    queryFn: () =>
      getPrevisionService({
        momentoFinal,
        momentoInicial,
        siglaMaregrafo,
      }),
    // enabled: false,
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
  });
};
