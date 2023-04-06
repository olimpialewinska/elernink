"use client";

import { Dashboard } from "@/components/Dashboard";
import { useSessionCheck } from "@/utils";

export default function DashboardPage() {
  useSessionCheck();
  return <Dashboard />;
}
