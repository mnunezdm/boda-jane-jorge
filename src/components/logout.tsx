"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutUser } from "../lib/provider/user";

export function Logout() {
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <button className="button logout-button" onClick={logout}>
      <span className="logout-button-text">Cerrar Sesión</span>
      <Image src="/images/admin/logout.png" alt="" width="24" height="24" />
    </button>
  );
}
