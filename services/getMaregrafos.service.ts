import api from './api.service';

interface MaregrafosResponse {
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

export async function getMaregrafos() {
  const response = await api<MaregrafosResponse[]>(`/maregrafos`);
  return response.data;
}
