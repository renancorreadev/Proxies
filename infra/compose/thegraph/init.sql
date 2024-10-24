-- Cria a role 'graph' apenas se ela não existir
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'graph') THEN
      CREATE ROLE graph WITH LOGIN PASSWORD 'letmein';
      ALTER ROLE graph CREATEDB;
   END IF;
END $$;

-- Cria o banco 'graph' apenas se ele não existir
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'graph') THEN
      CREATE DATABASE graph
        WITH OWNER = graph
        ENCODING = 'UTF8'
        LC_COLLATE = 'C'
        LC_CTYPE = 'C'
        TEMPLATE = template0;
   END IF;
END $$;
