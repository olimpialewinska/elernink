import {
  Container,
  Navbar,
  Search,
  SearchIcon,
  SearchInput,
  Title,
} from "./style";

export function FindCourse() {
  return (
    <>
      <Navbar>
        <Title>Find</Title>
      </Navbar>

      <Container>
        <Search>
          <SearchInput placeholder="Search" />
          <SearchIcon />
        </Search>
      </Container>
    </>
  );
}
