-- Verify justify-api:insert_user on pg

BEGIN;

SELECT * FROM new_user('{
                                "email": "valentin.de.guillebon@gmail.com", 
                                "username":"valentin",
                                "password":"bonjour"
                            }'::json);

ROLLBACK;
