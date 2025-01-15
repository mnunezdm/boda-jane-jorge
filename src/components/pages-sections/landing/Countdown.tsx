import React from "react";

import { CustomCountdown } from "../../countdown";
import { Locale } from "@/lib/i18n";

const WEDDING_DATE = new Date(process.env.NEXT_PUBLIC_WEDDING_DATE as string);

const H2 = {
  [Locale.EN]: "Getting serious...",
  [Locale.ES]: "Poniéndonos serios...",
};
const TEXT = {
  [Locale.EN]: ["we are counting the days to take off..."],
  [Locale.ES]: ["estamos contando los días para despegar..."],
};

export default function CountdownSection({ locale }: { locale: Locale }) {
  return (
    <section>
      <article className="countdown-article">
        <h2>{H2[locale]}</h2>
        {TEXT[locale].map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <CustomCountdown date={WEDDING_DATE} locale={locale}></CustomCountdown>
      </article>
    </section>
  );
}
