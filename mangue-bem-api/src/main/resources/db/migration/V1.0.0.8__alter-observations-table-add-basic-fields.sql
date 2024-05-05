ALTER TABLE observations
ADD COLUMN type ENUM('LITERATURE', 'INATURALIST', 'SPECIES_LINK'),
ADD COLUMN lat BIGINT,
ADD COLUMN lng BIGINT,
ADD COLUMN literature_reference VARCHAR(255),
ADD COLUMN inaturalist_id VARCHAR(50),
ADD COLUMN specieslink_id VARCHAR(50),
ADD COLUMN biome_id INT,
ADD FOREIGN KEY (biome_id) REFERENCES biomes(id),
ADD COLUMN brazilian_federative_unit ENUM(
    'UNKNOWN',
    'DF',
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO'
);

UPDATE observations
SET brazilian_federative_unit =
  CASE state_ibge_id
    WHEN 12 THEN 'AC'
    WHEN 27 THEN 'AL'
    WHEN 16 THEN 'AP'
    WHEN 13 THEN 'AM'
    WHEN 29 THEN 'BA'
    WHEN 23 THEN 'CE'
    WHEN 53 THEN 'DF'
    WHEN 32 THEN 'ES'
    WHEN 52 THEN 'GO'
    WHEN 21 THEN 'MA'
    WHEN 51 THEN 'MT'
    WHEN 50 THEN 'MS'
    WHEN 31 THEN 'MG'
    WHEN 15 THEN 'PA'
    WHEN 25 THEN 'PB'
    WHEN 41 THEN 'PR'
    WHEN 26 THEN 'PE'
    WHEN 22 THEN 'PI'
    WHEN 33 THEN 'RJ'
    WHEN 24 THEN 'RN'
    WHEN 43 THEN 'RS'
    WHEN 11 THEN 'RO'
    WHEN 14 THEN 'RR'
    WHEN 42 THEN 'SC'
    WHEN 35 THEN 'SP'
    WHEN 28 THEN 'SE'
    WHEN 17 THEN 'TO'
    ELSE NULL
  END;

ALTER TABLE observations
DROP COLUMN state_ibge_id;

ALTER TABLE observations
DROP COLUMN city_ibge_id;