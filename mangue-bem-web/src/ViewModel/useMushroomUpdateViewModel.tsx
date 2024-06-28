import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../services/AxiosProvider";
import { useState } from "react";

const useMushroomUpdateViewModel = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = useMutation({
    mutationFn: ({ id, mushroom }: { id: number, mushroom: any }) => {
      const updateEndpoint = "http://localhost:8080/v1/species/" + id;
      setError(false);
      setSuccess(false);
      return api.put(updateEndpoint, { ...mushroom }).then(() => {
        setSuccess(true);
      }).catch(() => {
        setError(true);
      });
    },
  });

  return { update, error, success };
};

export default useMushroomUpdateViewModel;
