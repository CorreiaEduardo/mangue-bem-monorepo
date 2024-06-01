import { useEffect, useState } from "react";
import { User } from "../Model/User";
import axios from "axios";

const useLoginViewModel = (): [
  { error: boolean; response: string; stat: number },
  ({ name, email, password }: User) => void,
] => {
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const [stat, setStat] = useState(0);
  const loginEndpoint = "http://localhost:8080/v1/auth/login";

  function handleSubmit({ email, password }: User) {
    const loginPost = async () => {
      try {
        const response = await axios.post(loginEndpoint, {
          email,
          password,
        });
        setResponse(response.data);
        setStat(response.status);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    loginPost();
  }
  return [{ error, response, stat }, handleSubmit];
};

export default useLoginViewModel;
