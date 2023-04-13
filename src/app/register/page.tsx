"use client";

import { Navbar } from "@/components/navbar";
import { Register } from "@/components/pages/Auth/Register";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function RegisterPage() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  if (token) {
    router.push("/dashboard");
  }
  return (
    <>
      <Navbar />
      <Register />
    </>
  );
}
