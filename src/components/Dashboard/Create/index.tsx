import {
  Dispatch,
  DragEvent,
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
  CreateButton,
  DescriptionInput,
  IdentityBox,
  NameInput,
  Navbar,
  NewTopicButton,
  Title,
  Wrapper,
  CodeInput,
  AlertInput,
  AddImageButton,
  NameCont,
} from "./style";
import { TopicItem } from "./Topic";
import { TopicInterface } from "@/types";
import { userContext } from "..";
import { useRouter } from "next/navigation";
import { ImageModal } from "./ImageModal";

interface ImageInterface {
  image: File | undefined;
  deleteImage: () => void;
  addImage: (image: File) => void;
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
  addFileList: (index: number, file: File[]) => void;
}

export const imageContext = createContext({} as ImageInterface);

export const listContext = createContext({} as listContextInterface);

export function Create() {
  const router = useRouter();
  const { id } = useContext(userContext);
  const dragItem = useRef<number | null>(0);
  const dragOverItem = useRef<number | null>();
  const [button, setButton] = useState("Create");
  const [list, setList] = useState<TopicInterface[]>([
    {
      topic: `Topic 0`,
      lesson: "Lesson 0",
      id: 0,
      order: 0,
      listOfFiles: [],
    },
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
  const [code, setCode] = useState("");
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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
      {
        topic: `Topic ${list.length}`,
        lesson: `Lesson`,
        id: list.length,
        order: list.length,
        listOfFiles: [],
      },
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

  const addFileList = useCallback(
    (index: number, file: File[]) => {
      setList((prev) => {
        prev[index].listOfFiles = file;
        return [...prev];
      });
    },

    []
  );

  const addImage = useCallback(
    (imageFile: File) => {
      setImage(imageFile);
      console.log(image);
    },
    [image]
  );

  const deleteImage = useCallback(() => {
    setImage(undefined);
    console.log(image);
  }, [image]);

  const handleCreate = useCallback(async () => {
    setButton("Loading...");
    if (name == "") {
      setButton("Create");
      return;
    }
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

    const courseData = await response.json();

    console.log(image);

    if (image) {
      const formData = new FormData();
      formData.append("courseId", courseData[0].id);
      formData.append("image", image);

      const response = await fetch("/api/photos/addCoursePhoto", {
        method: "POST",
        body: formData,
      });

      if (response.status !== 200) {
        setButton("Create");
        return;
      }
    }

    for (const index in list) {
      const topic = list[index].topic;
      const lesson = list[index].lesson;
      const order = list[index].order;
      const listOfFiles = list[index].listOfFiles;

      const response = await fetch("/api/courses/createTopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseData[0].id,
          topic: topic,
          lesson: lesson,
          order: order,
        }),
      });
      if (response.status !== 200) {
        setButton("Create");
        return;
      }

      const TopicData = await response.json();

      const formData = new FormData();
      formData.append("topicId", TopicData[0].id);
      formData.append("courseId", courseData[0].id);

      for (const i in list[index].listOfFiles) {
        formData.append("file", listOfFiles[i]);
      }

      const response2 = await fetch("/api/courses/addCourseFiles", {
        method: "POST",
        body: formData,
      });

      if (response2.status !== 200) {
        setButton("Create");
        return;
      }
    }
    setButton("Create");
    router.push(`/dashboard/manage/edit/${courseData[0].id}`);
  }, [alert, code, description, id, image, list, name, router]);

  return (
    <>
      <Navbar>
        <Title>Create</Title>
        <CreateButton onClick={handleCreate}>{button}</CreateButton>
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
              <NameCont>
                <CodeInput
                  placeholder="Course code"
                  required
                  onChange={(e) => setCode(e.target.value)}
                />
                <AddImageButton onClick={handleShow} />
              </NameCont>
            </Wrapper>

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
              addFileList,
            }}
          >
            {list.map((item) => (
              <>
                <TopicItem topic={item} key={item.id} />
              </>
            ))}
            <NewTopicButton onClick={addNewItem}>+</NewTopicButton>
          </listContext.Provider>
        </Box>
      </Container>
      <imageContext.Provider
        value={{
          image,
          addImage,
          deleteImage,
        }}
      >
        <ImageModal visible={show} hide={handleClose} />
      </imageContext.Provider>
    </>
  );
}

export { userContext };
