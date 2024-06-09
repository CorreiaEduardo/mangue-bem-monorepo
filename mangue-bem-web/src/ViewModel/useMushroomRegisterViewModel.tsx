import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface mushroomRegister {
  inaturalistID: string;
  paper: string;
}

const useMushroomRegisterViewModel = () => {
  const registerEndpoint = "http://localhost:8080/v1/";

  const register = useMutation({
    mutationFn: ({ mushroom }: { mushroom: mushroomRegister }) => {
      return axios.post(registerEndpoint, { ...mushroom });
    },
  });
  return register;
};

export default useMushroomRegisterViewModel;
