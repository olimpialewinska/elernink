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

import { Course } from "@/types";
import { CourseCard } from "./CourseCard";
import { Loader } from "@/components/Loader";
import { mainContext } from "@/pages/_app";

interface MyCoursesProps {
  close: boolean;
  data: any;
}

export function MyCourses(props: MyCoursesProps) {
  const { auth } = useContext(mainContext);
  const [courses, setCourses] = useState<Course[]>(JSON.parse(props.data));
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const getMyCourses = useCallback(async () => {
    setLoading(true);
    const data = await fetch(`/api/courses/dashboardCourses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: auth.id,
      }),
    });

    if (data.status == 200) {
      const response = await data.json();
      setCourses(response);
      setLoading(false);
      return;
    }

    setError(true);
  }, [auth.id]);

  const getName = useCallback(() => {
    const index = auth.email.indexOf("@");
    return auth.email.slice(0, index);
  }, [auth.email]);

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

      {loading ? (
        <Error
          style={{
            color: "#000",
          }}
        >
          <Loader />
        </Error>
      ) : error ? (
        <Error>Something went wrong</Error>
      ) : courses ? (
        <>
          <Courses close={props.close}>
            {courses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Courses>
        </>
      ) : (
        <Error>Something went wrong</Error>
      )}
    </>
  );
}
