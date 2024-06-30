import axios from "axios";
import { Observation } from "../Model/ObservationData";
import api from "./AxiosProvider";
import { fetchSpeciesLinkInstitution } from "./observationInstitution";

const INATURALIST_URL = "https://api.inaturalist.org/v1/observations/";
const BASE_URL = "http://localhost:8080/v1";
const SPECIES_LINK_URL = "https://specieslink.net/ws/1.0";
const SPECIES_LINK_APIKEY = "8r6u470KHNachb17GyP4";

export const fetchPendingObservations = async (page: number): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: { approvalStatus: "EQ:PENDING", type: "EQ:LITERATURE", page },
  });

  return response.data;
};

export const fetchPendingINaturalistObservations = async (
  page: number,
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: { approvalStatus: "EQ:PENDING", type: "EQ:INATURALIST", page },
  });

  let mushroomData = response.data;
  let ids = "";

  ids = encodeURIComponent(
    mushroomData.content
      .map((e: any) => e.inaturalistId)
      .filter((id: string) => id !== "")
      .join(","),
  );

  const inaturalistResponse = await axios.get(INATURALIST_URL + ids);

  inaturalistResponse.data.results.sort((a: any, b: any) => a.id - b.id);
  mushroomData.content.sort(
    (a: any, b: any) => a.inaturalistId - b.inaturalistId,
  );

  mushroomData.content = mushroomData.content.filter(
    (mushroom: any) => mushroom.inaturalistId != "",
  );

  for (let i = 0; i < inaturalistResponse.data.results.length; i++) {
    mushroomData.content[i].specie.taxaPhoto =
      inaturalistResponse.data.results[i].observation_photos[0]?.photo.url;
  }

  return mushroomData;
};

export const fetchApprovedINaturalistObservation = async (
  page: number,
  id: number,
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: {
      approvalStatus: "EQ:APPROVED",
      type: "EQ:INATURALIST",
      page,
      "specie.id": `EQ:${id}`,
    },
  });

  let mushroomData = response.data;
  let ids = "";

  ids = encodeURIComponent(
    mushroomData.content
      .map((e: any) => e.inaturalistId)
      .filter((id: string) => id !== "")
      .join(","),
  );

  const inaturalistResponse = await axios.get(INATURALIST_URL + ids);

  inaturalistResponse.data.results.sort((a: any, b: any) => a.id - b.id);
  mushroomData.content.sort(
    (a: any, b: any) => a.inaturalistId - b.inaturalistId,
  );

  mushroomData.content = mushroomData.content.filter(
    (mushroom: any) => mushroom.inaturalistId != "",
  );

  for (let i = 0; i < inaturalistResponse.data.results.length; i++) {
    mushroomData.content[i].specie.taxaPhoto =
      inaturalistResponse.data.results[i].observation_photos[0]?.photo.url;
  }

  return mushroomData;
};

export const fetchApprovedLiteratureObservation = async (
  page: number,
  id: number,
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: {
      approvalStatus: "EQ:APPROVED",
      type: "EQ:LITERATURE",
      page,
      "specie.id": `EQ:${id}`,
    },
  });

  let mushroomData = response.data;

  return mushroomData;
};

export const fetchApprovedSpeciesLinkObservation = async (
  page: number,
  id: number,
): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: {
      approvalStatus: "EQ:APPROVED",
      type: "EQ:SPECIES_LINK",
      page,
      "specie.id": `EQ:${id}`,
    },
  });

  let mushroomData = response.data;
  let ids = "";
  const genus = mushroomData.content[0].taxonGenus;
  const name = mushroomData.content[0].taxonName;

  ids = encodeURIComponent(
    mushroomData.content
      .map((e: any) => e.speciesLinkId)
      .filter((id: string) => id !== "")
      .join(","),
  );

  const observationDetails = await fetchSpeciesLinkObservationDetails(
    page,
    ids,
    genus,
    name,
  );

  for (let i = 0; i < mushroomData.data.content.length; i++) {
    const institutionCode = observationDetails.features[i].institutioncode;
    const institution = fetchSpeciesLinkInstitution(page, institutionCode);
    mushroomData.content[i].details = observationDetails.features[i];
    mushroomData.content[i].institution = institution;
  }

  return mushroomData;
};

export const fetchSpeciesLinkObservationDetails = async (
  page: number,
  id: string,
  genus: string,
  name: string,
): Promise<any> => {
  const response = await api.get(
    `${SPECIES_LINK_URL}/search?scientificName=${genus}+${name}`,
    {
      params: {
        apikey: SPECIES_LINK_APIKEY,
        page,
        collectionID: id,
      },
    },
  );

  let mushroomData = response.data;

  return mushroomData;
};

export const approveObservation = async (id: number): Promise<void> => {
  await api.post(`${BASE_URL}/observations/${id}/approve`);
};

export const reproveObservation = async (id: number): Promise<void> => {
  await api.post(`${BASE_URL}/observations/${id}/reprove`);
};
