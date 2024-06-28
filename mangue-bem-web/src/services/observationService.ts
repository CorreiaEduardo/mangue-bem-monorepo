import axios from "axios";
import { Observation } from "../Model/ObservationData";
import api from "./AxiosProvider";

const INATURALIST_URL = "https://api.inaturalist.org/v1/observations/";
const BASE_URL = "http://localhost:8080/v1";

export const fetchPendingObservations = async (page: number): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: { approvalStatus: "EQ:PENDING", type: "EQ:LITERATURE", page },
  });
  
  return response.data;
};

export const fetchPendingINaturalistObservations = async (page: number): Promise<any> => {
  const response = await api.get(`${BASE_URL}/observations`, {
    params: { approvalStatus: "EQ:PENDING", type: "EQ:INATURALIST", page  },
  });
  
  let mushroomData = response.data;
  let ids = "";

  ids = encodeURIComponent(
    mushroomData.content
      .map((e: any) => e.inaturalistId)
      .filter((id: string) => id !== "")
      .join(","),
  );

  const inaturalistResponse = await axios.get(
    INATURALIST_URL + ids,
  );

  inaturalistResponse.data.results.sort((a: any, b: any) => a.id - b.id);
  mushroomData.content.sort(
    (a: any, b: any) => a.inaturalistId - b.inaturalistId,
  );

  mushroomData.content = mushroomData.content.filter(
    (mushroom: any) => mushroom.inaturalistId != "",
  );

  for (let i = 0; i < inaturalistResponse.data.results.length; i++) {
    console.log(mushroomData.content[i].specie.taxaPhoto);
    console.log(inaturalistResponse.data.results[i].observation_photos[0]?.photo.url);
    
    mushroomData.content[i].specie.taxaPhoto =
      inaturalistResponse.data.results[i].observation_photos[0]?.photo.url;
  }

  return mushroomData;
};

export const approveObservation = async (id: number): Promise<void> => {
  await api.post(`${BASE_URL}/observations/${id}/approve`);
};

export const reproveObservation = async (id: number): Promise<void> => {
  await api.post(`${BASE_URL}/observations/${id}/reprove`);
};
