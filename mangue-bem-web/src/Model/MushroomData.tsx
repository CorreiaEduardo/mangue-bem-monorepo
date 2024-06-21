export interface Mushroom {
  id: number;
  taxonKingdom: string;
  taxonPhylum: string;
  taxonClass: string;
  taxonOrder: string;
  taxonFamily: string;
  taxonGenus: string;
  taxonName: string;
  commonName: string;
  bemClassification: string;
  description: string | null;
  authors: string;
  brazilianType: string;
  brazilianTypeSynonym: string;
  inaturalistId: string;
  iucn: string | null;
}
