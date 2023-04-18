"use client";
import { Dashboard } from "@/components/Dashboard";
import { Edit } from "@/components/Dashboard/Manage/Edit";
import { useSessionCheck } from "@/utils";
import { useRouter } from "next/navigation";

export default function CourseView() {
  useSessionCheck();

  return <Dashboard />;
}
