import api from "./AxiosProvider";

const SPECIES_LINK_URL = "https://specieslink.net/ws/1.0/";
const SPECIES_LINK_APIKEY = "8r6u470KHNachb17GyP4";

export const fetchSpeciesLinkInstitution = async (
  page: number,
  id: string,
): Promise<any> => {
  const response = await api.get(`${SPECIES_LINK_URL}/ins/${id}`, {
    params: {
      apikey: SPECIES_LINK_APIKEY,
      page,
    },
  });

  let institutionData = response.data;

  return institutionData;
};
