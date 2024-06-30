// src/components/MushroomCuration.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { useObservationCurationViewModel } from "../../ViewModel/ObservationCurationViewModel";
import { useGetLiteratureObservationData, useGetINaturalistObservationData } from "../../ViewModel/usePendingObservationViewModel";
import LoadingSpinner from "../LoadingSpinner";
import { useInView } from "react-intersection-observer";
import appString from "../../utils/appStrings";
import { confirmAlert } from 'react-confirm-alert';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const ObservationCuration: React.FC = () => {
  const urlParams = new URLSearchParams();

  const { approveObservation, reproveObservation } = useObservationCurationViewModel();

  const [literatureObservationList, fetchNextLiteraturePage, isFetchingNextLiteraturePage, refetchLiterature] =
    useGetLiteratureObservationData();

  const [iNaturalistObservationList, fetchNextINaturalistPage, isFetchingNextINaturalistPage, refetchINaturalist] =
    useGetINaturalistObservationData();

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (inView) {
      fetchNextLiteraturePage();
      fetchNextINaturalistPage();
    }
  }, [fetchNextINaturalistPage, fetchNextLiteraturePage, inView]);

  function approveObservationFn(id: number): void {
    const options = {
      title: 'Tem certeza que deseja aprovar?',
      message: 'A aprovação de uma observação não poderá ser desfeita.',
      buttons: [
        {
          label: 'Sim, aprovar.',
          onClick: () => {
            approveObservation(id);
            refetchLiterature();
            refetchINaturalist();
          }
        },
        {
          label: 'Não, cancelar.',
          onClick: () => { }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => { },
      afterClose: () => {
        refetchLiterature();
        refetchINaturalist();
      },
      onClickOutside: () => { },
      onKeypress: () => { },
      onKeypressEscape: () => { },
      overlayClassName: "overlay-custom-class-name"
    };

    confirmAlert(options);
  }

  function reproveObservationFn(id: number): void {
    const options = {
      title: 'Tem certeza que deseja reprovar?',
      message: 'A reprovação de uma observação não poderá ser desfeita.',
      buttons: [
        {
          label: 'Sim, reprovar.',
          onClick: () => {
            reproveObservation(id);
            refetchLiterature();
            refetchINaturalist();
          }
        },
        {
          label: 'Não, cancelar.',
          onClick: () => { }
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => { },
      afterClose: () => {
        refetchLiterature();
        refetchINaturalist();
      },
      onClickOutside: () => { },
      onKeypress: () => { },
      onKeypressEscape: () => { },
      overlayClassName: "overlay-custom-class-name"
    };

    confirmAlert(options);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {appString.pt.observationCuration}
      </h1>
      <Tabs defaultFocus>
        <TabList className="flex w-full flex-row">
          <Tab selectedClassName="bg-emerald-400 text-black" className="flex-grow border border-white bg-emerald-700 px-4 py-2 text-center font-bold text-white transition-colors duration-300 hover:bg-emerald-500 focus:bg-emerald-400 focus:text-black">
            Literatura
          </Tab>
          <Tab selectedClassName="bg-emerald-400 text-black" className="flex-grow border border-white bg-emerald-700 px-4 py-2 text-center font-bold text-white transition-colors duration-300 hover:bg-emerald-500 focus:bg-emerald-400 focus:text-black">
            iNaturalist
          </Tab>
        </TabList>
        <TabPanel>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {literatureObservationList?.map((page: any) =>
              page?.content?.map((observation: any) => (
                <motion.div
                  key={observation.id}
                  className="overflow-hidden rounded-lg bg-white shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-4">
                    <h2 className="text-lg font-bold">
                      {observation.specie.taxonGenus} {observation.specie.taxonName}
                    </h2>
                    <p className="text-gray-600">
                      {observation.specie.commonName || "Nome popular não disponível"}
                    </p>
                    <p className="text-sm text-gray-600">{observation.specie.authors}</p>
                    <p className="text-sm text-gray-600">
                      Estado: {observation.brazilianFederativeUnit}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lat: {observation.lat ? observation.lat : '-'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lng: {observation.lng ? observation.lng : '-'}
                    </p>
                    <div className="mt-4 flex justify-between">
                      <motion.button
                        className="rounded bg-emerald-500 px-4 py-2 text-white"
                        whileHover={{ scale: 1.1, backgroundColor: "#34d399" }} // Lighter emerald on hover
                        onClick={() => {
                          approveObservationFn(observation.id);
                        }}
                      >
                        {appString.pt.approve}
                      </motion.button>
                      <motion.button
                        className="rounded bg-pink-500 px-4 py-2 text-white"
                        whileHover={{ scale: 1.1, backgroundColor: "#f472b6" }} // Lighter pink on hover
                        onClick={() => {
                          reproveObservationFn(observation.id);
                        }}
                      >
                        {appString.pt.reprove}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )),
            ) ?? (
                <div className="text-center text-xl text-gray-500">
                  Sem pendências.
                </div>
              )}
            {isFetchingNextLiteraturePage ? <LoadingSpinner /> : <div ref={ref}></div>}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {iNaturalistObservationList?.map((page: any) =>
              page?.content?.map((observation: any) => (
                <motion.div
                  key={observation.id}
                  className="overflow-hidden rounded-lg bg-white shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={observation.specie.taxaPhoto}
                    alt={observation.specie.taxonName}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">
                      {observation.specie.taxonGenus} {observation.specie.taxonName}
                    </h2>
                    <p className="text-gray-600">
                      {observation.specie.commonName || "Nome popular não disponível"}
                    </p>
                    <p className="text-sm text-gray-600">{observation.specie.authors}</p>
                    <p className="text-sm text-gray-600">
                      Estado: {observation.brazilianFederativeUnit}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lat: {observation.lat ? observation.lat : '-'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Lng: {observation.lng ? observation.lng : '-'}
                    </p>
                    <div className="mt-4 flex justify-between">
                      <motion.button
                        className="rounded bg-emerald-500 px-4 py-2 text-white"
                        whileHover={{ scale: 1.1, backgroundColor: "#34d399" }} // Lighter emerald on hover
                        onClick={() => {
                          approveObservationFn(observation.id);
                        }}
                      >
                        {appString.pt.approve}
                      </motion.button>
                      <motion.button
                        className="rounded bg-pink-500 px-4 py-2 text-white"
                        whileHover={{ scale: 1.1, backgroundColor: "#f472b6" }} // Lighter pink on hover
                        onClick={() => {
                          reproveObservationFn(observation.id);
                        }}
                      >
                        {appString.pt.reprove}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )),
            ) ?? (
                <div className="text-center text-xl text-gray-500">
                  Sem pendências.
                </div>
              )}
            {isFetchingNextINaturalistPage ? <LoadingSpinner /> : <div ref={ref}></div>}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ObservationCuration;
