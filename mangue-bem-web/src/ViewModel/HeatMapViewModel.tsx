// @ts-nocheck
import { SpeciesCounter } from "../Model/SpeciesCounter";

interface ufReport {
  uf: string;
  speciesCount: number;
}

const statesMap = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins'
};

export const getStateIdFromName = (stateName):string => {
  for (const id in simplemaps_countrymap_mapdata.state_specific) {
    if (
      simplemaps_countrymap_mapdata.state_specific[id].name.toString() ===
      stateName
    )
      return id;
  }
  return null;
};

export const adjustColorIntensity = (hexColor: string, value: number):string => {
    const limitedValue = Math.max(0, Math.min(value, 100));
    const percentageOfValue = (limitedValue / 100) * 100;
    if(limitedValue === 0) return '#88a4bc'

    var R = parseInt(hexColor.substring(1,3),16);
    var G = parseInt(hexColor.substring(3,5),16);
    var B = parseInt(hexColor.substring(5,7),16);

    R = parseInt(R * (100 - percentageOfValue) / 100);
    G = parseInt(G * (100 - percentageOfValue) / 100);
    B = parseInt(B * (100 - percentageOfValue) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export const getSpeciesCounter = (setSpeciesCounter, bemId) => {
  fetch('http://localhost:8080/v1/observations/uf-report').then((data) => {
    data.json().then((jsonData :{items:ufReport[]}) => {
      const speciesCounter:SpeciesCounter[] = []
      for(const item of jsonData.items) {
        const stateColor = adjustColorIntensity(
          Bems[bemId].color,
          item.speciesCount,
        );
        speciesCounter.push({
          speciesCount: item.speciesCount,
          state: statesMap[item.uf],
          bemId,
          stateColor
        })
      }
      setSpeciesCounter(speciesCounter)
    })
  })
  /*
  return states.map(state => ({
      speciesCount: Math.floor(Math.random() * 50),
      state
  }));
  */
};

export const Bems = [
    {
      type: "BEM1",
      description:
        "Espécies comestíveis que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
      color: "#FF5733"
    },
    {
      type: "BEM2",
      description:
        "Espécies comestíveis (após alguns preparos ou cuidados prévios) que claramente ocorrem e são consumidas no Brasil ou que representam um novo recurso alimentar para o país.",
    color: "#33FF57"
    },
    {
      type: "BEM3",
      description:
        "Espécie comestível consumida no Brasil, mas que necessita de mais estudos para confirmar sua identidade e ocorrência no país.",
        color: "#3357FF"
    },
    {
      type: "BEM4",
      description:
        "Espécies comestíveis (após alguns preparos ou cuidados preciosos) consumidas no Brasil, mas que requerem mais estudos para confirmar sua identificação e ocorrência no país.",
        color: "#FF33A1"
    },
    {
      type: "BEM5",
      description:
        "Espécies comestíveis não claramente consumidas no Brasil, mas que representam um novo recurso alimentar para o país. Mais estudos para confirmar sua identidade e ocorrência no Brasil.",
        color: "#FFBD33"
    },
    {
      type: "BEM6",
      description:
        "Espécies comestíveis (após alguns preparos ou cuidados prévios) não claramente consumidas no Brasil, mas que representam um novo recurso alimentar para o país após novos estudos para confirmar sua identificação e ocorrência no Brasil.",
        color: "#008417"
    },
    {
      type: "BEM7",
      description:
        "Espécie que ocorre claramente no Brasil, mas com evidências pouco claras ou ausentes de que foi consumida.",
    color: "#33FFF7"
    },
    {
      type: "BEM8",
      description:
        "Espécie com evidências pouco claras ou ausentes para consumo e que requer mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    color: "#9D33FF"
    },
    {
      type: "BEM9",
      description:
        "Espécie que ocorre claramente no Brasil, mas com comestibilidade não confirmada, incluindo poucos registros venenosos.",
    color: "#FF7E33"
    },
    {
      type: "BEM10",
      description:
        "Espécie que ocorre claramente no Brasil, mas com comestibilidade não confirmada, incluindo poucos registros venenosos.",
    color: "#33FF9A"
    },
    {
      type: "P1",
      description:
        "Espécie venenosa que ocorre claramente no Brasil e causa reação adversa e prejudicial quando consumida.",
    color: "#B8FF33"
    },
    {
      type: "P2",
      description:
        "Espécie venenosa que causa reações adversas e prejudiciais quando consumida e requer mais estudos para confirmar sua identidade e ocorrência no Brasil.",
    color: "#3388FF"
    },
  ];

export const generateRandomData = (bemIndex): SpeciesCounter[] => {
  const statesCounter = getSpeciesCounter()
  for(const stateData of statesCounter) {
    const stateColor = adjustColorIntensity(
      Bems[bemIndex].color,
      stateData.speciesCount,
    );
    stateData.bemId = bemIndex;
    stateData.color = stateColor;
  }
  return statesCounter
}