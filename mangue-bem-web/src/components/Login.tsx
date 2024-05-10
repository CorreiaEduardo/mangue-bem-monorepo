import appString from "../utils/appStrings";
export default function Login() {
  return (
    <>
      <div className="flex min-h-full justify-center px-6 py-12 lg:px-8">
        <div className="flex h-[30rem]  min-h-[26rem] w-[28%] flex-col rounded-3xl bg-emerald-50 py-5 shadow-xl shadow-gray-300">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 overflow-hidden rounded-full border-4 border-transparent "
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {appString.pt.login}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="relative mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="abc@abc.com"
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
                    required
                    className="peer h-10 w-full border-b-2 border-gray-500 bg-inherit text-gray-900 placeholder-transparent
                    focus:border-pink-600 focus:outline-none sm:text-sm sm:leading-6"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 top-[0.99rem] justify-self-start text-sm text-gray-400 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
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

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-300 ease-in hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-lg hover:shadow-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {appString.pt.signIn}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
