import axios from "axios";
import { Observation } from "../Model/ObservationData";
import api from "./AxiosProvider";

const BASE_URL = "http://www.g2bc.uneb.br:9081/v1";

export const fetchCurators = async (page: number): Promise<any> => {
  const response = await api.get(`${BASE_URL}/curators`, {
    params: { page, role: 'EQ:CURATOR', deletedAt: 'NL' },
  });
  
  return response.data;
};
