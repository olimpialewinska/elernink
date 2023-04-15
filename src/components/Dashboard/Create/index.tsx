import { DragEvent, useCallback, useRef, useState } from "react";
import {
  Box,
  Container,
  Content,
  CreateButton,
  DeleteButton,
  DescriptionInput,
  Divider,
  IdentityBox,
  ImageInput,
  LessonContent,
  NameInput,
  Navbar,
  NewTopicButton,
  Title,
  Topic,
  TopicTitle,
  Wrapper,
  CodeInput,
} from "./style";

interface Topic {
  name: string;
  lesson: string;
}

export function Create() {
  const dragItem = useRef<number | null>(0);
  const dragOverItem = useRef<number | null>();
  const [list, setList] = useState<Topic[]>([
    { name: "Topic", lesson: "Lesson" },
  ]);

  const dragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, position: number) => {
      dragItem.current = position;
    },
    []
  );

  const dragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>, position: number | null | undefined) => {
      dragOverItem.current = position;
    },
    []
  );

  const drop = useCallback(() => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current!];
    copyListItems.splice(dragItem.current!, 1);
    copyListItems.splice(dragOverItem.current!, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  }, [list]);

  const addNewItem = useCallback(() => {
    setList((prev) => [...prev, { name: `Topic`, lesson: `Lesson` }]);
  }, []);

  const deleteItem = useCallback((index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <>
      <Navbar>
        <Title>Create</Title>
        <CreateButton draggable>Create</CreateButton>
      </Navbar>
      <Container>
        <Box>
          <IdentityBox>
            <Wrapper>
              <NameInput placeholder="Name" required />
              <CodeInput placeholder="Course code" required />
            </Wrapper>

            <ImageInput type="file" />
            <DescriptionInput placeholder="Description" />
          </IdentityBox>
          {list &&
            list.map((item, index) => (
              <>
                <Topic
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={index}
                  draggable
                >
                  <TopicTitle value={item.name} />
                  <DeleteButton onClick={() => deleteItem(index)} />
                </Topic>
                <Content>
                  <LessonContent placeholder="Lesson" value={item.lesson} />
                  <Divider />
                </Content>
              </>
            ))}
          <NewTopicButton onClick={addNewItem}>+</NewTopicButton>
        </Box>
      </Container>
    </>
  );
}
