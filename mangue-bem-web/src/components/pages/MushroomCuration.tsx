// src/components/MushroomCuration.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { useMushroomCurationViewModel } from "../../ViewModel/MushroomCurationViewModel";
import { useGetMushroomData } from "../../ViewModel/usePendingMushroomViewModel";
import LoadingSpinner from "../LoadingSpinner";
import { useInView } from "react-intersection-observer";
import appString from "../../utils/appStrings";
import { confirmAlert } from "react-confirm-alert";

const MushroomCuration: React.FC = () => {
  const urlParams = new URLSearchParams();

  const { approveMushroom, reproveMushroom } = useMushroomCurationViewModel();

  const [mushroomList, fetchNextPage, isFetchingNextPage, refetch] =
    useGetMushroomData();

  const { ref, inView, entry } = useInView({
    threshold: 0.9,
  });
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  function approveMushroomFn(mushroomId: number): void {
    const options = {
      title: "Tem certeza que deseja aprovar?",
      message: "A aprovação de uma espécie não poderá ser desfeita.",
      buttons: [
        {
          label: "Sim, aprovar.",
          onClick: () => {
            approveMushroom(mushroomId);
            refetch();
          },
        },
        {
          label: "Não, cancelar.",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };

    confirmAlert(options);
  }

  function reproveMushroomFn(mushroomId: number): void {
    const options = {
      title: "Tem certeza que deseja reprovar?",
      message: "A reprovação de uma espécie não poderá ser desfeita.",
      buttons: [
        {
          label: "Sim, reprovar.",
          onClick: () => {
            reproveMushroom(mushroomId);
            refetch();
          },
        },
        {
          label: "Não, cancelar.",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };

    confirmAlert(options);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        {appString.pt.mushroomCuration}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mushroomList?.map((page: any) =>
          page?.content?.map((mushroom: any) => (
            <motion.div
              key={mushroom.id}
              className="overflow-hidden rounded-lg bg-white shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={mushroom.taxaPhoto}
                alt={mushroom.taxonName}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">
                  {mushroom.taxonGenus} {mushroom.taxonName}
                </h2>
                <p className="text-gray-600">
                  {mushroom.commonName || "Nome popular não disponível"}
                </p>
                <p className="text-sm text-gray-600">{mushroom.authors}</p>
                <p className="text-sm text-gray-600">
                  Kingdom: {mushroom.taxonKingdom}
                </p>
                <p className="text-sm text-gray-600">
                  Phylum: {mushroom.taxonPhylum}
                </p>
                <p className="text-sm text-gray-600">
                  Class: {mushroom.taxonClass}
                </p>
                <p className="text-sm text-gray-600">
                  Order: {mushroom.taxonOrder}
                </p>
                <p className="text-sm text-gray-600">
                  Family: {mushroom.taxonFamily}
                </p>
                {mushroom.doi && (
                  <p className="text-sm text-gray-600">DOI: {mushroom.doi}</p>
                )}
                <div className="mt-4 flex justify-between">
                  <motion.button
                    className="rounded bg-emerald-500 px-4 py-2 text-white"
                    whileHover={{ scale: 1.1, backgroundColor: "#34d399" }} // Lighter emerald on hover
                    onClick={() => {
                      approveMushroomFn(mushroom.id);
                    }}
                  >
                    {appString.pt.approve}
                  </motion.button>
                  <motion.button
                    className="rounded bg-pink-500 px-4 py-2 text-white"
                    whileHover={{ scale: 1.1, backgroundColor: "#f472b6" }} // Lighter pink on hover
                    onClick={() => {
                      reproveMushroomFn(mushroom.id);
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
        {isFetchingNextPage ? <LoadingSpinner /> : <div ref={ref}></div>}
      </div>
    </div>
  );
};

export default MushroomCuration;
