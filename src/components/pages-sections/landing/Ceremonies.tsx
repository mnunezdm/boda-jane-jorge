"use client";

import React from "react";

import { addToCalendar } from "../../../lib/utils/calendar";

import moment from "moment";
import { Locale } from "@/lib/i18n";

const WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE;
const WEDDING_BANQUET_LOCATION_NAME =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_NAME || "";
const WEDDING_BANQUET_LOCATION_ADDRESS =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_ADDRESS || "";
const WEDDING_BANQUET_LOCATION_LINK =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_LINK || "";

const H2 = {
  [Locale.EN]: "So then, the {day} of {month} at {hour}...",
  [Locale.ES]: "Entonces el día {day} de {month} a las {hour}...",
};
const TEXT = {
  [Locale.EN]: [
    "we will be waiting for you to celebrate it at {location}, {address}",
  ],
  [Locale.ES]: ["os esperamos para celebrarlo en {location}, {address}"],
};
const ICS_NAME = {
  [Locale.EN]: "Jane & Jorge's Wedding",
  [Locale.ES]: "Boda Jane y Jorge",
};

const BUTTON_MAPS = {
  [Locale.EN]: "Open in Maps",
  [Locale.ES]: "Abrir en Maps",
};

const BUTTON_CALENDAR = {
  [Locale.EN]: "Add to calendar",
  [Locale.ES]: "Añadir al calendario",
};

export default function CeremoniesSection({ locale }: { locale: Locale }) {
  const startDateBanquet = moment(WEDDING_DATE).locale(locale);
  const endDateBanquet = startDateBanquet.clone().add(8, "hour");

  const buildCalendar = () => {
    addToCalendar("boda.ics", {
      title: ICS_NAME[locale],
      location: `${WEDDING_BANQUET_LOCATION_NAME}, ${WEDDING_BANQUET_LOCATION_ADDRESS}`,
      start: startDateBanquet.toDate(),
      end: endDateBanquet.toDate(),
    });
  };

  return (
    <section>
      <article>
        <h2>
          {H2[locale]
            .replace("{day}", startDateBanquet.format("D"))
            .replace("{month}", startDateBanquet.format("MMMM"))
            .replace("{hour}", startDateBanquet.format("HH:mm"))}
        </h2>
        {TEXT[locale].map((text, index) => (
          <p key={index}>
            {text
              .replace("{location}", WEDDING_BANQUET_LOCATION_NAME)
              .replace("{address}", WEDDING_BANQUET_LOCATION_ADDRESS)}
          </p>
        ))}
        <div className="button-group">
          <a
            className="button"
            href={WEDDING_BANQUET_LOCATION_LINK}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {BUTTON_MAPS[locale]}
          </a>
          <button className="button" onClick={buildCalendar}>
            {BUTTON_CALENDAR[locale]}
          </button>
        </div>
      </article>
    </section>
  );
}
