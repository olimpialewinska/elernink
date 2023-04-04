import { useSupabase } from "@/app/supabase-provider";
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
  const [buttonText, setButonText] = useState("Register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const { supabase } = useSupabase();

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await supabase.auth.signUp({
        email: email,
        password: password,
      });
      window.location.href = "/dashboard";
    },
    [email, password, supabase.auth]
  );

  return (
    <Container>
      <RegisterContainer>
        <RegisterHeaderIcon />
        <RegisterContent autoComplete={"on"}>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            style={{ marginBottom: 32 }}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            placeholder="Confirm Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            style={{
              marginBottom: 32,
            }}
            onSubmit={() => handleRegister}
          >
            {buttonText}
          </Button>
        </RegisterContent>
      </RegisterContainer>
    </Container>
  );
}
