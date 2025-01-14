"use client";

import { useEffect, useRef } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

export interface CustomCountdownProps {
  date: Date | string;
}

export function CustomCountdown({ date }: CustomCountdownProps) {
  const countdownWidget = useRef<Countdown>(null);

  useEffect(() => {
    countdownWidget?.current?.start();
  }, []);

  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds }) => {
    // Render a countdown
    const values = [
      days && `${days} día${days > 1 ? "s" : ""}`,
      hours && `${hours} hora${hours > 1 ? "s" : ""}`,
      minutes && `${minutes} minuto${minutes > 1 ? "s" : ""}`,
      seconds && `${seconds} segundo${seconds > 1 ? "s" : ""}`,
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
