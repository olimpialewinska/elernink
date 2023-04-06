/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
import Link from "next/link";
import {
  Button,
  Container,
  Text,
  LoginContainer,
  Href,
  Input,
  LoginContent,
  LoginFooter,
  LoginHeaderIcon,
  ParagraphWrapper,
} from "../style";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signInWithEmail = useCallback(async () => {
    if (email === "" || password === "") {
      return;
    }
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      router.push("/dashboard");
    }
  }, [email, password, router]);

  return (
    <Container>
      <LoginContainer>
        <LoginHeaderIcon />
        <LoginContent autoComplete={"on"}>
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
          <Button onClick={signInWithEmail}>Log in</Button>
        </LoginContent>
        <LoginFooter>
          <ParagraphWrapper>
            <Text>Don't have an acoount? </Text>
            <Link href="/register">
              <Href>Sign up!</Href>
            </Link>
          </ParagraphWrapper>

          <ParagraphWrapper>
            <Text>Have you forgotten your password? </Text>
            <Link href="/forgottenPassword">
              <Href>Remind me!</Href>
            </Link>
          </ParagraphWrapper>
        </LoginFooter>
      </LoginContainer>
    </Container>
  );
}
