import { redirect } from "next/navigation";
import { useCookies } from "react-cookie";

export const useSessionCheck = () => {
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  if (!token) {
    redirect("/login");
  }
};
