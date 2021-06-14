-- Verify justify-api:insert_user on pg

BEGIN;

SELECT * FROM insert_user('{"email": "valentin.de.guillebon@gmail.com", "username":"valentin"}'::json);

ROLLBACK;
