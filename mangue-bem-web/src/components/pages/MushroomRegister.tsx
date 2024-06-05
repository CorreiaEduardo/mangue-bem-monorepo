import { Dispatch, SetStateAction, useState } from "react";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import appString from "../../utils/appStrings";
import DefaultButton from "../DefaultButton";
import TextInput from "../TextInput";

const MushroomRegister = ({
  setIsloggedIn,
}: {
  setIsloggedIn: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const [mushroom, setMushroom] = useState({
    inaturalistId: "",
    artigo: "",
  });
  const navigate = useNavigate();

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    //TODO mobile version
    <div className="flex min-h-screen sm:p-0">
      <div className="flex w-full items-center justify-center  bg-emerald-700 p-5 md:w-1/2">
        <Card>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {appString.pt.register}
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
                  id="inaturalistId
                  "
                  name="inaturalistId
                  "
                  type="text
                  "
                  autoComplete="inaturalistId
                  "
                  required
                  value={mushroom.inaturalistId}
                  placeholder="abc@abc.com"
                  onChange={(newValue) => newValue}
                  label="iNaturalist ID"
                />
              </div>
              <div className="relative mt-2 w-full">
                <TextInput
                  id="artigo"
                  name="artigo"
                  type="artigo"
                  autoComplete="artigo"
                  required
                  value={mushroom.artigo}
                  placeholder="abc@abc.com"
                  onChange={(newValue) => newValue}
                  label="Arigo"
                />
                {/* {register.isError && (
                <p className="my-2 text-pink-500">
                  {appString.pt.invalidCredentials}
                </p>
              )} */}
              </div>
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
export default MushroomRegister;
