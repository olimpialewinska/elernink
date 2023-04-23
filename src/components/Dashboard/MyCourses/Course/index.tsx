import { useCallback, useContext, useEffect, useState } from "react";
import {
  Navbar,
  Title,
  Image,
  Wrapper,
  Description,
  Container,
  BackArrow,
  Row,
  Alert,
} from "./style";
import { TopicItem } from "./Topic";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

interface CourseInterface {
  id: string;
}

export function CoursePage(props: CourseInterface) {
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  const id = token.user.id;
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [topics, setTopics] = useState<any>();

  const getCourseData = useCallback(async () => {
    const data = await fetch(`/api/courses/getCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });

    if (data.status === 401) {
      router.push("/dashboard");
    }

    const response = await data.json();

    setData(response.data);
    setTopics(response.topics);
  }, [props.id, router]);

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
          <Row>
            <Title> {data?.[0].name}</Title>
          </Row>
          <Row>
            <Description>{data?.[0].description}</Description>
          </Row>
        </Wrapper>
      </Navbar>
      <Container>
        {data?.[0].alert === "" ? <></> : <Alert>{data?.[0].alert}</Alert>}

        {topics?.map((item: any) => {
          return (
            <TopicItem
              key={item.id}
              topic={item.topic}
              id={item.id}
              lesson={item.lesson}
              courseId={props.id}
            />
          );
        })}
      </Container>
    </>
  );
}
