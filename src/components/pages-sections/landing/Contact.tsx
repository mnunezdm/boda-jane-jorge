import Link from "next/link";
import React from "react";

import { Locale } from "@/lib/i18n";

const H2 = {
  [Locale.EN]: "In case of any doubt...",
  [Locale.ES]: "Si tienes cualquier duda...",
};
const TEXT = {
  [Locale.EN]: [
    "Please write to Patricia, she is helping us with the wedding from Spain and will be happy to help you too! She will get back to you as soon as possible but please be aware of time changes. Her contact email is:",
  ],
  [Locale.ES]: [
    "Para cualquier duda o pregunta por favor escribir a Patricia, ella nos está ayudando con la boda y estará encantada de ayudaros a vosotros también! Os responderá con la mayor brevedad posible. Su email de contacto es",
  ],
};

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export default function ContactSection({ locale }: { locale: Locale }) {
  const mailTo = `mailto:${CONTACT_EMAIL}`;

  return (
    <section>
      <article className="welcome-article">
        <h2>{H2[locale]}</h2>
        {TEXT[locale].map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <Link href={mailTo}>{CONTACT_EMAIL}</Link>
      </article>
    </section>
  );
}
