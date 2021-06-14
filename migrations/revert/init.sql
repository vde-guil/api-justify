-- Revert justify-api:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE "user";

COMMIT;
