import axios from "axios";
import { Observation } from "../Model/ObservationData";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import { fetchPendingINaturalistObservations, fetchPendingObservations } from "../services/observationService";

interface Page {
  content: Observation[];
  pagination: {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
  };
}

const useGetLiteratureObservationData = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
  (options?: any) => Promise<any>
] => {
  const { data, status, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ["observation1"],
    queryFn: ({ pageParam = 0 }) => fetchPendingObservations(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNext
        ? lastPage?.pagination?.pageNumber + 1
        : undefined;
    },
  });

  const observationList = data?.pages;

  return [observationList, fetchNextPage, isFetchingNextPage, refetch];
};

const useGetINaturalistObservationData = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
  (options?: any) => Promise<any>
] => {
  const { data, status, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ["observation2"],
    queryFn: ({ pageParam = 0 }) => fetchPendingINaturalistObservations(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNext
        ? lastPage?.pagination?.pageNumber + 1
        : undefined;
    },
  });

  const observationList = data?.pages;
  return [observationList, fetchNextPage, isFetchingNextPage, refetch];
};

export { useGetLiteratureObservationData, useGetINaturalistObservationData };
