import { useState } from "react";
import { User } from "../Model/User";
import axios from "axios";

const useLoginViewModel = (): [
  { user: User; error: boolean },
  ({ username, password }: User) => Promise<void>,
] => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const loginEndpoint = "http://localhost/v1/login";

  async function handleSubmit({ username, password }: User) {
    try {
      const response = await axios.post(loginEndpoint, {
        username,
        password,
      });

      setUser(response.data);
    } catch (error) {
      setError(true);
    }
  }
  return [{ user, error }, handleSubmit];
};

export default useLoginViewModel;
