-- Revert justify-api:insert_user from pg

BEGIN;

DROP FUNCTION new_user(json);

COMMIT;
