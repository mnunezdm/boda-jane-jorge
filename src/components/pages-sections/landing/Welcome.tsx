import React from "react";

const TEXT = [
  "Dos culturas, dos continentes y un gran amor nos unen en este día tan especial. Queremos compartirlo con vosotros, nuestros amigos y familiares que viajáis desde diferentes rincones del mundo para acompañarnos.",
  "Aquí encontraréis toda la información para acompañarnos en este día tan especial, desde cómo llegar, alojamiento, y transporte, hasta recomendaciones de lugares mágicos que podéis visitar en Madrid, El Escorial, Toledo y Segovia.",
  "Gracias por formar parte de nuestra historia. ¡Estamos deseando celebrar con vosotros! 💃🕺",
];

export default function WelcomeSection() {
  return (
    <section>
      <article className="welcome-article">
        <h2>¡Hola a todos!</h2>
        {TEXT.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </article>
    </section>
  );
}
