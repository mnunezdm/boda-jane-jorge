"use client";

import React from "react";

import { CopyableEvent } from "@/components/copyableText";

export default function PresentSection() {
  const IBAN = process.env.NEXT_PUBLIC_IBAN || "";

  return (
    <section>
      <article className="present-article">
        <h2>Lo mas importante es que esteis con nosotros,</h2>
        <p>
          Solo os pedimos una cosa, que vengáis y que lo hagáis con muchas ganas
          de disfrutar.
        </p>
        <p>Pero si queréis…</p>
        <CopyableEvent textToCopy={IBAN} className="text-iban">
          {IBAN}
        </CopyableEvent>
      </article>
    </section>
  );
}
