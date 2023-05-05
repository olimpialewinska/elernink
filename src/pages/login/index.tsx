import { Navbar } from "@/components/navbar";
import { Login } from "@/components/pages/Auth/Login";
import { ReactElement } from "react";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Login />
    </>
  );
}

LoginPage.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
