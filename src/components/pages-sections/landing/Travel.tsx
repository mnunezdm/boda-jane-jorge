"use client";

import React from "react";

import Link from "next/link";
import { PiAirplaneLanding, PiPark, PiFilePdf } from "react-icons/pi";
import { LiaHotelSolid } from "react-icons/lia";
import { BsPassport } from "react-icons/bs";

const LINK_HOTELS = process.env.NEXT_PUBLIC_LINK_HOTELS || "";
const LINK_WHAT_TO_VISIT = process.env.NEXT_PUBLIC_LINK_WHAT_TO_VISIT || "";
const LINK_REQ_AU = process.env.NEXT_PUBLIC_LINK_REQ_AU || "";
const LINK_REQ_SA = process.env.NEXT_PUBLIC_LINK_REQ_SA || "";

export default function TravelSection() {
  return (
    <section>
      <article className="present-article">
        <h2>Travel information</h2>
        <h3>
          How to get to Spain{" "}
          <PiAirplaneLanding className="inline-block text-2xl" />
        </h3>
        <p>
          We recommend flying into Adolfo Suárez Madrid-Barajas Airport, the
          main international airport in Madrid
        </p>
        <h3>
          Hotel Guide <LiaHotelSolid className="inline-block text-2xl" />
        </h3>
        <p>
          We’ve put together a PDF with some lovely hotel recommendations to
          help you find the perfect place to stay during your visit. We hope it
          makes your planning a little easier!
        </p>
        <Link href={LINK_HOTELS} hrefLang="en" target="_blank">
          <PiFilePdf className="text-4xl" />
        </Link>
        <h3>
          What to visit <PiPark className="inline-block text-2xl" />
        </h3>
        <p>
          We’ve created a PDF with our favorite spots to visit and explore
          during your time here. We hope these suggestions add a special touch
          to your trip!
        </p>
        <Link href={LINK_WHAT_TO_VISIT} hrefLang="en" target="_blank">
          <PiFilePdf className="text-4xl" />
        </Link>
        <h3>
          Required Documentation{" "}
          <BsPassport className="inline-block text-2xl" />
        </h3>
        <p>
          To make sure you don’t miss anything for your journey we’ve created
          this PDF with all the details you’ll need.
        </p>
        <ul>
          <li>
            Check this document if coming from Australia{" "}
            <Link
              href={LINK_REQ_AU}
              hrefLang="en"
              className="flex justify-center mt-4"
              target="_blank"
            >
              <PiFilePdf className="text-4xl text-center" />
            </Link>
          </li>
          <li className="mt-6">
            Check this document if coming from South Africa{" "}
            <Link
              href={LINK_REQ_SA}
              hrefLang="en"
              className="flex justify-center mt-4"
              target="_blank"
            >
              <PiFilePdf className="text-4xl text-center" />
            </Link>
          </li>
        </ul>
      </article>
    </section>
  );
}
