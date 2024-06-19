// src/viewmodels/MushroomCurationViewModel.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import {
  fetchPendingMushrooms,
  approveMushroom,
  reproveMushroom,
} from "../services/MushroomService";
import { Mushroom } from "../Model/MushroomData";

export const useMushroomCurationViewModel = () => {
  const queryClient = useQueryClient();

  const {
    data: mushrooms,
    isLoading,
    error,
  } = useQuery<Mushroom[]>({
    queryKey: ["pendingMushrooms"],
    queryFn: fetchPendingMushrooms,
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => approveMushroom(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "pendingMushrooms",
      ] as InvalidateQueryFilters);
    },
  });

  const reproveMutation = useMutation({
    mutationFn: (id: number) => reproveMushroom(id),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "pendingMushrooms",
      ] as InvalidateQueryFilters);
    },
  });

  return {
    mushrooms,
    isLoading,
    error,
    approveMushroom: approveMutation.mutate,
    reproveMushroom: reproveMutation.mutate,
  };
};
