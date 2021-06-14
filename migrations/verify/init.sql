-- Verify justify-api:init on pg

BEGIN;

-- XXX Add verifications here.
SELECT email FROM "user";

ROLLBACK;
