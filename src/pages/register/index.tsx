import { Navbar } from "@/components/navbar";
import { Register } from "@/components/pages/Auth/Register";
import { InferGetServerSidePropsType, NextApiRequest } from "next";

import { ReactElement, useContext } from "react";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <Register />
    </>
  );
}

RegisterPage.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
