import React from "react";
import Link from "next/link";

import moment from "moment";

// Sections for this page
import RsvpSection from "../components/pages-sections/landing/Rsvp";
import CeremoniesSection from "../components/pages-sections/landing/Ceremonies";
import WelcomeSection from "../components/pages-sections/landing/Welcome";
import PresentSection from "../components/pages-sections/landing/Present";
import CountdownSection from "../components/pages-sections/landing/Countdown";
import ContactSection from "../components/pages-sections/landing/Contact";
import { type Metadata } from "next";

const NEXT_PUBLIC_WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE;

const weddingDate = moment(NEXT_PUBLIC_WEDDING_DATE);

export const metadata: Metadata = {
  title: "Boda de Jane y Jorge",
  description: "Boda de Jane y Jorge",
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
            <h1>Jane y Jorge</h1>
            <div className="title-date">
              {weddingDate.format("DD [de] MMMM [de] YYYY")}
            </div>
          </div>
        </div>
      </header>
      <main>
        <WelcomeSection />
        <CeremoniesSection />
        <RsvpSection />
        <PresentSection />
        <CountdownSection />
        <ContactSection />
      </main>
      <footer>
        &copy; 2025, made with ❤ by&nbsp;
        <Link href="https://mnunezdm.com" target="_blank" rel="noopener">
          mnunezdm
        </Link>
      </footer>
    </>
  );
}
