"use client";

import { Navbar } from "@/components/navbar";
import { Register } from "@/components/pages/Auth/Register";
import { useEffect, useState } from "react";
import { useSupabase } from "../supabase-provider";
import { Session } from "@supabase/supabase-js";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <Register />
    </>
  );
}
