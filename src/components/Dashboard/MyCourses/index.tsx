import { useCallback, useContext, useEffect, useState } from "react";
import {
  Navbar,
  Title,
  Search,
  SearchIcon,
  SearchInput,
  Courses,
  Text,
  Error,
} from "./style";
import { userContext } from "..";
import { Course } from "@/types";
import { CourseCard } from "./CourseCard";

interface MyCoursesProps {
  close: boolean;
}

export function MyCourses(props: MyCoursesProps) {
  const { email, id } = useContext(userContext);
  const [courses, setCourses] = useState<any>();
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getMyCourses = useCallback(async () => {
    const data = await fetch(`/api/courses/dashboardCourses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });

    if (data.status == 200) {
      const response = await data.json();
      setCourses(response);
      return;
    }

    setError(true);
  }, [id]);

  const getName = useCallback(() => {
    const index = email.indexOf("@");
    return email.slice(0, index);
  }, [email]);

  const filterList = useCallback(
    (search: string) => {
      if (search != "") {
        const filteredList = courses.filter((course: Course) => {
          return course.name.toLowerCase().includes(search.toLowerCase());
        });
        setCourses(filteredList);
      } else {
        getMyCourses();
      }
    },
    [courses, getMyCourses]
  );

  useEffect(() => {
    getMyCourses();
  }, [getMyCourses]);

  return (
    <>
      <Navbar>
        <Title>Hi, {getName()}!</Title>
        <Search>
          <SearchIcon />
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
        </Search>
      </Navbar>

      <Text>My Courses</Text>

      <Courses close={props.close}>
        {error ? (
          <Error>Something went wrong</Error>
        ) : courses ? (
          courses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <></>
        )}
      </Courses>
    </>
  );
}
