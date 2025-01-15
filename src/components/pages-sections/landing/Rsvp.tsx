import { Locale } from "@/lib/i18n";
import Link from "next/link";
import React from "react";

const RSVP_LINK = {
  [Locale.EN]: process.env.NEXT_PUBLIC_RSVP_EN_LINK,
  [Locale.ES]: process.env.NEXT_PUBLIC_RSVP_ES_LINK,
};
const H2 = {
  [Locale.EN]: "We need your confirmation:",
  [Locale.ES]: "Necesitamos tu confirmación:",
};
const BUTTON = {
  [Locale.EN]: "Confirm your attendance in the form",
  [Locale.ES]: "Confirma tu asistencia a través del formulario",
};

export default function RsvpSection({ locale }: { locale: Locale }) {
  return (
    <section className="rsvp-section">
      <article>
        <h2>{H2[locale]}</h2>
        <Link
          href={RSVP_LINK[locale] as string}
          className="button"
          target="_blank"
        >
          {BUTTON[locale]}
        </Link>
      </article>
    </section>
  );
}
