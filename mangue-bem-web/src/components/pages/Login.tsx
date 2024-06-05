import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../Card";
import useLoginViewModel from "../../ViewModel/useLoginViewModel";
import { useNavigate } from "react-router-dom";
import appString from "../../utils/appStrings";
import DefaultButton from "../DefaultButton";
import TextInput from "../TextInput";

const Login = ({
  setIsloggedIn,
}: {
  setIsloggedIn: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [{ error, response, stat }, handleSubmit] = useLoginViewModel();
  const navigate = useNavigate();

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSubmit({ ...user });
  };

  useEffect(() => {
    if (stat === 200) {
      console.log("if");
      setIsloggedIn(true);
      navigate("/", { replace: true });
    }
  }, [stat]);

  return (
    //TODO mobile version
    <div className="flex min-h-screen sm:p-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full items-center justify-center  bg-emerald-700 p-5 md:w-1/2"
      >
        <Card>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {appString.pt.login}
          </h2>
          <div className="mt-5  sm:mx-4 sm:w-full sm:max-w-sm">
            <form
              className="flex flex-col items-center justify-center space-y-6"
              action="#"
              method="POST"
              onSubmit={handleFormSubmit}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mt-2 w-full"
              >
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={user.email}
                  placeholder="abc@abc.com"
                  onChange={(newValue) => setUser({ ...user, email: newValue })}
                  label="Email"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full"
              >
                <div className="relative mt-2">
                  <TextInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={user.password}
                    required
                    placeholder="***"
                    onChange={(newValue) =>
                      setUser({ ...user, password: newValue })
                    }
                    label="Password"
                  />

                  <div className="float-end my-4">
                    <div className="text-sm">
                      <a
                        href="#"
                        className=" font-semibold text-pink-700 hover:text-pink-500"
                      >
                        {appString.pt.forgotPassword}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="my-2 text-pink-500"
                >
                  {appString.pt.invalidCredentials}
                </motion.p>
              )}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <DefaultButton type="submit" text={appString.pt.login} />
              </motion.div>
              <hr className="my-3 w-full border-gray-500" />
              <DefaultButton text={appString.pt.register} width="w-1/2" />
            </form>
          </div>
        </Card>
      </motion.div>

      <div
        className="hidden bg-cover bg-center shadow-[_-10px_3px_8px_rgba(3,31,24,0.45)] md:block md:w-1/2"
        style={{
          backgroundImage: "url(assets/login_img.jpg)",
        }}
      ></div>
    </div>
  );
};

export default Login;
