CREATE TABLE biomes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted_at datetime,
    deleted_by VARCHAR(100),
    name VARCHAR(255) NOT NULL
);

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Atlantic Rainforest');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Amazon Rainforest');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Pinus Plantation');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Eucalyptus Plantation');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Exotic Trees');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Pecan Plantation');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Pampa');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Corn Plantation');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Pampa, Sand Dunes');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Cerrado');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'On Cattle Dung');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Cerrado, Caatinga');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Caatinga');

INSERT INTO biomes (created_at, updated_at, deleted_at, deleted_by, name)
VALUES (NOW(), NOW(), null, null, 'Cerrado, Pampa');