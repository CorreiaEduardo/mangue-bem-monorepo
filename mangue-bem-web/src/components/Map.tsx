import React from "react";
import "../styles/Map.css";

/*global simplemaps_countrymap_mapdata */
// @ts-ignore

export const return_estado_name_to_id = () => {
  const estado_name_to_id = {};
  for (let id in simplemaps_countrymap_mapdata.state_specific) {
    //console.log(id);
    //const name = simplemaps_countrymap_mapdata.state_specific[id].name;
    estado_name_to_id[
      simplemaps_countrymap_mapdata.state_specific[id].name.toString()
    ] = id;
    //const code = id.slice(0, 3);
  }
  return estado_name_to_id;
};

export const return_state_names = () => {
  const state_names = {};
  for (let id in simplemaps_countrymap_mapdata.state_specific) {
    state_names.push(
      simplemaps_countrymap_mapdata.state_specific[id].name.toString()
    );
  }
  return state_names;
};

function Map() {
  return (
    <div>
      <div className="map">
        <h3>
          Selecione um <b>estado</b> na <b>lista</b> ao lado, ou clique nele
          dentro do
          <b> mapa</b>
        </h3>
        <div id="map"></div>
      </div>
    </div>
  );
}

export default Map;
