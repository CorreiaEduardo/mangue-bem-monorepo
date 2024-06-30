import api from "./AxiosProvider";

const SPECIES_LINK_URL = "https://specieslink.net/ws/1.0/";
const SPECIES_LINK_APIKEY = "8r6u470KHNachb17GyP4";

export const fetchSpeciesLinkCollection = async (
  page: number,
  id: string,
): Promise<any> => {
  const response = await api.get(`https://cors-anywhere.herokuapp.com/${SPECIES_LINK_URL}/col/${id}`, {
    params: {
      apikey: SPECIES_LINK_APIKEY,
      page,
    },
  });

  let collectionData = response.data;

  return collectionData;
};
