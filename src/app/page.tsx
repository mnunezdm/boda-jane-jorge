import React from "react";
import Link from "next/link";

import moment from "moment";

// Sections for this page
import RsvpSection from "../components/pages-sections/landing/Rsvp";
import CeremoniesSection from "../components/pages-sections/landing/Ceremonies";
import WelcomeSection from "../components/pages-sections/landing/Welcome.js";
import PresentSection from "../components/pages-sections/landing/Present.js";
import CountdownSection from "../components/pages-sections/landing/Countdown.js";
import { type Metadata } from "next";

const NEXT_PUBLIC_WEDDINGDATE = process.env.NEXT_PUBLIC_WEDDINGDATE;

const weddingDate = moment(NEXT_PUBLIC_WEDDINGDATE);

export const metadata: Metadata = {
  title: "Boda de Jane y John",
  description: "Boda de Jane y John",
  robots: "noindex",
  formatDetection: {
    telephone: false,
  },
};

export default function LandingPage() {
  return (
    <>
      <header>
        <div className="splash">
          <div className="header">
            <h1>Jane y John</h1>
            <div className="title-location">Madrid</div>
            <div className="title-date">
              {weddingDate.format("D")} de {weddingDate.format("MMMM")} de{" "}
              {weddingDate.format("YYYY")}
            </div>
          </div>
        </div>
      </header>
      <WelcomeSection />
      <CeremoniesSection />
      <RsvpSection />
      <PresentSection />
      <CountdownSection />
      <footer>
        &copy; 2024, made with ❤ by&nbsp;
        <Link href="https://mnunezdm.com" target="_blank" rel="noopener">
          mnunezdm
        </Link>
      </footer>
    </>
  );
}
