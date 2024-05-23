import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useObservationViewModel from '../../ViewModel/useObservationViewModel';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import { ComposableMap, ZoomableGroup, Geographies, Geography, Marker } from 'react-simple-maps';
import mapdata from '../../utils/topojson';
import { geoCentroid } from 'd3-geo';

const Observation = () => {
  const params = useParams();
  const [{ error, response }, get] = useObservationViewModel();

  useEffect(() => {
    get(params.id as unknown as number);
  }, [params])

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }}></div>
      <div className="absolute inset-0 flex justify-center items-center p-5">
        <div className="bg-white bg-opacity-50 rounded h-full w-full p-5 flex flex-col gap-2">
          <div className='flex gap-6'>
            <div className='w-1/3 bg-gray-400 h-fit rounded p-1'>
              <div className='bg-gray-200 p-3 rounded'>
                <div>
                  <img className='rounded' src={response?.taxa?.default_photo.medium_url} alt="Imagem da espécie" style={{ width: '100%', height: '20vw', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
            <div className='w-1/3 flex flex-col gap-5'>
              <div className='flex justify-center'>
                <span className='text-white text-lg'><span className='font-bold'>{response?.specie?.commonName}</span> (<span className='italic underline'>{response?.specie?.taxonGenus} {response?.specie?.taxonName}</span>)</span>
              </div>
              <div className='bg-gray-200 p-5 rounded'>
                <div className='flex flex-col'>
                  {/* <span className='font-bold'>Informações</span> */}
                  <span>
                    {response?.specie?.description}
                  </span>
                </div>
              </div>
              <div className='bg-gray-200 p-5 rounded'>
                <div className='flex flex-col'>
                  <span className='font-bold'>Classificações</span>
                  <span>
                    {/* TODO: icons */}
                  </span>
                  <small>
                    id_especie: {response?.specie?.id}
                  </small>
                  <small>
                    id_observação: {response?.id}
                  </small>
                </div>
              </div>
            </div>
            <div className='w-1/3 bg-gray-400 h-fit rounded p-1'>
              <div className='bg-gray-200 h-fit p-5 rounded'>
                <div className='h-full flex flex-col'>
                  <div className='flex justify-center'>Geolocalização</div>
                  <div>
                    <ComposableMap
                      projection='geoMercator'
                      style={{ backgroundColor: '#e5e7eb', borderRadius: '10px' }}
                      fill='white'
                      stroke='black'
                      stroke-width={0.1}
                    >
                      <ZoomableGroup center={[-54, -15.1]} zoom={9}>
                        <Geographies geography={mapdata.data}>
                          {(geographies: { geographies: any[]; }) => {
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
                                    <Marker key={geo.rsmKey} coordinates={provinceCenter}>
                                      {response?.observation?.summary.some((item: { uf: any; }) => item.uf === geo.id) &&
                                      <circle r={2} fill="#F00" stroke="#fff" strokeWidth={2} />}
                                      <text
                                        style={{
                                          fill: 'black',
                                          strokeWidth: 0,
                                          fontSize: '3px'
                                        }}
                                        textAnchor='middle'
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
          <div className='flex flex-col gap-6'>
            <Accordion allowZeroExpanded>
              <AccordionItem key="literatura">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Literatura
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {response?.observation?.literature.map((item: any) => {
                    return (
                      <div>{item.brazilianFederativeUnit}</div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <Accordion allowZeroExpanded>
              <AccordionItem key="literatura">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    SpeciesLink
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {response?.observation?.specieslink.map((item: any) => {
                    return (
                      <div>{item.brazilianFederativeUnit}</div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <Accordion allowZeroExpanded>
              <AccordionItem key="literatura">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    INaturalist
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {response?.observation?.inaturalist.map((item: any) => {
                    return (
                      <div>{item.brazilianFederativeUnit}</div>
                    );
                  })}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Observation;