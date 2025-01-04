import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// Components
import { CustomCountdown } from "../../components/countdown";

const WEDDING_DATE = process.env.NEXT_PUBLIC_WEDDING_DATE as string;

export default function ConfirmedPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex"></meta>
        <title>Boda de Jane y Jorge | Confirmación</title>
      </Head>
      <section>
        <article>
          <h2>¡Muchas gracias por confirmar!</h2>
          <p>Nos vemos en...</p>
          <CustomCountdown date={WEDDING_DATE}></CustomCountdown>
          <picture>
            <Image
              src="/images/landing/paper-plane.png"
              alt=""
              width="250"
              height="150"
            />
          </picture>
          <Link href="/" className="button back-button">
            Volver a la pantalla principal
          </Link>
        </article>
      </section>
      <footer>
        &copy; 2024, made with ❤ by&nbsp;
        <Link href="https://mnunezdm.com" target="_blank" rel="noopener">
          mnunezdm
        </Link>
      </footer>
    </>
  );
}
