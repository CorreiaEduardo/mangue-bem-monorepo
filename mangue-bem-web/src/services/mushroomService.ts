import axios from "axios";
import { Mushroom } from "../Model/MushroomData";

const BASE_URL = "http://localhost:8080";

export const fetchPendingMushrooms = async (): Promise<Mushroom[]> => {
  const response = await axios.get(`${BASE_URL}/species`, {
    params: { approvalStatus: "EQ:PENDING" },
  });
  return response.data.content;
};

export const approveMushroom = async (id: number): Promise<void> => {
  await axios.post(`${BASE_URL}/v1/species/${id}/approve`);
};

export const reproveMushroom = async (id: number): Promise<void> => {
  await axios.post(`${BASE_URL}/v1/species/${id}/reprove`);
};
