echo "############ ETL Automation #############"
ROLE_ETL_DB = "role_etl"
ETL_DB = "ctrp_etl"

psql postgres -c "DROP ROLE IF EXISTS $ROLE_ETL_DB"

psql postgres -c "DROP DATABASE IF EXISTS $ETL_DB"


psql postgres -c "CREATE ROLE $ROLE_ETL_DB"

psql postgres -c "CREATE DATABASE $ETL_DB
  			WITH OWNER = $ROLE_ETL_DB
       			ENCODING = 'UTF8'
       			TABLESPACE = pg_default
       			LC_COLLATE = 'en_US.UTF-8'
       			LC_CTYPE = 'en_US.UTF-8' "

