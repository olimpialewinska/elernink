import { useCallback, useContext, useEffect, useState } from "react";
import { userContext } from "../..";
import {
  Navbar,
  Title,
  Image,
  Wrapper,
  Description,
  Container,
  BackArrow,
  EditButton,
  Row,
  Save,
  Close,
  DescriptionInput,
  NameInput,
  Alert,
} from "./style";
import { Course } from "@/types";
import { TopicEdit } from "./Topic";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

interface EditInterface {
  id: string;
}

export function Edit(props: EditInterface) {
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  const id = token.user.id;
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [topics, setTopics] = useState<any>();
  const [isName, setIsName] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [alert, setAlert] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const updateName = useCallback(async () => {
    const data = await fetch(`/api/courses/updateCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        value: name,
        type: "name",
      }),
    });

    if (data.status === 200) {
      setIsName(false);
      setNewName(name);
    }
  }, [name, props.id]);

  const updateDescription = useCallback(async () => {
    const data = await fetch(`/api/courses/updateCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        value: description,
        type: "description",
      }),
    });

    if (data.status === 200) {
      setIsDescription(false);
      setNewDescription(description);
    }
  }, [description, props.id]);

  const getCourseData = useCallback(async () => {
    const data = await fetch(`/api/courses/myCreatedCoursesTopics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        creator: id,
      }),
    });

    if (data.status === 500) {
      router.push("/dashboard/manage");
    }

    const response = await data.json();

    setData(response.data);
    setTopics(response.topics);
    setName(response.data?.[0].name);
    setDescription(response.data?.[0].description);
    setAlert(response.data?.[0].alert);
  }, [id, props.id, router]);

  const handleKeyDown = useCallback(
    (e: string, type: string) => {
      if (e === "Enter") {
        if (type === "name") updateName();
        if (type === "description") updateDescription();
      }
    },
    [updateDescription, updateName]
  );

  useEffect(() => {
    getCourseData();
  }, [getCourseData]);

  return (
    <>
      <Navbar>
        <BackArrow
          onClick={() => {
            window.history.back();
          }}
        />
        <Image />
        <Wrapper>
          {isName ? (
            <Row>
              <NameInput
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e.key, "name");
                }}
              />
              <Save
                onClick={() => {
                  updateName();
                }}
              />
              <Close
                onClick={() => {
                  setIsName(false);
                }}
              />
            </Row>
          ) : (
            <Row>
              <Title>{newName === "" ? data?.[0].name : newName}</Title>
              <EditButton
                onClick={() => {
                  setIsName(true);
                }}
              />
            </Row>
          )}

          {isDescription ? (
            <Row>
              <DescriptionInput
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e.key, "description");
                }}
              />
              <Save
                onClick={() => {
                  updateDescription();
                }}
              />
              <Close
                onClick={() => {
                  setIsDescription(false);
                }}
              />
            </Row>
          ) : (
            <Row>
              <Description>
                {newDescription === "" ? data?.[0].description : newDescription}
              </Description>
              <EditButton
                onClick={() => {
                  setIsDescription(true);
                }}
              />
            </Row>
          )}
        </Wrapper>
      </Navbar>
      <Container>
        {alert != "" ? <Alert>{alert}</Alert> : <></>}
        {topics?.map((item: any) => {
          return (
            <TopicEdit
              key={item.id}
              topic={item.topic}
              id={item.id}
              lesson={item.lesson}
            />
          );
        })}
      </Container>
    </>
  );
}
