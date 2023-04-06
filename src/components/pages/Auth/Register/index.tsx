import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Input,
  RegisterContent,
  RegisterHeaderIcon,
  RegisterContainer,
} from "../style";
import { useCallback, useState } from "react";

export function Register() {
  const router = useRouter();
  const [buttonText, setButonText] = useState("Register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const registerWithEmail = useCallback(async () => {
    setButonText("Loading...");
    if (email === "" || password === "") {
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = response.status;

    if (data === 200) {
      router.push("/login");
    } else if (data === 400) {
      alert("User already exists");
    } else {
      alert("Something went wrong");
    }

    setButonText("Register");
  }, [confirm, email, password, router]);

  return (
    <Container>
      <RegisterContainer>
        <RegisterHeaderIcon />
        <RegisterContent autoComplete={"on"}>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button
            style={{
              marginBottom: 32,
            }}
            onClick={registerWithEmail}
          >
            {buttonText}
          </Button>
        </RegisterContent>
      </RegisterContainer>
    </Container>
  );
}
