import api from './api.service';

interface getMareGrafosResponse {
  siglaMaregrafo: string;
  nomeMaregrafo: string;
  local: string;
  siglaUF: string;
  dataInicialOperacao: string;
  urlRelatorio: string;
  lat: number;
  lon: number;
  idGLOSS: number | null;
  idUHSLC: number;
  idPSMSL: number;
}

export async function getMareGrafosService() {
  const response = await api<getMareGrafosResponse[]>(`/maregrafos`);
  return response.data;
}
