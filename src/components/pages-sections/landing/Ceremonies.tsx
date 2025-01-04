"use client";

import React from "react";

import { addToCalendar } from "../../../lib/utils/calendar";

import moment from "moment";
import "moment/locale/es";

const WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE;
const WEDDING_BANQUET_LOCATION_NAME =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_NAME;
const WEDDING_BANQUET_LOCATION_ADDRESS =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_ADDRESS;
const WEDDING_BANQUET_LOCATION_LINK =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_LINK;

const startDateBanquet = moment(WEDDING_DATE);
const endDateBanquet = startDateBanquet.clone().add(8, "hour");

function WhereBanquete() {
  const buildCalendar = () => {
    addToCalendar("boda.ics", {
      title: "Boda Jane y Jorge",
      location: `${WEDDING_BANQUET_LOCATION_NAME}, ${WEDDING_BANQUET_LOCATION_ADDRESS}`,
      start: startDateBanquet.toDate(),
      end: endDateBanquet.toDate(),
    });
  };

  return (
    <article>
      <h2>
        Entonces el día {startDateBanquet.format("D")} de{" "}
        {startDateBanquet.format("MMMM")}...
      </h2>
      <p>
        os esperamos para la celebración continuará en{" "}
        <strong>{WEDDING_BANQUET_LOCATION_NAME}</strong> en{" "}
        {WEDDING_BANQUET_LOCATION_ADDRESS}
      </p>
      <div className="button-group">
        <a
          className="button"
          href={WEDDING_BANQUET_LOCATION_LINK}
          target="_blank"
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
      <WhereBanquete />
    </section>
  );
}
