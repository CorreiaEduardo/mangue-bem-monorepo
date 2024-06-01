import { Dispatch, SetStateAction, useState } from "react";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import appString from "../../utils/appStrings";
import DefaultButton from "../DefaultButton";
import TextInput from "../TextInput";
import useUserRegisterViewModel from "../../ViewModel/useUserRegisterViewModel";

const UserRegister = ({
  setIsloggedIn,
}: {
  setIsloggedIn: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const register = useUserRegisterViewModel();
  const navigate = useNavigate();

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register.mutate({ user });
  };
  if (register.isSuccess) {
    setIsloggedIn(true);
    navigate("/profile", { replace: true });
  }

  return (
    //TODO mobile version
    <div className="flex min-h-screen sm:p-0">
      <div className="flex w-full items-center justify-center  bg-emerald-700 p-5 md:w-1/2">
        <Card>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {appString.pt.registerWelcome}
          </h2>
          <div className="mt-5  sm:mx-4 sm:w-full sm:max-w-sm">
            <form
              className="flex flex-col items-center justify-center space-y-6"
              action="#"
              method="POST"
              onSubmit={handleFormSubmit}
            >
              <div className="relative mt-2 w-full">
                <TextInput
                  id="name
                  "
                  name="name
                  "
                  type="text
                  "
                  autoComplete="name
                  "
                  required
                  value={user.name}
                  placeholder="abc@abc.com"
                  onChange={(newValue) => setUser({ ...user, name: newValue })}
                  label="Nome"
                />
              </div>
              <div className="relative mt-2 w-full">
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
              </div>
              <div className="relative mt-2 w-full">
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
              </div>

              <div className="relative mt-2 w-full">
                <TextInput
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  autoComplete="current-passwordConfirmation"
                  value={user.passwordConfirmation}
                  required
                  placeholder="***"
                  onChange={(newValue) =>
                    setUser({ ...user, passwordConfirmation: newValue })
                  }
                  label="Confirme sua senha"
                />
              </div>
              {user.passwordConfirmation !== user.password && (
                <p className="my-2 text-pink-500">
                  {appString.pt.invalidPasswordConfirm}
                </p>
              )}
              {register.isError && (
                <p className="my-2 text-pink-500">
                  {appString.pt.invalidCredentials}
                </p>
              )}
              <hr className="my-6 w-60 border-gray-500" />
              <DefaultButton type="submit" text={appString.pt.register} />
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

export default UserRegister;
