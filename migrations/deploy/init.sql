-- Deploy justify-api:init to pg

BEGIN;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text NOT NULL UNIQUE,
    username text NOT NULL
    
);

COMMIT;
