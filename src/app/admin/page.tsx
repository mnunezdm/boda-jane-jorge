"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";

// Sections for this page
import ConfirmationsSection from "../../components/pages-sections/admin/confirmations";

// Components
import { Logout } from "../../components/logout";

// Custom Hooks
import { useUser } from "../../lib/hooks/useUser";

import ScaleLoader from "react-spinners/ScaleLoader";

export default function AdminPage() {
  const { user, isLoading, isError } = useUser({
    redirectTo: "/login",
  });

  return (
    <>
      <Head>
        <meta name="robots" content="noindex"></meta>
        <title>Boda de Jane y Jorge | Admin</title>
      </Head>
      <header className="admin-header">
        <h2>{user?.greeting()}</h2>
        <Logout></Logout>
      </header>
      {isLoading && (
        <section className="loader-container">
          <ScaleLoader color="#CCC"></ScaleLoader>
          <h2 className="loader-text">Cargando vuestro espacio personal</h2>
        </section>
      )}
      {isError && (
        <section className="loader-container">
          <h2 className="loader-text">Ups... algo ha fallado</h2>
        </section>
      )}
      {user?.isLogged && <ConfirmationsSection></ConfirmationsSection>}

      <footer>
        &copy; 2024, made with ❤ by&nbsp;
        <Link href="https://mnunezdm.com" target="_blank" rel="noopener">
          mnunezdm
        </Link>
      </footer>
    </>
  );
}
