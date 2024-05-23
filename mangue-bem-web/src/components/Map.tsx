// @ts-nocheck
import React, { useEffect } from "react";
import "../styles/Map.css";
import {
  adjustColorIntensity,
  generateRandomData,
  getSpeciesCounter,
  getStateIdFromName,
} from "../ViewModel/HeatMapViewModel";

function Map({selectedBem}: props) {
  useEffect(() => {
    const handleScriptLoad = () => {
      // Agora o script está carregado, podemos acessar a função
      console.log("asdpasd");
      if (
        typeof simplemaps_countrymap !== "undefined" &&
        simplemaps_countrymap.refresh
      ) {
        simplemaps_countrymap_mapdata.state_specific[
          states["Bahia"]
        ].state_description = "BORA BAHEA";
        simplemaps_countrymap.refresh();
      }
    };
    // Adicionando um listener para o evento load do script
    document
      .getElementById("countrymap-script")
      ?.addEventListener("load", handleScriptLoad);

    // Removendo o listener quando o componente é desmontado
    return () => {
      document
        .getElementById("countrymap-script")
        ?.removeEventListener("load", handleScriptLoad);
    };
  }, []);

  useEffect(() => {
    const attributeData = async () => {
      if(selectedBem === 0) await new Promise(resolve => setTimeout(resolve, 1000));
      const randomSpeciesData = generateRandomData(selectedBem)
      randomSpeciesData.forEach((specie) => {
        simplemaps_countrymap_mapdata.state_specific[
          getStateIdFromName(specie.state)
        ].description = `Nº de Espécies: ${specie.speciesCount}`;
        simplemaps_countrymap_mapdata.state_specific[
          getStateIdFromName(specie.state)
        ].color = specie.color;
      })
      simplemaps_countrymap.refresh();
    }
    attributeData()
  },[selectedBem])

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
