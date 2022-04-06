DROP DATABASE newsly
CREATE DATABASE newsly
\c newsly

\i db-schema.sql

DROP DATABASE newsly_test
CREATE DATABASE newsly_test
\c newsly_test

\i db-schema.sql
