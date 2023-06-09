/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useContext, useState } from "react";
import {
  ModalBg,
  Image,
  Container,
  Navbar,
  Title,
  Description,
  Row,
  Wrapper,
  Content,
  Button,
  CodeInput,
  Validation,
} from "./style";
import { Course } from "@/types";
import { mainContext } from "@/pages/_app";

interface MyModalProps {
  course: Course;
  visible: boolean;
  hide: () => void;
}
function MyModal(props: MyModalProps) {
  const { auth } = useContext(mainContext);
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValid(true);
      setCode(event.target.value);
    },
    []
  );

  const handleSignUp = useCallback(async () => {
    const res = await fetch("/api/courses/joinCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: auth.id,
        courseId: props.course.id,
        userName: auth.email,
      }),
    });

    if (res.status === 200) {
      props.hide();

      window.location.replace("/dashboard/find");
    }
  }, [auth, props]);

  const handleSubmit = useCallback(() => {
    if (props.course.code == code) {
      setValid(true);
      handleSignUp();
    } else {
      setValid(false);
    }
  }, [code, handleSignUp, props.course.code]);

  return (
    <>
      <ModalBg
        style={{
          opacity: props.visible ? 1 : 0,
          pointerEvents: props.visible ? "inherit" : "none",
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            props.hide();
          }
        }}
      >
        <Container>
          <Navbar>
            <Image
              style={{
                backgroundImage: props.course.image
                  ? `url(${props.course.image})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Wrapper>
              <Row>
                <Title>{props.course.name}</Title>
              </Row>
              <Row>
                <Description>{props.course.description}</Description>
              </Row>
            </Wrapper>
          </Navbar>
          <Content>
            {props.course.code == "" || null || undefined ? (
              <>
                <Button onClick={handleSignUp}>Join Course</Button>
              </>
            ) : (
              <>
                {!valid ? (
                  <>
                    <Validation>{"Wrong code"}</Validation>
                  </>
                ) : (
                  <>
                    <Validation
                      style={{
                        color: " #333",
                      }}
                    >
                      {"Enter valid Course Code"}
                    </Validation>
                  </>
                )}
                <CodeInput
                  type="text"
                  placeholder="Enter Code"
                  value={code}
                  onChange={(e) => handleChange(e)}
                />
                <Button onClick={handleSubmit}>Join Course</Button>
              </>
            )}
          </Content>
        </Container>
      </ModalBg>
    </>
  );
}

export { MyModal };
