"use client";

import { CoursePage } from "@/components/Dashboard/MyCourses/Course";
import { useSessionCheck } from "@/utils";

export default function ManageEditView({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  useSessionCheck();

  return <CoursePage id={params.id} />;
}
