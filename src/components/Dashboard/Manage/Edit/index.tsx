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
} from "./style";
import { Course } from "@/types";
import { TopicEdit } from "./Topic";

interface EditInterface {
  id: string;
}

export function Edit(props: EditInterface) {
  const [data, setData] = useState<any>();
  const [topics, setTopics] = useState<any>();
  const { id } = useContext(userContext);

  const getCourseData = useCallback(async () => {
    console.log(props.id);

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

    const response = await data.json();
    setData(response.data);
    setTopics(response.topics);
  }, [id, props.id]);

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
          <Title>{data?.[0].name}</Title>
          <Description>{data?.[0].description}</Description>
        </Wrapper>
      </Navbar>
      <Container>
        {topics?.map((item: any) => {
          return <TopicEdit key={item.id} name={item.name} id={item.id} />;
        })}
      </Container>
    </>
  );
}
