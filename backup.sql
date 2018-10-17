--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)

-- Started on 2018-10-17 14:34:56 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 13049)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2950 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 27406)
-- Name: Client; Type: TABLE; Schema: public; Owner: ripoul
--

CREATE TABLE public."Client" (
    "UserName" character varying NOT NULL,
    "Nom" character varying NOT NULL,
    "Prénom" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Client" OWNER TO ripoul;

--
-- TOC entry 197 (class 1259 OID 27422)
-- Name: Emprunt; Type: TABLE; Schema: public; Owner: ripoul
--

CREATE TABLE public."Emprunt" (
    "Livre" integer NOT NULL,
    "Client" character varying NOT NULL
);


ALTER TABLE public."Emprunt" OWNER TO ripoul;

--
-- TOC entry 199 (class 1259 OID 27443)
-- Name: Exemplaire; Type: TABLE; Schema: public; Owner: ripoul
--

CREATE TABLE public."Exemplaire" (
    "Ref" integer NOT NULL,
    "idLivre" integer NOT NULL
);


ALTER TABLE public."Exemplaire" OWNER TO ripoul;

--
-- TOC entry 198 (class 1259 OID 27435)
-- Name: Livre; Type: TABLE; Schema: public; Owner: ripoul
--

CREATE TABLE public."Livre" (
    id integer NOT NULL,
    "Titre" character varying NOT NULL,
    "Auteur" character varying NOT NULL,
    "Resume" character varying
);


ALTER TABLE public."Livre" OWNER TO ripoul;

--
-- TOC entry 2939 (class 0 OID 27406)
-- Dependencies: 196
-- Data for Name: Client; Type: TABLE DATA; Schema: public; Owner: ripoul
--

COPY public."Client" ("UserName", "Nom", "Prénom", "Password") FROM stdin;
\.


--
-- TOC entry 2940 (class 0 OID 27422)
-- Dependencies: 197
-- Data for Name: Emprunt; Type: TABLE DATA; Schema: public; Owner: ripoul
--

COPY public."Emprunt" ("Livre", "Client") FROM stdin;
\.


--
-- TOC entry 2942 (class 0 OID 27443)
-- Dependencies: 199
-- Data for Name: Exemplaire; Type: TABLE DATA; Schema: public; Owner: ripoul
--

COPY public."Exemplaire" ("Ref", "idLivre") FROM stdin;
\.


--
-- TOC entry 2941 (class 0 OID 27435)
-- Dependencies: 198
-- Data for Name: Livre; Type: TABLE DATA; Schema: public; Owner: ripoul
--

COPY public."Livre" (id, "Titre", "Auteur", "Resume") FROM stdin;
\.


--
-- TOC entry 2815 (class 2606 OID 27447)
-- Name: Exemplaire Exemplaire_pkey; Type: CONSTRAINT; Schema: public; Owner: ripoul
--

ALTER TABLE ONLY public."Exemplaire"
    ADD CONSTRAINT "Exemplaire_pkey" PRIMARY KEY ("Ref");


--
-- TOC entry 2813 (class 2606 OID 27442)
-- Name: Livre Livre_pkey; Type: CONSTRAINT; Schema: public; Owner: ripoul
--

ALTER TABLE ONLY public."Livre"
    ADD CONSTRAINT "Livre_pkey" PRIMARY KEY (id);


--
-- TOC entry 2808 (class 2606 OID 27413)
-- Name: Client pk_client; Type: CONSTRAINT; Schema: public; Owner: ripoul
--

ALTER TABLE ONLY public."Client"
    ADD CONSTRAINT pk_client PRIMARY KEY ("UserName");


--
-- TOC entry 2811 (class 2606 OID 27429)
-- Name: Emprunt pk_emprunt; Type: CONSTRAINT; Schema: public; Owner: ripoul
--

ALTER TABLE ONLY public."Emprunt"
    ADD CONSTRAINT pk_emprunt PRIMARY KEY ("Livre", "Client");


--
-- TOC entry 2809 (class 1259 OID 27458)
-- Name: fki_fk_exemplaire; Type: INDEX; Schema: public; Owner: ripoul
--

CREATE INDEX fki_fk_exemplaire ON public."Emprunt" USING btree ("Livre");


--
-- TOC entry 2816 (class 2606 OID 27453)
-- Name: Emprunt fk_exemplaire; Type: FK CONSTRAINT; Schema: public; Owner: ripoul
--

ALTER TABLE ONLY public."Emprunt"
    ADD CONSTRAINT fk_exemplaire FOREIGN KEY ("Livre") REFERENCES public."Exemplaire"("Ref");


--
-- TOC entry 2817 (class 2606 OID 27448)
-- Name: Exemplaire fk_livre; Type: FK CONSTRAINT; Schema: public; Owner: ripoul
--

ALTER TABLE ONLY public."Exemplaire"
    ADD CONSTRAINT fk_livre FOREIGN KEY ("idLivre") REFERENCES public."Livre"(id);


-- Completed on 2018-10-17 14:34:56 CEST

--
-- PostgreSQL database dump complete
--

