import { useState } from "react";
import axios from "axios";

const useObservationViewModel = (): [
  { error: boolean; response: any },
  (id: number) => Promise<void>,
] => {
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<any>();
  const baseUrl = "http://localhost:8080/v1/species";
  const iNaturalistTaxaUrl = "https://api.inaturalist.org/v1/observations?taxon_id=";
  const ufReportUrl =
    "http://localhost:8080/v1/observations/uf-report?specieId=";

  async function get(id: number) {
    try {
      const response = await axios.get(baseUrl + "/" + id);
      response.data.observation = {};
      if (!!response.data?.inaturalistId) {
        const iNaturalistTaxaResponse = await axios.get(
          iNaturalistTaxaUrl + response.data.inaturalistId,
        );
        response.data.taxa = iNaturalistTaxaResponse.data?.results[0]?.taxon;
        response.data.observation = iNaturalistTaxaResponse.data?.results[0];
      }

      if (!!response.data?.id) {
        const ufReportResponse = await axios.get(
          ufReportUrl + response.data?.id,
        );
        response.data.observation.summary = ufReportResponse.data?.items;

        const literatureObservationsResponse = await axios.get(baseUrl, {
          params: {
            "specie.id": "EQ:" + response.data?.id,
            type: "EQ:LITERATURE",
          },
        });
        response.data.observation.literature =
          literatureObservationsResponse.data?.content;

        const inaturalistObservationsResponse = await axios.get(baseUrl, {
          params: {
            "specie.id": "EQ:" + response.data?.id,
            type: "EQ:INATURALIST",
          },
        });
        response.data.observation.inaturalist =
          inaturalistObservationsResponse.data?.content;

        const specieslinkObservationsResponse = await axios.get(baseUrl, {
          params: {
            "specie.id": "EQ:" + response.data?.id,
            type: "EQ:SPECIES_LINK",
          },
        });
        response.data.observation.specieslink =
          specieslinkObservationsResponse.data?.content;
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
