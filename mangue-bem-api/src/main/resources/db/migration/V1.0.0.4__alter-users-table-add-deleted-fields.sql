ALTER TABLE users
    ADD COLUMN deleted_at datetime,
    ADD COLUMN deleted_by VARCHAR(100);

UPDATE users
SET deleted_at = CASE WHEN deleted = 1 THEN NOW() ELSE NULL END,
    deleted_by = CASE WHEN deleted = 1 THEN 'Unknown' ELSE NULL END;

ALTER TABLE users
DROP COLUMN deleted;