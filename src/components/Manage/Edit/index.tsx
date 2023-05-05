/* eslint-disable jsx-a11y/alt-text */
import { useCallback, useContext, useEffect, useState } from "react";
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
  AlertInput,
  NewTopicButton,
} from "./style";

import { useRouter } from "next/router";
import { EditImageModal } from "./EditImageModal";
import { TopicInterface } from "@/types";
import { TopicEdit } from "./Topic";
import { NewItemModal } from "./NewItemModal";
import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "@/pages/dashboard/manage/[id]";
import { mainContext } from "@/pages/_app";

interface EditInterface {
  id: string;
  userId: string;
  data: any;
}

export function Edit(props: EditInterface) {
  const router = useRouter();
  const { errorFunction } = useContext(mainContext);
  const [topics, setTopics] = useState<any>(props.data.topics);
  const [isName, setIsName] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [alert, setAlert] = useState(props.data.data[0].alert);
  const [isAlert, setIsAlert] = useState(false);
  const [newAlert, setNewAlert] = useState("");
  const [name, setName] = useState(props.data.data[0].name);
  const [description, setDescription] = useState(
    props.data.data[0].description
  );
  const [image, setImage] = useState(props.data.imageUrl);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [showNewItem, setShowNewItem] = useState(false);
  const handleCloseNewItem = () => setShowNewItem(false);
  const handleShowNewItem = () => {
    setShowNewItem(true);
  };

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

    if (data.status !== 200) {
      errorFunction();
      return;
    }
    setIsName(false);
    setNewName(name);
  }, [errorFunction, name, props.id]);

  const updateAlert = useCallback(async () => {
    const data = await fetch(`/api/courses/updateCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        value: alert,
        type: "alert",
      }),
    });

    if (data.status !== 200) {
      errorFunction();
      return;
    }
    setIsAlert(false);
    setNewAlert(alert);
  }, [alert, errorFunction, props.id]);

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

    if (data.status !== 200) {
      errorFunction();
      return;
    }
    setIsDescription(false);
    setNewDescription(description);
  }, [description, errorFunction, props.id]);

  const handleKeyDown = useCallback(
    (e: string, type: string) => {
      if (e === "Enter") {
        if (type === "name") updateName();
        if (type === "description") updateDescription();
        if (type === "alert") updateAlert();
      }
    },
    [updateAlert, updateDescription, updateName]
  );

  return (
    <>
      <Navbar>
        <BackArrow
          onClick={() => {
            window.history.back();
          }}
        />
        <Image
          style={{
            backgroundImage: props.data.imageUrl
              ? `url(${props.data.imageUrl})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleShow}
        />
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
              <Title>
                {newName === "" ? props.data.data[0].name : newName}
              </Title>
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
                {newDescription === "" ? description : newDescription}
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
        {isAlert ? (
          <Alert>
            <AlertInput
              type="text"
              value={alert}
              onChange={(e) => {
                setAlert(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e.key, "alert");
              }}
            />
            <Save
              onClick={() => {
                updateAlert();
              }}
            />
            <Close
              onClick={() => {
                setIsAlert(false);
              }}
            />
          </Alert>
        ) : (
          <Alert>
            {newAlert === "" ? alert : newAlert}
            <EditButton
              onClick={() => {
                setIsAlert(true);
              }}
            />
          </Alert>
        )}
        {topics?.map((topic: TopicInterface) => {
          return <TopicEdit key={topic.id} topic={topic} courseId={props.id} />;
        })}
        <NewTopicButton onClick={handleShowNewItem}>+</NewTopicButton>
      </Container>
      <EditImageModal
        visible={show}
        hide={handleClose}
        imageUrl={image}
        courseId={props.id}
      />
      <NewItemModal
        visible={showNewItem}
        hide={handleCloseNewItem}
        courseId={props.id}
        order={topics?.length ? topics?.length + 1 : 1}
      />
    </>
  );
}
