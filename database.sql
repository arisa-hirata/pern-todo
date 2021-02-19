-- CREATE DATABASE perntodo;

--\c perntodo

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

SELECT *
FROM todo
ORDER BY todo_id DESC
