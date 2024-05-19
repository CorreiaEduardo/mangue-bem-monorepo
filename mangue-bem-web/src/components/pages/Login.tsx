import React, { Dispatch, SetStateAction, useState } from "react";
import Card from "../Card";
import useLoginViewModel from "../../ViewModel/useLoginViewModel";
import { Navigate } from "react-router-dom";
import appString from "../../utils/appStrings";
import DefaultButton from "../DefaultButton";

interface FormValues {
  email: string;
  password: string;
}

const initialState: FormValues = {
  email: "",
  password: "",
};

const Login = ({
  setIsloggedIn,
}: {
  setIsloggedIn: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [{ error, response }, handleSubmit] = useLoginViewModel();

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await handleSubmit({ ...user });
    if (response.length !== 0) {
      setIsloggedIn(true);
      <Navigate replace to={"/"} />;
    }
  };

  return (
    //TODO mobile version
    <div className="flex min-h-screen sm:p-0">
      <div className="flex w-full items-center justify-center  bg-emerald-700 p-5 md:w-1/2">
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
              <div className="relative mt-2 w-full">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={user.email}
                  placeholder="abc@abc.com"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="peer h-10 w-full border-b-2 border-gray-500 bg-inherit text-gray-900 placeholder-transparent
                     focus:border-pink-600 focus:outline-none sm:text-sm sm:leading-6"
                />
                <label
                  htmlFor="email"
                  className="absolute -top-6 left-0 justify-self-start text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                   peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  {appString.pt.email}
                </label>
              </div>
              <div className="w-full">
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={user.password}
                    required
                    placeholder="***"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    className="peer h-10 w-full border-b-2 border-gray-500 bg-inherit text-gray-900 placeholder-transparent
                     focus:border-pink-600 focus:outline-none sm:text-sm sm:leading-6"
                  />
                  <label
                    htmlFor="password"
                    className="absolute -top-6 left-0 justify-self-start text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                   peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
                  >
                    {appString.pt.password}
                  </label>
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
              </div>
              {error && (
                <p className="my-2 text-pink-500">
                  {appString.pt.invalidCredentials}
                </p>
              )}
              <DefaultButton type="submit" text={appString.pt.login} />

              <hr className="my-3 w-full border-gray-500" />
              <DefaultButton text={appString.pt.register} width="w-1/2" />
            </form>
          </div>
        </Card>
      </div>

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
