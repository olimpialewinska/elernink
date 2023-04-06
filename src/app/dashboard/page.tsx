"use client";

import { Dashboard } from "@/components/Dashboard";
import { cookies } from "next/headers";
import router, { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { useCookies } from "react-cookie";

export default function DashboardPage() {
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
