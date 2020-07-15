#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1
	echo "  Creating user and database '$database'"
	psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL
	    CREATE USER $database PASSWORD '$database';
	    CREATE DATABASE $database;
	    GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [ -n "$POSTGRESQL_MULTIPLE_DATABASES" ]; then
	echo "Multiple database creation requested: $POSTGRESQL_MULTIPLE_DATABASES"
	for db in $(echo $POSTGRESQL_MULTIPLE_DATABASES | tr ',' ' '); do
		create_user_and_database $db
	done
	echo "Multiple databases created"
fi
