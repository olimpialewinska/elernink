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
import { useSupabase } from "@/app/supabase-provider";
import { useEffect, useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { supabase } = useSupabase();
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "olim1003@gmail.com",
      password: "aa",
    });
    if (error) {
      console.log(error);
    }
  }

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
          <Button type="submit" onClick={signInWithEmail}>
            Log in
          </Button>
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
