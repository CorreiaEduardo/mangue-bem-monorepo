import axios from "axios";
import { Mushroom } from "../Model/MushroomData";
import { useInfiniteQuery } from "@tanstack/react-query";

interface Page {
  content: Mushroom[];
  pagination: {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
  };
}

const getMushrooms = async (
  pageParam: number,
  queryParams?: Record<string, string>,
): Promise<Page | undefined> => {
  const iNaturalistTaxaUrl = "https://api.inaturalist.org/v1/taxa/";
  const baseUrl = "http://localhost:8080/v1/species";

  try {
    const speciesReponse = await axios.get(baseUrl, {
      params: { page: pageParam, ...queryParams },
    });
    let mushroomData = speciesReponse.data;
    let mushroomIds = "";

    mushroomIds = encodeURIComponent(
      mushroomData.content
        .map((e: any) => e.inaturalistId)
        .filter((id: string) => id !== "")
        .join(","),
    );

    const inaturalistResponse = await axios.get(
      iNaturalistTaxaUrl + mushroomIds,
    );

    inaturalistResponse.data.results.sort((a: any, b: any) => a.id - b.id);
    mushroomData.content.sort(
      (a: any, b: any) => a.inaturalistId - b.inaturalistId,
    );

    const emptyNaturalistIdMushrooms = mushroomData.content.filter(
      (mushroom: any) => mushroom.inaturalistId == "",
    );

    mushroomData.content = mushroomData.content.filter(
      (mushroom: any) => mushroom.inaturalistId != "",
    );

    for (let i = 0; i < inaturalistResponse.data.results.length; i++) {
      mushroomData.content[i].taxaPhoto =
        inaturalistResponse.data.results[i].default_photo?.medium_url;
    }
    mushroomData.content = [
      ...mushroomData.content,
      ...emptyNaturalistIdMushrooms,
    ];

    mushroomData.content = mushroomData.content.sort((a: any, b: any) =>
      a.taxonGenus.localeCompare(b.taxonGenus),
    );
    return mushroomData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getAllParamsFromUrl = (url: string): Record<string, string> => {
  const queryString = url.split("?")[1];
  if (!queryString) return {};

  const paramsArray = queryString.split("&");
  const params: Record<string, string> = {};

  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    if (key !== "page") {
      params[key] = decodeURIComponent(value);
    }
  });

  return params;
};

const useGetMushroomAutoComplete = (): [any, () => any] => {
  const allParams = getAllParamsFromUrl(window.location.search);
  const { data, status, fetchNextPage } = useInfiniteQuery({
    queryKey: ["mushrooms", allParams],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getMushrooms(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return null;
    },
  });
  const mushroomList = data?.pages;

  return [mushroomList, fetchNextPage];
};

const useGetMushroomData = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
] => {
  const allParams = getAllParamsFromUrl(window.location.search);

  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["mushrooms", allParams],
    queryFn: ({ pageParam = 0 }) => getMushrooms(pageParam, allParams),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNext
        ? lastPage?.pagination?.pageNumber + 1
        : undefined;
    },
  });

  const mushroomList = data?.pages;

  return [mushroomList, fetchNextPage, isFetchingNextPage];
};
export { useGetMushroomAutoComplete, useGetMushroomData };
