// @ts-nocheck
import React, { useEffect } from "react";
import "../styles/Map.css";
import {
  adjustColorIntensity,
  getSpeciesCounter,
  getStateIdFromName,
} from "../ViewModel/HeatMapViewModel";

function Map() {
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
  return (
    <div>
      <div className="map">
        <h3>
          Selecione um <b>estado</b> na <b>lista</b> ao lado, ou clique nele
          dentro do
          <b> mapa</b>
        </h3>
        <button
          onClick={() => {
            getSpeciesCounter().forEach((specie) => {
              const stateColor = adjustColorIntensity(
                "#00ad28",
                specie.speciesCount
              );
              console.log(stateColor)
              simplemaps_countrymap_mapdata.state_specific[
                getStateIdFromName(specie.state)
              ].description = `Nº de Espécies: ${specie.speciesCount}`;
              simplemaps_countrymap_mapdata.state_specific[
                getStateIdFromName(specie.state)
              ].color = stateColor;
            });
            
            simplemaps_countrymap.refresh();
          }}
        >
          test
        </button>
        <div id="map"></div>
      </div>
    </div>
  );

export default Map;
