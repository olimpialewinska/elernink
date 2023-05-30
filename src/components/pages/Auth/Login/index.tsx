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
  Paragraph,
} from "../style";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { emailValidation } from "@/utils/functions";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [valid, setValid] = useState(true);

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
      setError(data.error);
    } else {
      router.push("/dashboard");
    }
  }, [email, password, router]);

  const handleMailValidation = useCallback(() => {
    setError("");
    setValid(emailValidation(email));
  }, [email]);

  const handleKeyDown = useCallback(
    (e: string) => {
      if (e === "Enter") {
        signInWithEmail();
      }
    },
    [signInWithEmail]
  );

  return (
    <Container>
      <LoginContainer>
        <LoginHeaderIcon />
        <Paragraph
          style={{
            color: error ? "red" : !valid ? "red" : "black",
          }}
        >
          {error
            ? error
            : !valid
            ? "Please enter a valid email address"
            : "Log in to your account"}
        </Paragraph>

        <LoginContent autoComplete={"on"}>
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              handleMailValidation();
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e.key);
            }}
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

          <ParagraphWrapper
            style={{
              flexDirection: "column",
            }}
          >
            <Text>Have you forgotten your password? </Text>
            <Link href="/forgottenPassword">
              <Href
                style={{
                  marginTop: "0.5rem",
                }}
              >
                Remind me!
              </Href>
            </Link>
          </ParagraphWrapper>
        </LoginFooter>
      </LoginContainer>
    </Container>
  );
}
