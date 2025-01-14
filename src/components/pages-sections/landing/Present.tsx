"use client";

import React from "react";

import { CopyableEvent } from "@/components/copyableText";

const IBAN = process.env.NEXT_PUBLIC_IBAN || "";
const SWIFT = process.env.NEXT_PUBLIC_SWIFT || "";

export default function PresentSection() {
  return (
    <section>
      <article className="present-article">
        <h2>Lo mas importante es que esteis con nosotros,</h2>
        <p>
          Solo os pedimos una cosa, que vengáis y que lo hagáis con muchas ganas
          de disfrutar.
        </p>
        <p>Pero si queréis…</p>
        <dl>
          <dt>IBAN:</dt>
          <CopyableEvent textToCopy={IBAN} className="text-iban mt-3" Tag="dd">
            {IBAN}
          </CopyableEvent>
          {SWIFT && (
            <>
              <dt className="mt-6">SWIFT:</dt>
              <CopyableEvent
                textToCopy={SWIFT}
                className="text-iban mt-3"
                Tag="dd"
              >
                {SWIFT}
              </CopyableEvent>
            </>
          )}
        </dl>
      </article>
    </section>
  );
}
