create table if not exists users(
  id uuid primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(100) not null unique,
  password varchar(100) not null
);

-- create type transaction_type as ENUM ('EARNING', 'EXPRENSE', 'INVESTIMENT');

DO $$
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTIMENT');
  END IF;
END$$;

create table if not exists transactions(
  id uuid primary key,
  user_id uuid references users(id) on delete cascade not null,
  name varchar(100) not null,
  date date not null,
  amount numeric(10, 2) not null,
  type transaction_type not null
);