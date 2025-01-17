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
const TEXT = {
  [Locale.EN]: [
    "For your convenience, we have arranged a bus service on the day of the wedding to go to the {location}. They will depart from three key points in Madrid: Chamartín, Moncloa and Las Rozas. This service will be available for both the outward and return journeys, but the point you choose must be the same for both journeys. Confirm your seat on the attendance form!",
  ],
  [Locale.ES]: [
    "Para vuestra comodidad, hemos dispuesto un servicio de autobús el día de la boda para ir al {location}. Saldrán desde tres puntos clave de Madrid: Chamartín, Moncloa y Las Rozas. Este servicio estará disponible tanto para la ida como para la vuelta, pero el punto que elijas deberá ser el mismo para ambos trayectos. ¡Confirma tu asiento en el formulario de asistencia!",
  ],
};

const WEDDING_BANQUET_LOCATION_NAME =
  process.env.NEXT_PUBLIC_WEDDING_BANQUET_LOCATION_NAME || "";

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
        {TEXT[locale].map((text, index) => (
          <p key={index}>
            {text.replace("{location}", WEDDING_BANQUET_LOCATION_NAME)}
          </p>
        ))}
      </article>
    </section>
  );
}
