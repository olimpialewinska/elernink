import { useCallback, useContext } from "react";
import {
  Navbar,
  Title,
  Search,
  SearchIcon,
  SearchInput,
  Statistics,
  Box,
  Courses,
  Course,
  Text,
} from "./style";
import { userContext } from "..";

interface MyCoursesProps {
  close: boolean;
}

export function MyCourses(props: MyCoursesProps) {
  const { email } = useContext(userContext);

  const getName = useCallback(() => {
    const index = email.indexOf("@");
    return email.slice(0, index);
  }, [email]);

  return (
    <>
      <Navbar>
        <Title>Hi, {getName()}!</Title>

        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </Search>
      </Navbar>
      <Text>My Statistics</Text>
      <Statistics>
        <Box />
        <Box />
        <Box />
        <Box />
      </Statistics>

      <Text>My Courses</Text>

      <Courses close={props.close}>
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
      </Courses>
    </>
  );
}
