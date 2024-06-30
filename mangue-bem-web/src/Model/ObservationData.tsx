import { Mushroom } from "./MushroomData";

export interface Observation {
  id: number;
  specie: Mushroom;
  inaturalistId: string | null;
  type: 'LITERATURE' | 'SPECIES_LINK' | 'INATURALIST';
}
