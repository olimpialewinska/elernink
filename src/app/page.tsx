"use client";
import { HomePage } from "@/components/pages/Home";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Home() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  if (token) {
    router.push("/dashboard");
  }
  return <HomePage />;
}
