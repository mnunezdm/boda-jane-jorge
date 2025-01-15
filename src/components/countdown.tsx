"use client";

import { Locale } from "@/lib/i18n";
import { useEffect, useRef } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

export interface CustomCountdownProps {
  date: Date | string;
  locale: Locale;
}

const DATE_PARTS = {
  [Locale.EN]: ["day", "hour", "minute", "second"],
  [Locale.ES]: ["día", "hora", "minuto", "segundo"],
};

export function CustomCountdown({ date, locale }: CustomCountdownProps) {
  const countdownWidget = useRef<Countdown>(null);

  useEffect(() => {
    countdownWidget?.current?.start();
  }, []);

  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds }) => {
    // Render a countdown
    const values = [
      days && `${days} ${DATE_PARTS[locale][0]}${days > 1 ? "s" : ""}`,
      hours && `${hours} ${DATE_PARTS[locale][1]}${hours > 1 ? "s" : ""}`,
      minutes && `${minutes} ${DATE_PARTS[locale][2]}${minutes > 1 ? "s" : ""}`,
      seconds && `${seconds} ${DATE_PARTS[locale][3]}${seconds > 1 ? "s" : ""}`,
    ].filter((v) => v);

    return (
      <div className="countdown-values">
        {values.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="countdown-container">
      <Countdown
        ref={countdownWidget}
        date={date}
        renderer={renderer}
        autoStart={false}
      ></Countdown>
    </div>
  );
}
