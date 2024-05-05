package br.uneb.dcet.si20192.tees.manguebem.api.util;

public interface Constants {
    public interface IMPORT_SHEET {
        public interface SPECIES {
            int SHEET_INDEX = 0;
            int SHEET_HEADER_ROW_LENGTH = 1;

            int TAXON_KINGDOM_CELLINDEX = 1;
            int TAXON_PHYLUM_CELLINDEX = 2;
            int TAXON_CLASS_CELLINDEX = 3;
            int TAXON_ORDER_CELLINDEX = 4;
            int TAXON_FAMILY_CELLINDEX = 5;
            int TAXON_GENUS_CELLINDEX = 6;
            int TAXON_NAME_CELLINDEX = 7;
            int AUTHORS_CELLINDEX = 8;
            int BRAZILIAN_TYPE_CELLINDEX = 9;
            int BRAZILIAN_TYPE_SYNONYM_CELLINDEX = 10;
            int INATURALISTID_CELLINDEX = 11;
            int COMMON_NAME_CELLINDEX = 12;
            int BEM_CLASSIFICATION_CELLINDEX = 13;
        }

        public interface OBSERVATIONS {
            int SHEET_INDEX = 1;
            int SHEET_HEADER_ROW_LENGTH = 1;

            int SPECIE_ID_CELLINDEX = 0;
            int FEDERATIVE_UNITS_CELLINDEX = 1;
            int BIOME_NAME_CELLINDEX = 2;
        }
    }
}
