import axios from "axios";
import { Observation } from "../Model/ObservationData";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import {
  fetchApprovedINaturalistObservation,
  fetchApprovedLiteratureObservation,
  fetchApprovedSpeciesLinkObservation,
} from "../services/observationService";
import { useParams } from "react-router-dom";

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

const useGetLiteratureObservation = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
  (options?: any) => Promise<any>,
] => {
  const { id } = useParams<{ id: string }>();
  const observationId = Number(id);

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["observationPaperApproved"],
      queryFn: ({ pageParam = 0 }) =>
        fetchApprovedLiteratureObservation(pageParam, observationId),
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

const useGetINaturalistObservation = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
  (options?: any) => Promise<any>,
] => {
  const { id } = useParams<{ id: string }>();
  const observationId = Number(id);

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["observationNaturalistApproved"],
      queryFn: ({ pageParam = 0 }) =>
        fetchApprovedINaturalistObservation(pageParam, observationId),
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

const useGetSpeciesLinkObservation = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
  (options?: any) => Promise<any>,
] => {
  const { id } = useParams<{ id: string }>();
  const observationId = Number(id);

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["observationSpeciesApproved"],
      queryFn: ({ pageParam = 0 }) =>
        fetchApprovedSpeciesLinkObservation(pageParam, observationId),
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

export {
  useGetLiteratureObservation,
  useGetINaturalistObservation,
  useGetSpeciesLinkObservation,
};
