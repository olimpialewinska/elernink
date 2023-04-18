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

export function TopicItem(props: TopicProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Topic>
        <Wrapper>
          <Name>{props.topic}</Name>
        </Wrapper>

        <ArrowDown
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </Topic>

      <Content isOpen={isOpen}>{props.lesson}</Content>
    </>
  );
}
