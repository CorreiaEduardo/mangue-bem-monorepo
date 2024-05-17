import { useState } from "react";
import useLoginViewModel from "../ViewModel/useLoginViewModel";
import appString from "../utils/appStrings";
import Modal from "./Modal";
export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [{ user, error }, handleSubmit] = useLoginViewModel();

  return (
    <>
      <Modal>
        <div className="flex h-[50rem]  min-h-[26rem] w-full flex-col items-center justify-center rounded-3xl bg-emerald-50 p-5 py-5 shadow-xl shadow-gray-300 sm:w-[28%] sm:p-0">
          <div className="flex flex-col items-center sm:mx-auto sm:max-w-sm md:w-full">
            <img
              className="h-40 w-40 overflow-hidden rounded-full border-4 border-transparent drop-shadow-[0px_3px_rgba(162,166,171,1)]"
              src="assets/login_img.jpg"
              alt="Login Image"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {appString.pt.login}
            </h2>
          </div>

          <div className="mt-5 sm:mx-4 sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit({ ...user });
              }}
            >
              <div>
                <div className="relative mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    placeholder="abc@abc.com"
                    onChange={(e) => setEmail(e.target.value)}
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
              </div>

              <div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-500 bg-inherit text-gray-900 placeholder-transparent
                    focus:border-pink-600 focus:outline-none sm:text-sm sm:leading-6"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 top-[0.5rem] justify-self-start text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
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
                <p className="text-pink-500">
                  Error: Invalid username or password
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="my-3 flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 ease-in hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {appString.pt.signIn}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
