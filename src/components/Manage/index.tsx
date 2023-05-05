import { useCallback, useContext, useEffect, useState } from "react";
import { Container, Navbar, Title, Wrapper } from "./style";

import { Course } from "@/types";
import { CourseComponent } from "./Course";
import { Loader } from "@/components/Loader";
import { mainContext } from "@/pages/_app";

interface IManage {
  data: any;
}

export function Manage(props: IManage) {
  const { auth } = useContext(mainContext);
  const [courses, setCourses] = useState<Course[]>(JSON.parse(props.data));
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getCourses = useCallback(async () => {
    setLoading(true);
    const data = await fetch("/api/courses/myCreatedCourses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: auth.id,
      }),
    });

    const response = await data.json();
    setCourses(response);
    setLoading(false);
  }, [auth.id]);

  const deleteCourse = useCallback(
    (id: string) => {
      const newCourses = courses.filter((course) => course.id !== id);
      setCourses(newCourses);
    },
    [courses]
  );

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
                course={course}
                courseList={courses}
                deleteCourse={deleteCourse}
              />
            );
          })
        )}
      </Container>
    </>
  );
}
