import React from "react";
import Head from "next/head";
import Link from "next/link";

// Sections for this page
import LoginForm from "../pages-sections/login/Login";

export default function LoginPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex"></meta>
        <title>Boda de Jane y John | Login</title>
      </Head>
      <section className="login-section">
        <LoginForm></LoginForm>
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
