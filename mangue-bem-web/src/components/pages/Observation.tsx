import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useObservationViewModel from "../../ViewModel/useObservationViewModel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useInView } from "react-intersection-observer";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import mapdata from "../../utils/topojson";
import { geoCentroid } from "d3-geo";
import {
  useGetINaturalistObservation,
  useGetLiteratureObservation,
  useGetSpeciesLinkObservation,
} from "../../ViewModel/useApprovedObservationViewModel";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import appString from "../../utils/appStrings";

const Observation = () => {
  const params = useParams();
  const [{ error, response }, get] = useObservationViewModel();
  const [
    literatureObservationList,
    fetchNextLiteraturePage,
    isFetchingNextLiteraturePage,
    refetchLiterature,
  ] = useGetLiteratureObservation();

  const [
    iNaturalistObservationList,
    fetchNextINaturalistPage,
    isFetchingNextINaturalistPage,
    refetchINaturalist,
  ] = useGetINaturalistObservation();

  const [
    speciesLinkObservationList,
    fetchNextSpeciesLinkPage,
    isFetchingNextSpeciesLinkPage,
    refetchSpeciesLink,
  ] = useGetSpeciesLinkObservation();

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    get(params.id as unknown as number);
  }, [params]);

  useEffect(() => {
    if (inView) {
      fetchNextLiteraturePage();
      fetchNextINaturalistPage();
      fetchNextSpeciesLinkPage();
    }
  }, [
    fetchNextINaturalistPage,
    fetchNextLiteraturePage,
    fetchNextSpeciesLinkPage,
    inView,
  ]);

  return (
    <div className="relative h-screen bg-[#F8F8F8]">
      <div className="absolute inset-0 bg-cover bg-center"></div>
      <div className="c absolute inset-0 flex items-center justify-center p-5">
        <div className="flex h-full w-full flex-col gap-2 rounded bg-white bg-opacity-10 p-5">
          <div className="flex gap-6">
            <div className="h-fit w-1/3 rounded border-gray-400 p-1">
              <div className="rounded border-[1px] border-solid border-gray-200 bg-white p-3">
                <div>
                  <img
                    className="rounded"
                    src={response?.taxa?.default_photo.medium_url}
                    alt="Imagem da espécie"
                    style={{
                      width: "100%",
                      height: "20vw",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-1/3 flex-col gap-5">
              <div className="flex justify-center">
                <span className="text-lg text-emerald-500">
                  <span className="font-bold">
                    {response?.taxonGenus} {response?.taxonName}
                  </span>{" "}
                  (
                  <span className="italic underline">
                    {response?.commonName}
                  </span>
                  )
                </span>
              </div>
              <div className="rounded border-[1px] border-solid border-gray-200 bg-white p-5">
                <div className="flex flex-col">
                  {/* <span className='font-bold'>Informações</span> */}
                  <span>{response?.description}</span>
                </div>
              </div>
              <div className="rounded border-[1px] border-solid border-gray-200 bg-white p-5">
                <div className="flex flex-col">
                  <span className="font-bold">Classificações</span>
                  <span>{/* TODO: icons */}</span>
                  <small>id_especie: {response?.id}</small>
                  <small>Filo: {response?.taxonPhylum}</small>
                  <small>Ordem: {response?.taxonOrder}</small>
                </div>
              </div>
            </div>
            <div className="h-fit w-1/3 rounded border-gray-400 p-1">
              <div className="h-fit rounded border-[1px] border-solid border-gray-200 bg-white p-5">
                <div className="flex h-full flex-col">
                  <div className="flex justify-center">Geolocalização</div>
                  <div>
                    <ComposableMap
                      projection="geoMercator"
                      style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "2px",
                      }}
                      fill="white"
                      stroke="black"
                      stroke-width={0.1}
                    >
                      <ZoomableGroup center={[-54, -15.1]} zoom={9}>
                        <Geographies geography={mapdata.data}>
                          {(geographies: { geographies: any[] }) => {
                            return (
                              <>
                                {geographies.geographies.map((geo) => {
                                  return (
                                    <>
                                      <Geography
                                        className={"geo-" + geo.id}
                                        key={geo.rsmKey}
                                        geography={geo}
                                      />
                                    </>
                                  );
                                })}

                                {geographies.geographies.map((geo) => {
                                  const provinceCenter = geoCentroid(geo);
                                  return (
                                    <Marker
                                      key={geo.rsmKey}
                                      coordinates={provinceCenter}
                                    >
                                      {response?.observation?.summary.some(
                                        (item: { uf: any }) =>
                                          item.uf === geo.id,
                                      ) && (
                                        <circle
                                          r={2}
                                          fill="#F00"
                                          stroke="#fff"
                                          strokeWidth={2}
                                        />
                                      )}
                                      <text
                                        style={{
                                          fill: "black",
                                          strokeWidth: 0,
                                          fontSize: "3px",
                                        }}
                                        textAnchor="middle"
                                      >
                                        {geo.id}
                                      </text>
                                    </Marker>
                                  );
                                })}
                              </>
                            );
                          }}
                        </Geographies>
                      </ZoomableGroup>
                    </ComposableMap>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex w-full flex-col">
            <Tabs>
              <TabList className="flex w-full flex-row">
                <Tab className="flex-grow border border-white bg-emerald-700 px-4 py-2 text-center font-bold text-white transition-colors duration-300 hover:bg-emerald-500 focus:bg-emerald-400 focus:text-black">
                  Literatura
                </Tab>
                <Tab className="flex-grow border border-white bg-emerald-700 px-4 py-2 text-center font-bold text-white transition-colors duration-300 hover:bg-emerald-500 focus:bg-emerald-400 focus:text-black">
                  SpeciesLink
                </Tab>
                <Tab className="flex-grow border border-white bg-emerald-700 px-4 py-2 text-center font-bold text-white transition-colors duration-300 hover:bg-emerald-500 focus:bg-emerald-400 focus:text-black">
                  iNaturalist
                </Tab>
              </TabList>
              <TabPanel>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                  {literatureObservationList?.map((page: any) =>
                    page?.content?.map((observation: any) => (
                      <motion.div
                        key={observation.id}
                        className="mt-2 w-80 overflow-hidden rounded-lg border-2 bg-gray-50 shadow-md"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="p-4">
                          <h2 className="text-lg font-bold">
                            {observation.specie.taxonGenus}{" "}
                            {observation.specie.taxonName}
                          </h2>
                          <p className="text-gray-600">
                            {observation.specie.commonName ||
                              "Nome popular não disponível"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {observation.specie.authors}
                          </p>
                          <p className="text-sm text-gray-600">
                            Estado: {observation.brazilianFederativeUnit}
                          </p>
                          <p className="text-sm text-gray-600">
                            Lat: {observation.lat ? observation.lat : "-"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Lng: {observation.lng ? observation.lng : "-"}
                          </p>
                        </div>
                      </motion.div>
                    )),
                  ) ?? (
                    <div className="mt-2 w-screen text-center text-xl font-bold text-gray-500">
                      Nenhuma observação encontrada para essa espécie!
                    </div>
                  )}
                  {isFetchingNextLiteraturePage ? (
                    <LoadingSpinner />
                  ) : (
                    <div ref={ref}></div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {speciesLinkObservationList?.map((page: any) =>
                    page?.content?.map((observation: any) => (
                      <motion.div
                        key={observation.id}
                        className="mt-2 w-80 overflow-hidden rounded-lg border-2 bg-gray-50 shadow-md"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="p-4">
                          <h2 className="text-lg font-bold">
                            {observation.specie.taxonGenus}{" "}
                            {observation.specie.taxonName}
                          </h2>
                          <p className="text-gray-600">
                            {observation.specie.commonName ||
                              "Nome popular não disponível"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {observation.specie.authors}
                          </p>
                          <p className="text-sm text-gray-600">
                            Estado: {observation.brazilianFederativeUnit}
                          </p>
                          <p className="text-sm text-gray-600">
                            Lat: {observation.lat ? observation.lat : "-"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Lng: {observation.lng ? observation.lng : "-"}
                          </p>
                        </div>
                      </motion.div>
                    )),
                  ) ?? (
                    <div className="mt-2 w-screen text-center text-xl font-bold text-gray-500">
                      Nenhuma observação encontrada para essa espécie!
                    </div>
                  )}
                  {isFetchingNextSpeciesLinkPage ? (
                    <LoadingSpinner />
                  ) : (
                    <div ref={ref}></div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {iNaturalistObservationList?.map((page: any) =>
                    page?.content?.map((observation: any) => (
                      <motion.div
                        key={observation.id}
                        className="mt-2 w-80 overflow-hidden rounded-lg border-2 bg-gray-50 shadow-md"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="p-4">
                          <h2 className="text-lg font-bold">
                            {observation.specie.taxonGenus}{" "}
                            {observation.specie.taxonName}
                          </h2>
                          <p className="text-gray-600">
                            {observation.specie.commonName ||
                              "Nome popular não disponível"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {observation.specie.authors}
                          </p>
                          <p className="text-sm text-gray-600">
                            Estado: {observation.brazilianFederativeUnit}
                          </p>
                          <p className="text-sm text-gray-600">
                            Lat: {observation.lat ? observation.lat : "-"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Lng: {observation.lng ? observation.lng : "-"}
                          </p>
                        </div>
                      </motion.div>
                    )),
                  ) ?? (
                    <div className="mt-2 w-screen text-center text-xl font-bold text-gray-500">
                      Nenhuma observação encontrada para essa espécie!
                    </div>
                  )}
                  {isFetchingNextINaturalistPage ? (
                    <LoadingSpinner />
                  ) : (
                    <div ref={ref}></div>
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Observation;
