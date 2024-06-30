import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import {
  approveObservation,
  reproveObservation,
} from "../services/observationService";

export const useObservationCurationViewModel = () => {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: (id: number) => approveObservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const reproveMutation = useMutation({
    mutationFn: (id: number) => reproveObservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return {
    approveObservation: approveMutation.mutate,
    reproveObservation: reproveMutation.mutate,
  };
};
