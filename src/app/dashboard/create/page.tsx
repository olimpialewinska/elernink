"use client";
import { Dashboard } from "@/components/Dashboard";
import { useSessionCheck } from "@/utils";

export default function CreateView() {
  useSessionCheck();
  return <Dashboard />;
}
