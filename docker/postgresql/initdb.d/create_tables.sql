CREATE TABLE technologies( 
  id SERIAL  primary key, 
  name VARCHAR(100) NOT NULL, 
  description VARCHAR(1500) NOT NULL, 
  recommendation smallint CHECK (recommendation >0   AND recommendation <6), 
  relevance smallint  CHECK (relevance >0   AND relevance <6), 
  complexity smallint  CHECK (complexity >0   AND complexity <6), 
  url VARCHAR(200) NOT NULL, 
  tags varchar(210)
); 
CREATE TABLE public.tags(
  id SERIAL  primary key,
  tag character varying(100) NOT NULL
);
