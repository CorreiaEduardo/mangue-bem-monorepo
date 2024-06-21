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
} from "../services/mushroomService";
import { Mushroom } from "../Model/MushroomData";

export const useMushroomCurationViewModel = () => {
  const queryClient = useQueryClient();

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
    approveMushroom: approveMutation.mutate,
    reproveMushroom: reproveMutation.mutate,
  };
};
