import { TopicInterface } from "@/types";
import {
  Content,
  Divider,
  Topic,
  TopicTitle,
  DeleteButton,
  Input,
  Wrapper,
} from "./style";
import { ChangeEvent, useCallback, useContext, useRef, useState } from "react";
import { listContext } from "..";

interface TopicItemInterface {
  topic: TopicInterface;
  key: number;
}

export function TopicItem(props: TopicItemInterface) {
  const {
    dragEnter,
    dragStart,
    deleteItem,
    drop,
    changeLesson,
    changeTopic,
    list,
    setList,
  } = useContext(listContext);

  const [lesson, setLesson] = useState(props.topic.lesson);
  const [topic, setTopic] = useState(props.topic.topic);

  const handleChangeTopic = useCallback(
    (e: string) => {
      setTopic(e);
      changeTopic(props.topic.id, e);
    },
    [changeTopic, props.topic.id]
  );

  const handleChangeLesson = useCallback(
    (e: string) => {
      setLesson(e);
      changeLesson(props.topic.id, e);
    },
    [changeLesson, props.topic.id]
  );

  return (
    <Wrapper
      onDragStart={(e) => {
        dragStart(e, props.topic.id);
      }}
      onDragEnter={(e) => dragEnter(e, props.topic.id)}
      onDragEnd={(e) => {
        drop(props.topic.id);
      }}
      draggable
    >
      <Topic>
        <TopicTitle
          value={topic}
          onChange={(e) => handleChangeTopic(e.target.value)}
        />
        <DeleteButton
          onClick={() => {
            deleteItem(props.topic.id);
          }}
        />
      </Topic>
      <Content>
        <Input
          value={lesson}
          onChange={(e) => {
            handleChangeLesson(e.target.value);
          }}
        />
        <Divider />
      </Content>
    </Wrapper>
  );
}
