import {
  Dispatch,
  DragEvent,
  MutableRefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
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
  AlertInput,
} from "./style";
import { TopicItem } from "./Topic";
import { TopicInterface } from "@/types";
import { userContext } from "..";
import { useRouter } from "next/navigation";

interface Topic {
  name: string;
  lesson: string;
}

interface listContextInterface {
  dragStart: (e: DragEvent<HTMLDivElement>, position: number) => void;
  dragEnter: (
    e: DragEvent<HTMLDivElement>,
    position: number | null | undefined
  ) => void;
  drop: (id: number) => void;
  deleteItem: (index: number) => void;
  changeTopic: (index: number, topic: string) => void;
  changeLesson: (index: number, lesson: string) => void;
  list: TopicInterface[];
  setList: Dispatch<SetStateAction<TopicInterface[]>>;
}

export const listContext = createContext({} as listContextInterface);

export function Create() {
  const router = useRouter();
  const { id } = useContext(userContext);
  const dragItem = useRef<number | null>(0);
  const dragOverItem = useRef<number | null>();
  const [button, setButton] = useState("Create");
  const [list, setList] = useState<TopicInterface[]>([
    { topic: `Topic 0`, lesson: "Lesson 0", id: 0 },
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState("");
  const [code, setCode] = useState("");
  const [alert, setAlert] = useState("");

  const dragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, position: number) => {
      dragItem.current = position;
      console.log(dragItem);
    },
    []
  );

  const dragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>, position: number | null | undefined) => {
      dragOverItem.current = position;
      console.log(dragOverItem);
    },
    []
  );

  const drop = useCallback(
    (id: number) => {
      if (dragItem.current === null || dragOverItem.current === null) return;

      const dragItemIndex = list.findIndex((x) => x.id === dragItem.current);
      const dragOverItemIndex = list.findIndex(
        (x) => x.id === dragOverItem.current
      );

      const item = list[dragItemIndex];
      const newList = list.filter((x) => x.id !== item.id);
      newList.splice(dragOverItemIndex, 0, item);
      setList(newList);
    },
    [list]
  );

  const addNewItem = useCallback(() => {
    setList((prev) => [
      ...prev,
      { topic: `Topic ${list.length}`, lesson: `Lesson`, id: list.length },
    ]);
  }, [list.length]);

  const deleteItem = useCallback(
    (id: number) => {
      setList(list.filter((x) => x.id !== id));
    },
    [list]
  );

  const changeTopic = useCallback(
    (id: number, topic: string) => {
      const item = list.find((x) => x.id === id);
      if (!item) return;
      item.topic = topic;
    },
    [list]
  );

  const changeLesson = useCallback((index: number, lesson: string) => {
    setList((prev) => {
      prev[index].lesson = lesson;
      return [...prev];
    });
  }, []);

  const handleCreate = useCallback(async () => {
    setButton("Loading...");
    const response = await fetch("/api/courses/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator: id,
        name: name,
        description: description,
        code: code,
        alert: alert,
      }),
    });

    if (response.status !== 200) {
      setButton("Create");

      return;
    }

    const data = await response.json();
    const courseId = data[0].id;

    const response2 = await fetch("/api/courses/createTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: courseId,
        topics: list,
      }),
    });

    if (response2.status !== 200) {
      setButton("Create");
      return;
    }

    setButton("Create");
    router.push(`/dashboard/manage/edit/${courseId}`);
  }, [alert, code, description, id, list, name, router]);

  return (
    <>
      <Navbar>
        <Title>Create</Title>
        <CreateButton onClick={handleCreate}>Create</CreateButton>
      </Navbar>
      <Container>
        <Box>
          <IdentityBox>
            <Wrapper>
              <NameInput
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <CodeInput
                placeholder="Course code"
                required
                onChange={(e) => setCode(e.target.value)}
              />
            </Wrapper>

            <ImageInput type="file" />
            <DescriptionInput
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <AlertInput
              placeholder="Alert (optional)"
              onChange={(e) => setAlert(e.target.value)}
            />
          </IdentityBox>
          <listContext.Provider
            value={{
              dragStart,
              dragEnter,
              drop,
              deleteItem,
              changeTopic,
              changeLesson,
              list,
              setList,
            }}
          >
            {list.map((item, index) => (
              <>
                <TopicItem topic={item} key={item.id} />
              </>
            ))}
            <NewTopicButton onClick={addNewItem}>+</NewTopicButton>
          </listContext.Provider>
        </Box>
      </Container>
    </>
  );
}
