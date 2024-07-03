import axios from "axios";
import { Mushroom } from "../Model/MushroomData";
import api from "../services/AxiosProvider";

const BASE_URL = "http://www.g2bc.uneb.br:9081/v1";

export const fetchPendingMushrooms = async (): Promise<Mushroom[]> => {
  const response = await axios.get(`${BASE_URL}/species`, {
    params: { approvalStatus: "EQ:PENDING" },
  });
  return response.data.content;
};

export const approveMushroom = async (id: number): Promise<void> => {
  await api.post(`${BASE_URL}/species/${id}/approve`);
};

export const reproveMushroom = async (id: number): Promise<void> => {
  await api.post(`${BASE_URL}/species/${id}/reprove`);
};
