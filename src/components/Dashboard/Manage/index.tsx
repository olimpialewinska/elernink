import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container, Navbar, Title } from "./style";
import { userContext } from "..";
import { Course } from "@/types";
import { CourseComponent } from "./Course";

export function Manage() {
  const { id } = useContext(userContext);
  const [courses, setCourses] = useState<any>();

  const getCourses = useCallback(async () => {
    const data = await fetch("/api/courses/myCreatedCourses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const response = await data.json();
    console.log(response);
    setCourses(response);
  }, [id]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <>
      <Navbar>
        <Title>Manage Courses</Title>
      </Navbar>
      <Container>
        {courses?.map((course: Course) => {
          return (
            <CourseComponent
              key={course.id}
              id={course.id}
              name={course.name}
              description={course.description}
            />
          );
        })}
      </Container>
    </>
  );
}
