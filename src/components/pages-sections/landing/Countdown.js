import React from "react";
import Image from "next/image";

import { CustomCountdown } from "../../../components/countdown";

const WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDINGDATE;

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
        <picture>
          <Image
            src="/images/landing/paper-plane.png"
            alt=""
            width="250"
            height="150"
          />
        </picture>
      </article>
    </section>
  );
}
