import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useObservationViewModel from "../../ViewModel/useObservationViewModel";
import TextInput from "../TextInput";
import useMushroomUpdateViewModel from "../../ViewModel/useMushroomUpdateViewModel";
import { motion } from "framer-motion";

interface Mushroom {
  taxonKingdom: string;
  taxonPhylum: string;
  taxonClass: string;
  taxonOrder: string;
  taxonFamily: string;
  taxonGenus: string;
  taxonName: string;
  bemClassification: string;
  commonName: string;
  description: string;
  IUCN: string;
  authors: string;
  brazilianType: string;
  brazilianTypeSynonym: string;
  iNaturalistId: string;
  speciesLinkId: string;
  mushroomGroup: string;
  // occurrenceSeasonStart: string;
  // occurrenceSeasonEnd: string;
  flavor: string;
  keywords: string;
  doi: string;
}

const EditSpecie = () => {
  const params = useParams();
  const [{ response }, get] = useObservationViewModel();
  const navigate = useNavigate();
  const { update, error, success } = useMushroomUpdateViewModel();

  const [mushroom, setMushroom] = useState<Mushroom>({
    taxonKingdom: '',
    taxonPhylum: '',
    taxonClass: '',
    taxonOrder: '',
    taxonFamily: '',
    taxonGenus: '',
    taxonName: '',
    bemClassification: '',
    commonName: '',
    description: '',
    IUCN: '',
    authors: '',
    brazilianType: '',
    brazilianTypeSynonym: '',
    iNaturalistId: '',
    speciesLinkId: '',
    mushroomGroup: '',
    // occurrenceSeasonStart: '',
    // occurrenceSeasonEnd: '',
    flavor: '',
    keywords: '',
    doi: '',
  });

  const labels = {
    taxonKingdom: 'Reino',
    taxonPhylum: 'Filo',
    taxonClass: 'Classe',
    taxonOrder: 'Ordem',
    taxonFamily: 'Familia',
    taxonGenus: 'Genero',
    taxonName: 'Nome',
    bemClassification: 'Classificação BEM',
    commonName: 'Nome popular',
    description: 'Descrição',
    IUCN: 'IUCN',
    authors: 'Autores',
    brazilianType: 'Tipo Brasileiro',
    brazilianTypeSynonym: 'Tipo Brasileiro - Sinonimo',
    iNaturalistId: 'ID INaturalist',
    speciesLinkId: 'ID Species Link',
    mushroomGroup: 'Classificação estrutural',
    // occurrenceSeasonStart: 'Data inicio de temporada',
    // occurrenceSeasonEnd: 'Data fim de temporada',
    flavor: 'Sabor',
    keywords: 'Palavras-chave',
    doi: 'DOI'
  };

  const fetchedRef = useRef(false);

  const fetchMushroom = useCallback(async (id: number) => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      get(id);
    }
  }, [get]);

  useEffect(() => {
    fetchMushroom(params.id as unknown as number);
  }, [params.id, fetchMushroom]);

  useEffect(() => {
    if (!!response) {
      setMushroom({
        taxonKingdom: response.taxonKingdom,
        taxonPhylum: response.taxonPhylum,
        taxonClass: response.taxonClass,
        taxonOrder: response.taxonOrder,
        taxonFamily: response.taxonFamily,
        taxonGenus: response.taxonGenus,
        taxonName: response.taxonName,
        bemClassification: response.bemClassification,
        commonName: response.commonName,
        description: response.description,
        IUCN: response.IUCN,
        authors: response.authors,
        brazilianType: response.brazilianType,
        brazilianTypeSynonym: response.brazilianTypeSynonym,
        iNaturalistId: response.iNaturalistId,
        speciesLinkId: response.speciesLinkId,
        mushroomGroup: response.mushroomGroup,
        flavor: response.flavor,
        keywords: response.keywords,
        doi: response.doi,
      });
    }
  }, [response]);

  const handleFormSubmit = () => {
    update.mutate({ id: params.id as unknown as number, mushroom });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMushroom({ ...mushroom, [name]: value });
  };

  return (
    <div className="flex gap-6 p-3">
      <div className="h-fit w-1/3 rounded border-gray-400 flex flex-col gap-4">
        <div className="rounded border-gray-200 border-solid border-[1px] bg-white p-3">
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-bold">Cadastrado em:</span>
            <span>{response?.createdAt}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Última modificação:</span>
            <span>{response?.updatedAt}</span>
          </div>
          {!!response?.reviserEmail ? (
            <div className="flex flex-col">
              <span className="font-bold">Aprovado por:</span>
              <span>{response?.reviserEmail}</span>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-2 text-pink-500"
            >
              Não foi possivel atualizar a espécie
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="my-2 text-emerald-500"
            >
              Alterações salvas com sucesso.
            </motion.p>
          )}
          <div className="flex justify-between">
            <button className="rounded bg-pink-500 px-4 py-2 text-white" onClick={() => navigate(-1)}>Voltar</button>
            <button className="rounded bg-emerald-500 px-4 py-2 text-white" onClick={() => handleFormSubmit()}>Salvar</button>
          </div>
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-5">
        <div className="rounded border-gray-200 border-solid border-[1px] bg-white p-5">
          <div className="flex flex-col gap-8">
            <span>Editar espécie</span>
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
              action="#"
              method="PUT"
              onSubmit={handleFormSubmit}
            >
              {(Object.keys(mushroom) as (keyof Mushroom)[]).map((key) => {
                if (key === 'mushroomGroup') {
                  return (
                    <div key={key} className="flex flex-col gap-1">
                      <label htmlFor={key}>{labels[key]}</label>
                      <select
                        id={key}
                        name={key}
                        value={mushroom[key]}
                        onChange={handleChange}
                        className="border border-gray-600"
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="VEINED">VEINED</option>
                        <option value="GILLED">GILLED</option>
                        <option value="BOLETES">BOLETES</option>
                        <option value="TOOTHED">TOOTHED</option>
                        <option value="CLUBS">CLUBS</option>
                        <option value="CORALS">CORALS</option>
                        <option value="POLYPORES">POLYPORES</option>
                        <option value="JELLY_FUNGI">JELLY_FUNGI</option>
                        <option value="PUFFBALLS">PUFFBALLS</option>
                        <option value="BIRDS_NEST_FUNGI">BIRDS_NEST_FUNGI</option>
                        <option value="MORELS_AND_SIMILAR">MORELS_AND_SIMILAR</option>
                        <option value="CUPS">CUPS</option>
                        <option value="TRUFFLES">TRUFFLES</option>
                        <option value="OTHER">OTHER</option>
                      </select>
                    </div>
                  );
                }
                // else if (key === 'occurrenceSeasonStart' || key === 'occurrenceSeasonEnd') {
                //   return (
                //     <TextInput
                //       key={key}
                //       id={key}
                //       name={key}
                //       type="month"
                //       autoComplete={key}
                //       required
                //       value={mushroom[key]}
                //       placeholder=" "
                //       onChangeEvent={handleChange}
                //       label={labels[key]}
                //     />
                //   );
                // }
                else {
                  return (
                    <TextInput
                      key={key}
                      id={key}
                      name={key}
                      type="text"
                      autoComplete={key}
                      required
                      value={mushroom[key]}
                      placeholder=" "
                      onChangeEvent={handleChange}
                      label={labels[key]}
                    />
                  );
                }
              })}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSpecie;