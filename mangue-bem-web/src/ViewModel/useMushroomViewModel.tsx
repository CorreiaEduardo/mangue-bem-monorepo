import useGetApi from "./base/useApi";

const useGetMushroomData = () => {
  const [{ data, isLoading, isError }, setUrl] = useGetApi(
    "http://localhost:8080/v1/species",
    {},
  );
  return data;
};

export default useGetMushroomData;
