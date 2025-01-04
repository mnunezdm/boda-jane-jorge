import Link from "next/link";
import React from "react";

const RSVP_LINK = process.env.NEXT_PUBLIC_RSVP_LINK as string;

export default function RsvpSection() {
  return (
    <section className="rsvp-section">
      <article>
        <h2>Necesitamos tu confirmación:</h2>
        <Link href={RSVP_LINK} className="button" target="_blank">
          Confirma en el siguiente formulario
        </Link>
      </article>
    </section>
  );
}
