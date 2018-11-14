DROP TABLE public."Livre";

CREATE TABLE public."Livre"
(
    id integer NOT NULL,
    "titre" character varying COLLATE pg_catalog."default" NOT NULL,
    "auteur" character varying COLLATE pg_catalog."default" NOT NULL,
    "resume" character varying COLLATE pg_catalog."default",
	"quantite" integer,
    CONSTRAINT "Livre_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Livre"
    OWNER to ripoul;