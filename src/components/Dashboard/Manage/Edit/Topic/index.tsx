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
} from "./style";

interface TopicProps {
  name: string;
  id: number;
}

export function TopicEdit(props: TopicProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.name);

  const [newTopic, setNewTopic] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const updateTopic = useCallback(async () => {
    const data = await fetch(`/api/courses/updateTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        name: text,
      }),
    });

    if (data.status === 200) {
      setIsEditing(false);
      setNewTopic(text);
    }
  }, [props.id, text]);
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
            <Name>{newTopic === "" ? props.name : newTopic}</Name>
            <EditButton
              onClick={() => {
                setIsEditing(true);
              }}
            />
          </Wrapper>

          <ArrowDown
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </Topic>
        <Content isOpen={isOpen}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In omnis fuga
          officia nostrum doloribus laboriosam, iusto quod. Similique, maiores?
          Expedita molestias nobis, nostrum quas possimus facere ipsa sint totam
          corporis.
          <Divider />
        </Content>
      </>
    );
  }
}
