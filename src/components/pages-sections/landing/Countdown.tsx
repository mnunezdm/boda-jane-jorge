import React from "react";

import { CustomCountdown } from "../../countdown";

const WEDDING_DATE = new Date(process.env.NEXT_PUBLIC_WEDDING_DATE as string);

export default function CountdownSection() {
  return (
    <section>
      <article className="countdown-article">
        <h2>Poniéndonos serios...</h2>
        <p>
          os agradecemos muchísimo que queráis vivir con nosotros el comienzo de
          nuestra nueva vida.
        </p>
        <p>Estamos contando los días para despegar</p>
        <CustomCountdown date={WEDDING_DATE}></CustomCountdown>
      </article>
    </section>
  );
}
