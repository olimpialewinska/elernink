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
} from "./style";
import { Course } from "@/types";
import { MyModal } from "./Modal";
import { userContext } from "..";

interface FindProps {
  close: boolean;
}

export function FindCourse(props: FindProps) {
  const { id } = useContext(userContext);
  const [courses, setCourses] = useState<any>();
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course>({} as Course);

  const handleClose = () => setShow(false);
  const handleShow = (course: Course) => () => {
    setCurrentCourse(course);
    setShow(true);
  };

  const getCourses = useCallback(async () => {
    const data = await fetch("/api/courses/findCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });

    if (data.status == 200) {
      setError(false);
      const response = await data.json();
      setCourses(response);
      return;
    }

    setError(true);
  }, [id]);

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

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <>
      <Navbar>
        <Title>Find {props.close}</Title>
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

        <Content
          close={props.close}
          style={{
            display: error ? "flex" : "grid",
          }}
        >
          {error ? (
            <Error>Something went wrong</Error>
          ) : courses ? (
            courses.map((course: Course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={handleShow(course)}
              />
            ))
          ) : (
            <></>
          )}
        </Content>
      </Container>
      <MyModal visible={show} hide={handleClose} course={currentCourse} />
    </>
  );
}
