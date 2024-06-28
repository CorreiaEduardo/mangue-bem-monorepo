import { InvalidateQueryFilters, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCurators } from "../services/curatorsService";
import api from "../services/AxiosProvider";
import { useState } from "react";

interface Page {
  content: any[];
  pagination: {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
  };
}

const useGetCuratorsData = (): [
  (Page | undefined)[] | undefined,
  () => void,
  boolean,
  (options?: any) => Promise<any>
] => {
  const { data, status, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ["curators1"],
    queryFn: ({ pageParam = 0 }) => fetchCurators(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.hasNext
        ? lastPage?.pagination?.pageNumber + 1
        : undefined;
    },
  });

  const list = data?.pages;

  return [list, fetchNextPage, isFetchingNextPage, refetch];
};

interface CuratorRegister {
  name: string;
  email: string;
  password: string;
}

const useRegisterCurator = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const registerEndpoint = "http://localhost:8080/v1/curators";
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: ({ user }: { user: CuratorRegister }) => {
      setError(false);
      return api.post(registerEndpoint, { ...user }).then(() => {
        setSuccess(true);
      }).catch(() => {
        setError(true);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "curators1",
      ] as InvalidateQueryFilters);
    },
  });

  return { register, error, success };
};

const useDeleteCurator = () => {
  const [errorOnDelete, setError] = useState(false);
  const [successOnDelete, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const deleteCurator = useMutation({
    mutationFn: (id: number) => {
      const deleteEndpoint = "http://localhost:8080/v1/curators/" + id;
      return api.delete(deleteEndpoint).then(() => {
        setSuccess(true);
      }).catch(() => {
        setError(true);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "curators1",
      ] as InvalidateQueryFilters);
    },
  });

  return { deleteCurator, errorOnDelete, successOnDelete };
};

export { useGetCuratorsData, useRegisterCurator, useDeleteCurator };
