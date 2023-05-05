import React, { Key, useCallback, useEffect, useRef, useState } from "react";
import {
  ModalBg,
  Container,
  Input,
  HR,
  Title,
  ListContainer,
  Wrapper,
  Button,
} from "./style";
import { Course, IParticipant } from "@/types";
import { UserItem } from "./UserItem";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
  course: Course;
}
export function UserModal(props: MyModalProps) {
  const [courseCode, setCourseCode] = useState(props.course.code);
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [buttonText, setButtonText] = useState("Save");

  const getParticipants = useCallback(async () => {
    const data = await fetch("/api/courses/courseParticipants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: props.course.id,
      }),
    });

    if (data.status === 200) {
      const response = await data.json();
      setParticipants(response);
    }
  }, [props.course.id]);

  const handleDelete = useCallback(
    (id: string) => {
      const newParticipants = participants.filter(
        (participant) => participant.userId !== id
      );
      setParticipants(newParticipants);
    },
    [participants]
  );

  const handleSave = useCallback(async () => {
    const data = await fetch("/api/courses/updateCourseCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: props.course.id,
        courseCode: courseCode,
      }),
    });

    if (data.status !== 200) {
      return;
    }

    setButtonText("Saved");
  }, [courseCode, props.course.id]);

  useEffect(() => {
    getParticipants();
  }, [getParticipants]);

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
          <Title
            style={{
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Course Code
          </Title>
          <Wrapper>
            <Input
              placeholder="Course Code"
              value={courseCode}
              onChange={(e) => {
                setCourseCode(e.target.value);
                setButtonText("Save");
              }}
            />
            <Button
              onClick={() => {
                handleSave();
              }}
            >
              {buttonText}
            </Button>
          </Wrapper>

          <HR />
          <Title>Course Participants</Title>
          <ListContainer>
            {participants.map((participant: IParticipant) => {
              return (
                <UserItem
                  key={participant.userId}
                  user={participant}
                  handleDelete={handleDelete}
                  course={props.course}
                />
              );
            })}
          </ListContainer>
        </Container>
      </ModalBg>
    </>
  );
}
