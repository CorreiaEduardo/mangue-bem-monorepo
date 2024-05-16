// @ts-nocheck
import { SpeciesCounter } from "../Model/SpeciesCounter";
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
    const limitedValue = Math.max(0, Math.min(value, 50));
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

export const getSpeciesCounter = (): SpeciesCounter[] => [
    {
        speciesCount: parseInt(Math.random() * 50),
        state: 'Bahia'
    },
    {
        speciesCount: parseInt(Math.random() * 50),
        state: 'Rio Grande do Norte'
    },
    {
        speciesCount: parseInt(Math.random() * 50),
        state: 'São Paulo'
    },
    {
        speciesCount: parseInt(Math.random() * 50),
        state: 'Goiás'
    },
    {
        speciesCount: parseInt(Math.random() * 50),
        state: 'Amazonas'
    },
    {
        speciesCount: parseInt(Math.random() * 50),
        state: 'Rondônia'
    },
];
