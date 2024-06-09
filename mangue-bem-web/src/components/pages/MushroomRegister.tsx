import { useState } from "react";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import appString from "../../utils/appStrings";
import DefaultButton from "../DefaultButton";
import TextInput from "../TextInput";
import useMushroomRegisterViewModel from "../../ViewModel/useMushroomRegisterViewModel";
import { motion } from "framer-motion";

const MushroomRegister = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [mushroom, setMushroom] = useState({
    inaturalistId: "",
    paper: "",
  });

  const navigate = useNavigate();
  //TODO backend
  // const register = useMushroomRegisterViewModel();

  if (!isLoggedIn) navigate("/profile", { replace: true });

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //TODO backend
    // register.mutate({ mushroom });
  };

  return (
    <div className="flex min-h-screen sm:p-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full items-center justify-center bg-emerald-700 p-5 md:w-1/2"
      >
        <Card>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {appString.pt.loginWelcome}
          </h2>
          <div className="mt-5 sm:mx-4 sm:w-full sm:max-w-sm">
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
                  id="inaturalistId"
                  name="inaturalistId"
                  type="text"
                  autoComplete="inaturalistId"
                  required
                  value={mushroom.inaturalistId}
                  placeholder=" "
                  onChange={(event) => {
                    const newValue = event.replace(/\D/g, "");
                    setMushroom({ ...mushroom, inaturalistId: newValue });
                  }}
                  label="iNaturalist ID"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative mt-2 w-full"
              >
                <TextInput
                  id="artigo"
                  name="artigo"
                  type="text"
                  autoComplete="artigo"
                  required
                  value={mushroom.paper}
                  placeholder=" "
                  onChange={(newValue) =>
                    setMushroom({ ...mushroom, paper: newValue })
                  }
                  label="DOI"
                />
              </motion.div>
              <hr className="my-6 w-60 border-gray-500" />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <DefaultButton
                  type="submit"
                  text={appString.pt.registerMushroom}
                />
              </motion.div>
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
export default MushroomRegister;
