ALTER TABLE species
ADD COLUMN mushroom_group ENUM('VEINED', 'GILLED', 'BOLETES', 'TOOTHED', 'CLUBS', 'CORALS', 'POLYPORES', 'JELLY_FUNGI', 'PUFFBALLS', 'BIRDS_NEST_FUNGI', 'MORELS_AND_SIMILAR', 'CUPS', 'TRUFFLES', 'OTHER'),
ADD COLUMN occurrence_season_start datetime,
ADD COLUMN occurrence_season_end datetime,
ADD COLUMN flavor VARCHAR(255),
ADD COLUMN keywords VARCHAR(255);

CREATE TABLE specie_similarities (
    specie_1 INT NOT NULL,
    specie_2 INT NOT NULL,
    PRIMARY KEY (specie_1, specie_2),
    FOREIGN KEY (specie_1) REFERENCES species(id),
    FOREIGN KEY (specie_2) REFERENCES species(id)
);
