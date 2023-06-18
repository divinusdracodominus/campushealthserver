--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: to_date(bigint); Type: FUNCTION; Schema: public; Owner: cardinal
--

CREATE FUNCTION public.to_date(date bigint) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
        BEGIN
                RETURN to_char(to_timestamp(date / 1000), 'DD/MM/YYYY HH24:IM:SS');
        END;
$$;


ALTER FUNCTION public.to_date(date bigint) OWNER TO cardinal;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appusageevents; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.appusageevents (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    package_name character varying(75),
    date bigint,
    kind character varying(50),
    metadata_id uuid,
    platform_type integer,
    minute character varying(20)
);


ALTER TABLE public.appusageevents OWNER TO cardinal;

--
-- Name: attendance; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.attendance (
    participantid uuid,
    instanceid uuid,
    status character varying(10),
    id uuid NOT NULL
);


ALTER TABLE public.attendance OWNER TO cardinal;

--
-- Name: calendarentries; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.calendarentries (
    id uuid NOT NULL,
    title character varying(100),
    description character varying(200),
    metadata uuid,
    owneraccount character varying(100),
    eventlocation character varying(100),
    selfattendeestatus boolean
);


ALTER TABLE public.calendarentries OWNER TO cardinal;

--
-- Name: calldata; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.calldata (
    id uuid NOT NULL,
    metadata_id uuid,
    date bigint,
    duration integer,
    recipiend_id uuid
);


ALTER TABLE public.calldata OWNER TO cardinal;

--
-- Name: eventinstances; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.eventinstances (
    id uuid NOT NULL,
    eventid uuid,
    date date
);


ALTER TABLE public.eventinstances OWNER TO cardinal;

--
-- Name: eventrel; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.eventrel (
    id uuid NOT NULL,
    source character varying(50) NOT NULL,
    key character varying(40) NOT NULL
);


ALTER TABLE public.eventrel OWNER TO cardinal;

--
-- Name: events; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying(100) NOT NULL,
    organizer character varying(50),
    description character varying(200),
    repeats boolean DEFAULT false,
    repitition character varying(20) DEFAULT 'none'::character varying,
    days_of_week character varying(20)[],
    image_url character varying(100),
    color character varying(10),
    image_description character varying(200)
);


ALTER TABLE public.events OWNER TO cardinal;

--
-- Name: metadata; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.metadata (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    participant_id uuid,
    device_id uuid
);


ALTER TABLE public.metadata OWNER TO cardinal;

--
-- Name: participants; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.participants (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying(20),
    last_name character varying(20),
    email character varying(40),
    participant_id integer NOT NULL
);


ALTER TABLE public.participants OWNER TO cardinal;

--
-- Name: participants_participant_id_seq; Type: SEQUENCE; Schema: public; Owner: cardinal
--

CREATE SEQUENCE public.participants_participant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.participants_participant_id_seq OWNER TO cardinal;

--
-- Name: participants_participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cardinal
--

ALTER SEQUENCE public.participants_participant_id_seq OWNED BY public.participants.participant_id;


--
-- Name: smsdata; Type: TABLE; Schema: public; Owner: cardinal
--

CREATE TABLE public.smsdata (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    body character varying(5000),
    thread_id integer NOT NULL,
    date_sent bigint,
    date bigint,
    address character varying(16),
    metadata_id uuid,
    inbound boolean NOT NULL,
    platform_id integer,
    recipient_id character varying(100),
    minute character varying(20)
);


ALTER TABLE public.smsdata OWNER TO cardinal;

--
-- Name: participants participant_id; Type: DEFAULT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.participants ALTER COLUMN participant_id SET DEFAULT nextval('public.participants_participant_id_seq'::regclass);


--
-- Name: appusageevents appusageevents_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.appusageevents
    ADD CONSTRAINT appusageevents_pkey PRIMARY KEY (id);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: calendarentries calendarentries_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.calendarentries
    ADD CONSTRAINT calendarentries_pkey PRIMARY KEY (id);


--
-- Name: calldata calldata_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.calldata
    ADD CONSTRAINT calldata_pkey PRIMARY KEY (id);


--
-- Name: eventinstances eventinstances_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.eventinstances
    ADD CONSTRAINT eventinstances_pkey PRIMARY KEY (id);


--
-- Name: eventrel eventrel_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.eventrel
    ADD CONSTRAINT eventrel_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: smsdata smsdata_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.smsdata
    ADD CONSTRAINT smsdata_pkey PRIMARY KEY (id);


--
-- Name: smsdata smsdata_platform_id_key; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.smsdata
    ADD CONSTRAINT smsdata_platform_id_key UNIQUE (platform_id);


--
-- Name: metadata smsmeta_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT smsmeta_pkey PRIMARY KEY (id);


--
-- Name: participants students_pkey; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: smsdata unique_date_thread_id_body; Type: CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.smsdata
    ADD CONSTRAINT unique_date_thread_id_body UNIQUE (date, thread_id, body);


--
-- Name: smsdata_date_idx; Type: INDEX; Schema: public; Owner: cardinal
--

CREATE INDEX smsdata_date_idx ON public.smsdata USING btree (date);


--
-- Name: usageevents_date_idx; Type: INDEX; Schema: public; Owner: cardinal
--

CREATE INDEX usageevents_date_idx ON public.appusageevents USING btree (date);


--
-- Name: appusageevents appusageevents_metadata_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.appusageevents
    ADD CONSTRAINT appusageevents_metadata_id_fkey FOREIGN KEY (metadata_id) REFERENCES public.metadata(id);


--
-- Name: attendance attendance_instanceid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_instanceid_fkey FOREIGN KEY (instanceid) REFERENCES public.eventinstances(id);


--
-- Name: attendance attendance_studentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_studentid_fkey FOREIGN KEY (participantid) REFERENCES public.participants(id);


--
-- Name: calldata calldata_metadata_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.calldata
    ADD CONSTRAINT calldata_metadata_fkey FOREIGN KEY (metadata_id) REFERENCES public.metadata(id);


--
-- Name: eventinstances eventinstances_eventid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.eventinstances
    ADD CONSTRAINT eventinstances_eventid_fkey FOREIGN KEY (eventid) REFERENCES public.events(id);


--
-- Name: eventrel eventrel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.eventrel
    ADD CONSTRAINT eventrel_id_fkey FOREIGN KEY (id) REFERENCES public.events(id);


--
-- Name: smsdata smsdata_metadata_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardinal
--

ALTER TABLE ONLY public.smsdata
    ADD CONSTRAINT smsdata_metadata_fkey FOREIGN KEY (metadata_id) REFERENCES public.metadata(id);


--
-- PostgreSQL database dump complete
--

