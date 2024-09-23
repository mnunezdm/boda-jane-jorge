import { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

export function CustomCountdown({ date, onComplete }) {
  const [start, setStart] = useState(false);
  const countdownWidget = useRef(null);

  useEffect(() => {
    setStart(true);
  }, []);

  useEffect(() => {
    if (date && countdownWidget && start) {
      countdownWidget.current.start();
    }
  }, [date, countdownWidget, start]);

  const renderer = ({ days, hours, minutes, seconds }) => {
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
      {start && (
        <Countdown
          ref={countdownWidget}
          date={date}
          renderer={renderer}
          onComplete={onComplete}
        ></Countdown>
      )}
    </div>
  );
}
