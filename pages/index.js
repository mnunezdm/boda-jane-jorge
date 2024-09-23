import React from "react";
import Head from "next/head";
import Link from "next/link";

import moment from "moment";

// Sections for this page
import RsvpSection from "../pages-sections/landing/Rsvp";
import CeremoniesSection from "../pages-sections/landing/Ceremonies";
import WelcomeSection from "../pages-sections/landing/Welcome.js";
import PresentSection from "../pages-sections/landing/Present.js";
import CountdownSection from "../pages-sections/landing/Countdown.js";

const NEXT_PUBLIC_WEDDINGDATE = process.env.NEXT_PUBLIC_WEDDINGDATE;

const weddingDate = moment(NEXT_PUBLIC_WEDDINGDATE);

export default function LandingPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex"></meta>
        <meta name="format-detection" content="telephone=no"></meta>
        <title>Boda de Jane y John</title>
      </Head>
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
