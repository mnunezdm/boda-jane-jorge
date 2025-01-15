import React from "react";
import Link from "next/link";

import moment from "moment";

// Sections for this page
import RsvpSection from "../../components/pages-sections/landing/Rsvp";
import CeremoniesSection from "../../components/pages-sections/landing/Ceremonies";
import WelcomeSection from "../../components/pages-sections/landing/Welcome";
import PresentSection from "../../components/pages-sections/landing/Present";
import CountdownSection from "../../components/pages-sections/landing/Countdown";
import ContactSection from "../../components/pages-sections/landing/Contact";
import type { Metadata } from "next";

import { Locale } from "@/lib/i18n";
import { GiSpain } from "react-icons/gi";

export const metadata: Metadata = {
  title: "Jane & Jorge's Wedding",
  description: "Jane & Jorge's Wedding",
  robots: "noindex",
};

const NEXT_PUBLIC_WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE;

export default async function LandingPage() {
  const weddingDate = moment(NEXT_PUBLIC_WEDDING_DATE).locale(Locale.EN);

  return (
    <>
      <header>
        <div className="splash">
          <div className="header">
            <h1>Jane & Jorge</h1>
            <div className="title-date">
              {weddingDate.format("DD [of] MMMM [of] YYYY")}
            </div>
          </div>
        </div>
      </header>
      <main className="relative">
        <div className="absolute change-locale-button py-4 px-3 right-0">
          <Link
            href="/es"
            className="border border-gray-300 px-4 py-1.5 rounded-lg"
          >
            versión en
            <GiSpain className="inline-block ms-1"></GiSpain>
          </Link>
        </div>
        <WelcomeSection locale={Locale.EN} />
        <CeremoniesSection locale={Locale.EN} />
        <RsvpSection locale={Locale.EN} />
        <PresentSection locale={Locale.EN} />
        <CountdownSection locale={Locale.EN} />
        <ContactSection locale={Locale.EN} />
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
