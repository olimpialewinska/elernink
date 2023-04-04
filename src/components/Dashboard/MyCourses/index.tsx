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

interface MyCoursesProps {
  close: boolean;
}

export function MyCourses(props: MyCoursesProps) {
  return (
    <>
      <Navbar>
        <Title>Hi, Eryk!</Title>

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
