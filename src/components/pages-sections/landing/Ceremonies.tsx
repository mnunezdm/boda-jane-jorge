"use client";

import React from "react";

import { addToCalendar } from "../../../lib/utils/calendar";
import ExportedImage from "next-image-export-optimizer";

import IE31 from "$/landing/IE-31.png";
import IE29 from "$/landing/IE-29.png";

import moment from "moment-timezone";
import { Locale } from "@/lib/i18n";

const WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE;

const WEDDING_CEREMONY_DATE = process.env.NEXT_PUBLIC_WEDDING_CEREMONY_DATE;
const WEDDING_BANQUET_DATE = process.env.NEXT_PUBLIC_WEDDING_BANQUET_DATE;
const WEDDING_CEREMONY_LOCATION_NAME =
  process.env.NEXT_PUBLIC_WEDDING_CEREMONY_LOCATION_NAME || "";
const WEDDING_CEREMONY_LOCATION_ADDRESS =
  process.env.NEXT_PUBLIC_WEDDING_CEREMONY_LOCATION_ADDRESS || "";
const WEDDING_CEREMONY_LOCATION_LINK =
  process.env.NEXT_PUBLIC_WEDDING_CEREMONY_LOCATION_LINK || "";
const WEDDING_BANQUET_LOCATION_NAME =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_NAME || "";
const WEDDING_BANQUET_LOCATION_ADDRESS =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_ADDRESS || "";
const WEDDING_BANQUET_LOCATION_LINK =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_LINK || "";

const H2 = {
  [Locale.EN]: "So then, the {day} of {month}...",
  [Locale.ES]: "Entonces el día {day} de {month}...",
};
const TEXT_CEREMONY = {
  [Locale.EN]: [
    "We will be waiting for you to celebrate it at {location}, {address}",
  ],
  [Locale.ES]: [
    "Os esperamos a las {time} para la ceremonia religiosa en {location}, en {address}",
  ],
};
const TEXT_BANQUET = {
  [Locale.EN]: [
    "And the celebration will continue at {time} in {location}, {address}",
  ],
  [Locale.ES]: [
    "Y la celebración continuará a las {time} en {location}, {address}",
  ],
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

function WhereParroquia({ locale }: { locale: Locale }) {
  const startDateCeremony = moment(WEDDING_CEREMONY_DATE)
    .locale(locale)
    .tz("Europe/Madrid");
  const endDateCeremony = startDateCeremony.clone().add(1, "hour");

  const buildCalendar = () => {
    addToCalendar("ceremonia.ics", {
      title: "Ceremonia Boda Jane y Jorge",
      location: WEDDING_CEREMONY_LOCATION_NAME,
      start: startDateCeremony.toDate(),
      end: endDateCeremony.toDate(),
    });
  };

  return (
    <article>
      <ExportedImage
        className="self-center"
        src={IE29}
        alt=""
        width="200"
        height="200"
      ></ExportedImage>
      {TEXT_CEREMONY[locale].map((text, index) => (
        <p key={index}>
          {text
            .replace("{time}", `${startDateCeremony.format("HH:mm")}h`)
            .replace("{location}", WEDDING_CEREMONY_LOCATION_NAME)
            .replace("{address}", WEDDING_CEREMONY_LOCATION_ADDRESS)}
        </p>
      ))}
      <div className="button-group justify-evenly">
        <a
          className="button"
          href={WEDDING_CEREMONY_LOCATION_LINK}
          referrerPolicy="no-referrer"
          target="_blank"
        >
          {BUTTON_MAPS[locale]}
        </a>
        <button className="button" onClick={buildCalendar}>
          {BUTTON_CALENDAR[locale]}
        </button>
      </div>
    </article>
  );
}

function WhereBanquete({ locale }: { locale: Locale }) {
  const startDateBanquet = moment(WEDDING_BANQUET_DATE)
    .locale(locale)
    .tz("Europe/Madrid");
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
    <article>
      <ExportedImage
        className="self-center"
        src={IE31}
        alt=""
        width="200"
        height="200"
      ></ExportedImage>
      {TEXT_BANQUET[locale].map((text, index) => (
        <p key={index}>
          {text
            .replace("{time}", `${startDateBanquet.format("HH:mm")}h`)
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
  );
}

export default function CeremoniesSection({ locale }: { locale: Locale }) {
  const weddingDate = moment(WEDDING_DATE).locale(locale).tz("Europe/Madrid");

  return (
    <section>
      <h2 className="self-center">
        {H2[locale]
          .replace("{day}", weddingDate.format("D"))
          .replace("{month}", weddingDate.format("MMMM"))}
      </h2>

      <WhereParroquia locale={locale} />
      <div className="separator"></div>
      <WhereBanquete locale={locale} />
    </section>
  );
}
