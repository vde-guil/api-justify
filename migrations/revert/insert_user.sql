-- Revert justify-api:insert_user from pg

BEGIN;

DROP FUNCTION insert_user(json);

COMMIT;
