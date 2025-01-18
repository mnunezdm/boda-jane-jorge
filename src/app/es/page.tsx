import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import moment from "moment";
import "moment/locale/es";
import { AiOutlineGlobal } from "react-icons/ai";

// Sections for this page
import RsvpSection from "../../components/pages-sections/landing/Rsvp";
import CeremoniesSection from "../../components/pages-sections/landing/Ceremonies";
import WelcomeSection from "../../components/pages-sections/landing/Welcome";
import PresentSection from "../../components/pages-sections/landing/Present";
import CountdownSection from "../../components/pages-sections/landing/Countdown";
import ContactSection from "../../components/pages-sections/landing/Contact";

import { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Boda de Jane y Jorge",
  description: "Boda de Jane y Jorge",
  robots: "noindex",
};

const NEXT_PUBLIC_WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE;

export default async function LandingPage() {
  const weddingDate = moment(NEXT_PUBLIC_WEDDING_DATE).locale(Locale.ES);
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
      <main className="relative">
        <div className="absolute change-locale-button py-4 px-3 right-0">
          <Link
            href="/en"
            className="border border-gray-300 px-4 py-1.5 rounded-lg"
          >
            go to
            <AiOutlineGlobal className="inline-block mx-1"></AiOutlineGlobal>
            version
          </Link>
        </div>
        <WelcomeSection locale={Locale.ES} />
        <CeremoniesSection locale={Locale.ES} />
        <RsvpSection locale={Locale.ES} />
        <PresentSection locale={Locale.ES} />
        <CountdownSection locale={Locale.ES} />
        <ContactSection locale={Locale.ES} />
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
