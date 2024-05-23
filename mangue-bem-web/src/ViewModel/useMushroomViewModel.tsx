import axios from "axios";
import { useGetApi } from "./base/useApi";
import { Mushroom } from "../Model/MushroomData";

const useGetMushroomData = () => {
  const iNaturalistTaxaUrl = "https://api.inaturalist.org/v1/taxa/";
  const [{ data, isLoading, isError }, setUrl] = useGetApi(
    "http://localhost:8080/v1/species",
    {},
  );
  let mushroomData = { ...data };
  async function get() {
    try {
      const mushroomIds = mushroomData.content
        ?.map((e: any) => e.inaturalistId)
        .filter((id: string) => id !== "")
        .join(",");

      const result = await axios.get(iNaturalistTaxaUrl + mushroomIds);
      result.data.results.sort((a: any, b: any) => a.id - b.id);
      mushroomData.content.sort(
        (a: any, b: any) => a.inaturalistId - b.inaturalistId,
      );

      console.log(result.data.results);

      for (let i = 0; i < result.data.results.length; i++) {
        if (result.data.results[i]?.default_photo) {
          mushroomData.content[i].taxaPhoto =
            result.data.results[i]?.default_photo.medium_url;
        } else {
          mushroomData.content[i].taxaPhoto = "";
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return [mushroomData, get];
};

export default useGetMushroomData;
