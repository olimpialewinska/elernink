import { useCallback, useContext, useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
import {
  Container,
  Content,
  Navbar,
  Search,
  SearchIcon,
  SearchInput,
  Title,
  Error,
  Wrapper,
} from "./style";
import { Course } from "@/types";
import { MyModal } from "./Modal";

import { Loader } from "@/components/Loader";
import { mainContext } from "@/pages/_app";

interface FindProps {
  close: boolean;
  data: any;
}

export function FindCourse(props: FindProps) {
  const { auth } = useContext(mainContext);
  const [courses, setCourses] = useState<any>(JSON.parse(props.data));
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course>({} as Course);

  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (course: Course) => () => {
    setCurrentCourse(course);
    setShow(true);
  };

  const getCourses = useCallback(async () => {
    setLoading(true);
    const data = await fetch("/api/courses/findCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: auth.id,
      }),
    });

    if (data.status == 200) {
      setError(false);
      const response = await data.json();
      setCourses(response);
      setLoading(false);
      return;
    }

    setError(true);
  }, [auth.id]);

  const filterList = useCallback(
    (search: string) => {
      if (search != "") {
        const filteredList = courses.filter((course: Course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
        setCourses(filteredList);
      } else {
        getCourses();
      }
    },
    [courses, getCourses]
  );

  return (
    <>
      <Navbar>
        <Title>Find Course</Title>
      </Navbar>

      <Container>
        <Search>
          <SearchInput
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filterList(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                filterList(search);
              }
            }}
          />
          <SearchIcon />
        </Search>

        {loading ? (
          <Wrapper>
            <Loader />
          </Wrapper>
        ) : error ? (
          <Error>Something went wrong</Error>
        ) : courses ? (
          <Content
            close={props.close}
            style={{
              display: error ? "flex" : "grid",
            }}
          >
            {courses.map((course: Course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={handleShow(course)}
              />
            ))}
          </Content>
        ) : (
          <Error>Something went wrong</Error>
        )}
      </Container>
      <MyModal visible={show} hide={handleClose} course={currentCourse} />
    </>
  );
}
