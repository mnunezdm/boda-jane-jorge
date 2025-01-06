"use client";

import React from "react";

import { addToCalendar } from "../../../lib/utils/calendar";

import moment from "moment";
import "moment/locale/es";

const NEXT_PUBLIC_WEDDINGDATE = process.env.NEXT_PUBLIC_WEDDINGDATE;

const startDateCeremony = moment(NEXT_PUBLIC_WEDDINGDATE);
const endDateCeremony = startDateCeremony.clone().add(2, "hour");

const startDateBanquet = startDateCeremony.clone().add(3, "hour");
const endDateBanquet = startDateBanquet.clone().add(8, "hour");

function WhereParroquia() {
  const buildCalendar = () => {
    addToCalendar("ceremonia.ics", {
      title: "Ceremonia Boda Jane y John",
      location: WEDDING_CEREMONY_LOCATION,
      start: startDateCeremony.toDate(),
      end: endDateCeremony.toDate(),
    });
  };

  return (
    <article>
      <h2>
        Entonces el día {startDateCeremony.format("D")} de{" "}
        {startDateCeremony.format("MMMM")}...
      </h2>
      <p>
        os esperamos para la ceremonia religiosa a las{" "}
        <strong>{startDateCeremony.format("HH:mm")}</strong> en la{" "}
        <strong>Catedral de la Almudena</strong> en la Calle de Bailen nº 10 en
        Madrid
      </p>
      <div className="button-group">
        <a
          className="button"
          href="https://g.co/kgs/P1ifS7y"
          referrerPolicy="no-referrer"
        >
          Abrir en Maps
        </a>
        <button className="button" onClick={buildCalendar}>
          Añadir al calendario
        </button>
      </div>
    </article>
  );
}

function WhereBanquete() {
  const buildCalendar = () => {
    addToCalendar("banquete.ics", {
      title: "Banquete Jane y John",
      location: WEDDING_BANQUET_LOCATION,
      start: startDateBanquet.toDate(),
      end: endDateBanquet.toDate(),
    });
  };

  return (
    <article>
      <p>
        y la celebración continuará en el <strong>Palacio Real</strong> en la
        Carretera de Bailen nº 10 en Madrid
      </p>
      <div className="button-group">
        <a
          className="button"
          href="https://g.co/kgs/puwQRLs"
          referrerPolicy="no-referrer"
        >
          Abrir en Maps
        </a>
        <button className="button" onClick={buildCalendar}>
          Añadir al calendario
        </button>
      </div>
    </article>
  );
}

export default function CeremoniesSection() {
  return (
    <section>
      <WhereParroquia />
      <div className="separator"></div>
      <WhereBanquete />
    </section>
  );
}
