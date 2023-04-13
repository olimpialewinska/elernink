"use client";

import { Navbar } from "@/components/navbar";
import { Login } from "@/components/pages/Auth/Login";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  if (token) {
    router.push("/dashboard");
  }
  return (
    <>
      <Navbar />
      <Login />
    </>
  );
}
