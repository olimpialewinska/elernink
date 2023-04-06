"use client";
import { Dashboard } from "@/components/Dashboard";
import { useSessionCheck } from "@/utils";

export default function FindView() {
  useSessionCheck();

  return <Dashboard />;
}
