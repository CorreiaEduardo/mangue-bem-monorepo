import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useObservationViewModel from '../../ViewModel/useObservationViewModel';

import { MapContainer } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

const Observation = () => {
  const params = useParams();
  const [{ error, response }, get] = useObservationViewModel();
  const position: LatLngTuple = [51.505, -0.09];
  useEffect(() => {
    get(params.id as unknown as number);
  }, [params])

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }}></div>
      <div className="absolute inset-0 flex justify-center items-center p-5">
        <div className="bg-white bg-opacity-50 rounded h-full w-full p-5 flex flex-col gap-2">
          <div>
            <span className='text-white'><span className='font-bold'>{response?.specie?.commonName}</span> (<span className='italic underline'>{response?.specie?.taxonGenus} {response?.specie?.taxonName}</span>)</span>
          </div>
          <div className='flex gap-6'>
            <div className='w-3/5 bg-gray-400 rounded p-1'>
              <div className='bg-gray-200 h-full p-5 rounded'>
                <div>
                  <img className='rounded' src={response?.taxa?.default_photo.medium_url} alt="Imagem da espécie" style={{ width: '800px', height: '35vw', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
            <div className='w-2/5 bg-gray-400 rounded p-1'>
              <div className='bg-gray-200 h-full p-5 rounded'>
                <div className='h-full flex flex-col'>
                  <span className='text-green-700'>{response?.observation?.user?.login}</span>
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <span>Observado</span>
                      <span>{new Date(response?.observation?.time_observed_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span>Enviado</span>
                      <span>{new Date(response?.observation?.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className='h-full' style={{width: '80%'}}>
                    <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={position} />
                    </MapContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='w-3/5 bg-gray-400 rounded p-1'>
              <div className='bg-gray-200 h-full p-5 rounded'>
                <div className='flex flex-col'>
                  <span className='font-bold'>Informações</span>
                  <span>
                    {response?.specie?.description}
                  </span>
                </div>
              </div>
            </div>
            <div className='w-2/5 bg-gray-400 rounded p-1'>
              <div className='bg-gray-200 h-full p-5 rounded'>
                <div className='flex flex-col'>
                  <span className='font-bold'>Taxon</span>
                  <span>
                    {response?.specie?.description}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Observation;