import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useObservationViewModel from "../../ViewModel/useObservationViewModel";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import mapdata from "../../utils/topojson";
import { geoCentroid } from "d3-geo";

const Observation = () => {
  const params = useParams();
  const [{ error, response }, get] = useObservationViewModel();

  useEffect(() => {
    get(params.id as unknown as number);
  }, [params]);

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="flex h-full w-full flex-col gap-2 rounded bg-white bg-opacity-10 p-5">
          <div className="flex gap-6">
            <div className="h-fit w-1/3 rounded bg-gray-400 p-1">
              <div className="rounded bg-gray-200 p-3">
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
                <span className="text-lg text-white">
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
              <div className="rounded bg-gray-200 p-5">
                <div className="flex flex-col">
                  {/* <span className='font-bold'>Informações</span> */}
                  <span>{response?.description}</span>
                </div>
              </div>
              <div className="rounded bg-gray-200 p-5">
                <div className="flex flex-col">
                  <span className="font-bold">Classificações</span>
                  <span>{/* TODO: icons */}</span>
                  <small>id_especie: {response?.id}</small>
                </div>
              </div>
            </div>
            <div className="h-fit w-1/3 rounded bg-gray-400 p-1">
              <div className="h-fit rounded bg-gray-200 p-5">
                <div className="flex h-full flex-col">
                  <div className="flex justify-center">Geolocalização</div>
                  <div>
                    <ComposableMap
                      projection="geoMercator"
                      style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "10px",
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
              <TabPanel>{"test1"}</TabPanel>
              <TabPanel>{"test21"}</TabPanel>
              <TabPanel>{"test13"}</TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Observation;
