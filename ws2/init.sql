/* DROP TABLE public."Emprunt" IF NOT EXISTS; */
CREATE TABLE public."Emprunt"
(
    id integer NOT NULL,
    "nom" character varying COLLATE pg_catalog."default" NOT NULL,
    "prenom" character varying COLLATE pg_catalog."default" NOT NULL,
	"livre_id" integer,
    CONSTRAINT "Emprunt_pkey" PRIMARY KEY (id)
);