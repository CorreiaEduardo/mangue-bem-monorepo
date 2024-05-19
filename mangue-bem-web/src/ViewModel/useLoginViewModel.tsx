import { useState } from "react";
import { User } from "../Model/User";
import axios from "axios";

const useLoginViewModel = (): [
  { error: boolean; response: string },
  ({ email, password }: User) => Promise<void>,
] => {
  const [error, setError] = useState(false);
  const [response, setResponse] = useState("");
  const loginEndpoint = "http://localhost:8080/v1/auth/login";

  async function handleSubmit({ email, password }: User) {
    try {
      const response = await axios.post(loginEndpoint, {
        email,
        password,
      });
      setResponse(response.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  return [{ error, response }, handleSubmit];
};

export default useLoginViewModel;
