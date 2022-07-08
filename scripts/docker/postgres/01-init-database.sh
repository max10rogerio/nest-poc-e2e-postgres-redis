#!/bin/bash
set -e

echo "Create Databases"

export PGPASSWORD=changeme;
psql -v ON_ERROR_STOP=1 --username postgres --dbname postgres &>/dev/null <<-EOSQL
  CREATE DATABASE gazin_seguros_bank;
  CREATE DATABASE gazin_seguros_bank_test;
EOSQL

echo "Set PT-BR language"

psql -v ON_ERROR_STOP=1 --username postgres --dbname gazin_seguros_bank >/tmp/pg_restore.log 2>&1  <<-EOSQL
  alter system set default_text_search_config to 'pg_catalog.portuguese';
  select pg_reload_conf();
EOSQL

psql -v ON_ERROR_STOP=1 --username postgres --dbname gazin_seguros_bank_test >/tmp/pg_restore.log 2>&1  <<-EOSQL
  alter system set default_text_search_config to 'pg_catalog.portuguese';
  select pg_reload_conf();
EOSQL