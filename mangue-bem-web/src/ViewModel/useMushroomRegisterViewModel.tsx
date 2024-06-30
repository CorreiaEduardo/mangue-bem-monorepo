import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "../services/AxiosProvider";
import { useState } from "react";

interface mushroomRegister {
  iNaturalistId: string;
  paper: string;
}

const useMushroomRegisterViewModel = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const registerEndpoint = "http://localhost:8080/v1/species";

  const register = useMutation({
    mutationFn: ({ mushroom }: { mushroom: mushroomRegister }) => {
      setError(false);
      return api.post(registerEndpoint, { ...mushroom }).then(() => {
        setSuccess(true);
      }).catch(() => {
        setError(true);
      });
    },
  });

  return { register, error, success };
};

export default useMushroomRegisterViewModel;
