import api from './api.service';

export async function getTabuaMareByGeolocation(lat: number, lng: number, state: string) {
  if (!state) {
    throw new Error('State is required to fetch Tabua Mare data by geolocation.');
  }

  const response = await api(
    `/geo-tabua-mare/[${lat.toString()},${lng.toString()}]/${state}/[1,2,3]`
  );

  //   curl -X GET "https://tabuamare.devtu.qzz.io//api/v1/geo-tabua-mare/[-7.11509,-34.864]/pb/1/[1,2,3]"
  //   https://tabuamare.devtu.qzz.io//api/v1/geo-tabua-mare/[-16.1037075,-47.3100251]/pb/1/[1,2,3]

  return response.data;
}
