import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Input,
  RegisterContent,
  RegisterHeaderIcon,
  RegisterContainer,
  Paragraph,
} from "../style";
import { useCallback, useState } from "react";

export function Register() {
  const router = useRouter();
  const [buttonText, setButonText] = useState("Register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [match, setMatch] = useState(true);
  const [error, setError] = useState("");

  const registerWithEmail = useCallback(async () => {
    setButonText("Loading...");
    if (email === "" || password === "") {
      setButonText("Register");
      return;
    }
    if (password !== confirm) {
      setButonText("Register");
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
      setError("User already exists");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setError("Something went wrong");
    }

    setButonText("Register");
  }, [confirm, email, password, router]);

  const emailValidation = useCallback(() => {
    setError("");
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
    setValidEmail(expression.test(email));
  }, [email]);

  const passwordMatch = useCallback(
    (confirm: string) => {
      setError("");
      console.log(password, confirm);
      password == confirm ? setMatch(true) : setMatch(false);
    },
    [password]
  );

  return (
    <Container>
      <RegisterContainer>
        <RegisterHeaderIcon />
        <Paragraph
          style={{
            color: error
              ? "red"
              : !validEmail
              ? "red"
              : !match
              ? "red"
              : "black",
          }}
        >
          {error
            ? error
            : !validEmail
            ? "Please enter a valid email"
            : !match
            ? "Passwords do not match"
            : "Create new account"}
        </Paragraph>
        <RegisterContent autoComplete={"on"}>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              emailValidation();
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirm(e.target.value);
              passwordMatch(e.target.value);
            }}
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
