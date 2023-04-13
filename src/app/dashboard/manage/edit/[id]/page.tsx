"use client";
import { Dashboard } from "@/components/Dashboard";
import { Edit } from "@/components/Dashboard/Manage/Edit";
import { useSessionCheck } from "@/utils";
import { useRouter } from "next/navigation";

export default function ManageEditView({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  useSessionCheck();

  return <Edit id={params.id} />;
}
