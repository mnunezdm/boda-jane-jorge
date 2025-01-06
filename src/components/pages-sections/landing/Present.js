"use client";

import React from "react";

import Image from "next/image";

/**
 *
 * @param {EventTarget} element
 */
const selectText = (element) => {
  if (window.getSelection && document.createRange) {
    const selection = window.getSelection();
    if (selection.toString() === "") {
      window.setTimeout(() => {
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }, 1);
    }
  } else if (document.selection) {
    const selection = document.selection.createRange();
    if (selection.text === "") {
      const range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    }
  }
};

export default function PresentSection() {
  const IBAN = process.env.NEXT_PUBLIC_IBAN;

  /**
   *
   * @param {Event} event
   * @returns
   */
  const copyIban = async (event) => {
    selectText(event.currentTarget);

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(IBAN);
      return;
    }
    try {
      await navigator.clipboard.writeText(IBAN);
    } catch (error) {
      console.error(`Async: Could not copy text: ${err}`);
    }
  };

  return (
    <section>
      <article className="present-article">
        <h2>Lo mas importante es que esteis con nosotros,</h2>
        <p>
          Solo os pedimos una cosa, que vengáis y que lo hagáis con muchas ganas
          de disfrutar.
        </p>
        <p>Pero si queréis…</p>
        <div className="text-iban" onClick={copyIban}>
          {IBAN}
        </div>
        <div className="present-gif-container">
          <picture>
            <Image
              src="/images/landing/dinero-dicaprio.gif"
              alt=""
              width="620"
              height="258"
              unoptimized
            />
          </picture>
        </div>
      </article>
    </section>
  );
}
