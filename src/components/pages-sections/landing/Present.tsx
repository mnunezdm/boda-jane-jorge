"use client";

import React from "react";

import { CopyableEvent } from "@/components/copyableText";
import { SiRevolut } from "react-icons/si";
import { Locale } from "@/lib/i18n";
import Link from "next/link";

const IBAN = process.env.NEXT_PUBLIC_IBAN || "";
const SWIFT = process.env.NEXT_PUBLIC_SWIFT || "";
const REVOLUT = process.env.NEXT_PUBLIC_REVOLUT || "";

const ACCOUNT_NAME = process.env.NEXT_PUBLIC_PRESENT_EN_NAME || "";
const BANK_NAME = process.env.NEXT_PUBLIC_PRESENT_EN_BANK_NAME || "";
const ACCOUNT_NUMBER = process.env.NEXT_PUBLIC_PRESENT_EN_ACCOUNT_NUMBER || "";
const BRANCH_CODE = process.env.NEXT_PUBLIC_PRESENT_EN_BRANCH_CODE || "";

const H2 = {
  [Locale.EN]: "The Best Gift: You",
  [Locale.ES]: "El Mejor Regalo: Vosotros",
};

const TEXT = {
  [Locale.EN]: [
    "The most important thing is that you are with us on this special day and we do not need more than your company, but if you want to make us a gift for our new adventure, we will be very grateful.",
  ],
  [Locale.ES]: [
    "Pero aunque lo más importante es que estéis con nosotros en este día tan especial y no necesitamos más que vuestra compañía, si queréis hacernos un regalo para nuestra nueva aventura, os lo agradeceremos mucho",
  ],
};

function PresentSpain() {
  return (
    <>
      <dt>IBAN:</dt>
      <CopyableEvent
        textToCopy={IBAN}
        className="text-iban mt-3 cursor-copy"
        Tag="dd"
      >
        {IBAN}
      </CopyableEvent>
      <dt className="mt-6">SWIFT:</dt>
      <CopyableEvent
        textToCopy={SWIFT}
        className="text-iban mt-3 cursor-copy"
        Tag="dd"
      >
        {SWIFT}
      </CopyableEvent>
    </>
  );
}

function PresentInternational() {
  return (
    <>
      <dt className="mt-6">REVOLUT:</dt>
      <dd>
        <Link href={REVOLUT} target="_blank">
          {REVOLUT}
          <SiRevolut className="inline-block ms-2"></SiRevolut>
        </Link>
      </dd>
      <div className="separator"></div>
      <dt className="mt-6">Account Holder:</dt>
      <CopyableEvent
        textToCopy={ACCOUNT_NAME}
        className="text-iban mt-3 cursor-copy"
        Tag="dd"
      >
        {ACCOUNT_NAME}
      </CopyableEvent>
      <dt className="mt-6">Account Number:</dt>
      <CopyableEvent
        textToCopy={ACCOUNT_NUMBER}
        className="text-iban mt-3 cursor-copy"
        Tag="dd"
      >
        {ACCOUNT_NUMBER}
      </CopyableEvent>
      <dt className="mt-6">Bank Name:</dt>
      <CopyableEvent
        textToCopy={BANK_NAME}
        className="text-iban mt-3 cursor-copy"
        Tag="dd"
      >
        {BANK_NAME}
      </CopyableEvent>
      <dd></dd>
      <dt className="mt-6">Branch Code:</dt>
      <CopyableEvent
        textToCopy={BRANCH_CODE}
        className="text-iban mt-3 cursor-copy"
        Tag="dd"
      >
        {BRANCH_CODE}
      </CopyableEvent>
    </>
  );
}

export default function PresentSection({ locale }: { locale: Locale }) {
  return (
    <section>
      <article className="present-article">
        <h2>{H2[locale]}</h2>
        {TEXT[locale].map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        <dl>
          {locale === Locale.ES ? <PresentSpain /> : <PresentInternational />}
        </dl>
      </article>
    </section>
  );
}
