-- Deploy justify-api:insert_user to pg

BEGIN;

-- XXX Add DDLs here.

CREATE OR REPLACE FUNCTION insert_user(json) RETURNS "user" AS
$$
    INSERT INTO "user" (email, username) VALUES
    (
        $1->>'email', 
        $1->>'username'
    )
    RETURNING *;
$$  LANGUAGE sql;

COMMIT;
