import { useCallback, useState } from "react";
import {
  Topic,
  Name,
  ArrowDown,
  Wrapper,
  EditButton,
  NameInput,
  Close,
  Save,
  Content,
  Divider,
  Input,
  DeleteButton,
} from "./style";

interface TopicProps {
  topic: string;
  lesson: string;
  id: number;
}

export function TopicEdit(props: TopicProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.topic);

  const [newTopic, setNewTopic] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [lesson, setLesson] = useState(props.lesson);
  const [isLesson, setIsLesson] = useState(false);
  const [newLesson, setNewLesson] = useState("");

  const updateTopic = useCallback(async () => {
    const data = await fetch(`/api/courses/updateTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        value: text,
        type: "topic",
      }),
    });

    if (data.status === 200) {
      setIsEditing(false);
      setNewTopic(text);
    }
  }, [props.id, text]);

  const updateLesson = useCallback(async () => {
    const data = await fetch(`/api/courses/updateTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        value: lesson,
        type: "lesson",
      }),
    });

    if (data.status === 200) {
      setIsLesson(false);
      setNewLesson(lesson);
    }
  }, [props.id, lesson]);

  const deleteTopic = useCallback(async () => {
    const data = await fetch(`/api/courses/deleteTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });

    if (data.status === 200) {
      window.location.reload();
    }
  }, [props.id]);

  const handleKeyDown = useCallback(
    (e: string) => {
      if (e === "Enter") {
        updateTopic();
      }
    },
    [updateTopic]
  );

  if (isEditing) {
    return (
      <>
        <Topic>
          <Wrapper>
            <NameInput
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e.key);
              }}
            />
            <Save
              onClick={() => {
                updateTopic();
              }}
            />
            <Close
              onClick={() => {
                setIsEditing(false);
              }}
            />
          </Wrapper>
          <ArrowDown />
        </Topic>
      </>
    );
  } else {
    return (
      <>
        <Topic>
          <Wrapper>
            <Name>{newTopic === "" ? props.topic : newTopic}</Name>
            <EditButton
              onClick={() => {
                setIsEditing(true);
              }}
            />
            <DeleteButton onClick={deleteTopic} />
          </Wrapper>

          <ArrowDown
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </Topic>
        {isLesson ? (
          <Content isOpen={isOpen}>
            <Input
              value={lesson}
              onChange={(e) => {
                setLesson(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e.key);
              }}
            />
            <Save
              onClick={() => {
                updateLesson();
              }}
            />
            <Close
              onClick={() => {
                setIsLesson(false);
              }}
            />
          </Content>
        ) : (
          <Content isOpen={isOpen}>
            {newLesson === "" ? props.lesson : newLesson}
            <EditButton
              onClick={() => {
                setIsLesson(true);
              }}
            />
          </Content>
        )}
      </>
    );
  }
}
