import { Locale } from "@/lib/i18n";
import React from "react";

const H2 = {
  [Locale.EN]: "Hello everyone!",
  [Locale.ES]: "¡Hola a todos!",
};
const TEXT = {
  [Locale.ES]: [
    "Dos culturas, dos continentes y un gran amor nos unen en este día tan especial. Queremos compartirlo con vosotros, nuestros amigos y familiares que viajáis desde diferentes rincones del mundo para acompañarnos.",
    "Aquí encontraréis toda la información para acompañarnos en este día tan especial, desde cómo llegar, alojamiento, y transporte, hasta recomendaciones de lugares mágicos que podéis visitar en Madrid, El Escorial, Toledo y Segovia.",
    "Gracias por formar parte de nuestra historia. ¡Estamos deseando celebrar con vosotros! 💃🕺",
  ],
  [Locale.EN]: [
    "Two cultures, two continents, and one great unfolding love brings us together on this special day. We want to share it with you, our friends and family, traveling from different corners of the world to join us.",
    "Here, you'll find all the information you need to be part of this special day, including details on how to get here, accommodation, transportation, and having a great time.",
    "Thank you for being part of our story. We can’t wait to celebrate with you! 💃🕺",
  ],
};

export default function WelcomeSection({ locale }: { locale: Locale }) {
  return (
    <section>
      <article className="welcome-article">
        <h2>{H2[locale]}</h2>
        {TEXT[locale].map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </article>
    </section>
  );
}
