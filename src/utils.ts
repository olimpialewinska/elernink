import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export const useSessionCheck = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  if (!token) {
    router.push("/login");
  }
};
