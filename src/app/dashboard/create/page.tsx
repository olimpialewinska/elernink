"use client";
import { Dashboard } from "@/components/Dashboard";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useCookies } from "react-cookie";

export default function CreateView() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["Authorization"]);

  useLayoutEffect(() => {
    const token = cookies.Authorization;
    if (!token) {
      router.push("/login");
    }
  }, [cookies.Authorization, router]);
  return <Dashboard />;
}
