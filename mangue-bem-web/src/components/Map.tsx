// @ts-nocheck
import React, { useEffect, useState } from "react";
import "../styles/Map.css";
import {
  getSpeciesCounter,
  getStateIdFromName,
} from "../ViewModel/HeatMapViewModel";

function Map({selectedBem}: props) {
  const [speciesCounter, setSpeciesCounter] = useState([])

  useEffect(() => {
    const attributeData = async () => {
      if(selectedBem === 0) await new Promise(resolve => setTimeout(resolve, 1000));
      getSpeciesCounter(setSpeciesCounter, selectedBem)
    }
    attributeData()
  },[selectedBem])

  useEffect(() => {
    if(speciesCounter.length > 0) {
      speciesCounter.forEach((specie) => {
        if(specie.state) {
          console.log(specie)
          simplemaps_countrymap_mapdata.state_specific[
            getStateIdFromName(specie.state)
          ].description = `Nº de Espécies: ${specie.speciesCount}`;
          simplemaps_countrymap_mapdata.state_specific[
            getStateIdFromName(specie.state)
          ].color = specie.stateColor;
        }
      })
      console.log(simplemaps_countrymap_mapdata.state_specific)
      simplemaps_countrymap.refresh();
    }
  },[speciesCounter]) 

  return (
    <div className="mt-2 rounded-md">
      <div className="map flex flex-col items-center">
        <h3>
          Selecione um <b className="text-green-700">BEM</b> para verificar a
          quantidade de amostras que existem em cada{" "}
          <b className="text-green-700">estado</b>
        </h3>
        <div id="map" style={{marginRight: "-100px"}}></div>
      </div>
    </div>
  );
}
export default Map;
