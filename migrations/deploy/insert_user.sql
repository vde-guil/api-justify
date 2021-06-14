-- Deploy justify-api:insert_user to pg

BEGIN;

-- XXX Add DDLs here.

CREATE FUNCTION new_user(json) RETURNS "user" AS $$
    INSERT INTO "user" (email, username, password)
        VALUES (
            $1->>'email',
            $1->>'username',
            $1->>'password'
        )
    RETURNING *;
$$  LANGUAGE sql;

COMMIT;
