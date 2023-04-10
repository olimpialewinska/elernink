import { useCallback, useContext, useState } from "react";
import {
  Container,
  Navbar,
  Title,
  Wrapper,
  Text,
  Email,
  Password,
  Validation,
  Button,
} from "./style";
import { userContext } from "..";
import { useCookies } from "react-cookie";

export function Settings() {
  const { email, id } = useContext(userContext);
  const [mail, setMail] = useState(email);
  const [password, setPassword] = useState("");

  const [valid, setValid] = useState(true);
  const [match, setMatch] = useState(true);

  const [validationText, setValidationText] = useState("Change your email");
  const [validationTextPass, setValidationTextPass] = useState(
    "Change your password"
  );

  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;

  const emailValidation = useCallback(() => {
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
    setValid(expression.test(mail));
  }, [mail]);

  const passwordMatch = useCallback(
    (confirm: string) => {
      password == confirm ? setMatch(true) : setMatch(false);
    },
    [password]
  );

  const updatePassword = useCallback(async () => {
    const data = await fetch("/api/auth/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        value: password,
        type: "password",
      }),
    });
    const res = data.status;

    if (res == 200) {
      setValidationTextPass("Account updated successfully");
    } else {
      const message = await data.json();
      setValidationTextPass(message.error);
    }
  }, [id, password]);

  const updateData = useCallback(async () => {
    const data = await fetch("/api/auth/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        value: mail,
        type: "email",
      }),
    });

    const res = data.status;

    if (res == 200) {
      setValidationText("Account updated successfully");
    } else {
      const message = await data.json();
      setValidationText(message.error);
    }
  }, [id, mail]);

  return (
    <>
      <Navbar>
        <Title>Settings</Title>
      </Navbar>
      <Container>
        <Wrapper>
          <Text>Account</Text>
          <Validation
            style={{
              color: valid ? "black" : "red",
            }}
          >
            {!valid ? "Please enter a valid email" : validationText}
          </Validation>
          <Email
            placeholder="Email"
            onChange={(e) => {
              emailValidation();
              setMail(e.target.value);
            }}
            value={mail}
          />
          <Button
            onClick={() => {
              updateData();
            }}
          >
            Update email
          </Button>
          <Validation
            style={{
              color: match ? "black" : "red",
            }}
          >
            {!match ? "Passwords do not match" : validationTextPass}
          </Validation>
          <Password
            type="password"
            placeholder="New password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Password
            type="password"
            placeholder="Confirm new password"
            onChange={(e) => {
              passwordMatch(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              updatePassword();
            }}
          >
            Update password
          </Button>
        </Wrapper>
      </Container>
    </>
  );
}
