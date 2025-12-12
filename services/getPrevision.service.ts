import api from './api.service';

interface getPrevisionResponse {
  dtHrPrevisao: string; //'2025-12-10-00-00';
  previsao: number; //3.517;
}

export interface getPrevisionParams {
  siglaMaregrafo: string; //'SBRJ';
  momentoInicial: string; //'2025-12-10-00-00';
  momentoFinal: string; //'2025-12-11-00-00';
}

export async function getPrevisionService({
  siglaMaregrafo,
  momentoInicial,
  momentoFinal,
}: getPrevisionParams) {
  const response = await api<getPrevisionResponse[]>(`/previsao/${siglaMaregrafo}`, {
    params: {
      momentoInicial,
      momentoFinal,
    },
  });
  return response.data;
}
