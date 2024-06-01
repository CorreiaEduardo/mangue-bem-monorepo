import { useMutation } from "@tanstack/react-query";
import { User } from "../Model/User";
import axios from "axios";

const useUserRegisterViewModel = () => {
  const registerEndpoint = "http://localhost:8080/v1/auth/register";

  const register = useMutation({
    mutationFn: ({ user }: { user: User }) => {
      return axios.post(registerEndpoint, { ...user });
    },
  });
  return register;
};

export default useUserRegisterViewModel;
