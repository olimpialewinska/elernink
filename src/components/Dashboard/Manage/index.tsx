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
import { Container, Navbar, Title, Wrapper } from "./style";
import { userContext } from "..";
import { Course } from "@/types";
import { CourseComponent } from "./Course";
import { Loader } from "@/components/Loader";

export function Manage() {
  const { id } = useContext(userContext);
  const [courses, setCourses] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getCourses = useCallback(async () => {
    setLoading(true);
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
    setCourses(response);

    setLoading(false);
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
        {loading ? (
          <Wrapper>
            <Loader />
          </Wrapper>
        ) : (
          courses?.map((course: Course) => {
            return (
              <CourseComponent
                key={course.id}
                id={course.id}
                name={course.name}
                description={course.description}
                code={course.code}
                image={course.image}
              />
            );
          })
        )}
      </Container>
    </>
  );
}
