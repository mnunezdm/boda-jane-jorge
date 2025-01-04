import Link from "next/link";
import React from "react";

const TEXT = [
  "Para cualquier duda o pregunta por favor escribir a Patricia, ella nos está ayudando con la boda y estará encantada de ayudaros a vosotros también! Os responderá con la mayor brevedad posible. Su email de contacto es",
];

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export default function ContactSection() {
  const mailTo = `mailto:${CONTACT_EMAIL}`;

  return (
    <section>
      <article className="welcome-article">
        <h2>Si tienes cualquier duda...</h2>
        {TEXT.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <Link href={mailTo}>{CONTACT_EMAIL}</Link>
      </article>
    </section>
  );
}
