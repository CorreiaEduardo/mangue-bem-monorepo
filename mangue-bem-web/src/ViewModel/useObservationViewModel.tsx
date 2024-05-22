import { useState } from "react";
import axios from "axios";

const useObservationViewModel = (): [
  { error: boolean; response: any },
  (id: number) => Promise<void>,
] => {
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<any>();
  const baseUrl = "http://localhost:8080/v1/observations/";
  const iNaturalistTaxaUrl = "https://api.inaturalist.org/v1/observations/";
  const ufReportUrl = "http://localhost:8080/v1/observations/uf-report?specieId=";

  async function get(id: number) {
    try {
      const response = await axios.get(baseUrl + id);
      if (!!response.data?.specie?.inaturalistId) {
        const iNaturalistTaxaResponse = await axios.get(iNaturalistTaxaUrl + response.data.inaturalistId);
        response.data.taxa = iNaturalistTaxaResponse.data?.results[0]?.taxon;
        response.data.observation = iNaturalistTaxaResponse.data?.results[0];
      }

      if (!!response.data?.specie?.id) {
        const ufReportResponse = await axios.get(ufReportUrl + response.data?.specie?.id);
        response.data.observation.summary = ufReportResponse.data?.items;
      }

      setResponse(response.data);
      
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  return [{ error, response }, get];
};

export default useObservationViewModel;
