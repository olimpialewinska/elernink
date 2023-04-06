import { Navbar, Search, SearchIcon, SearchInput, Title } from "./style";

export function Notes() {
  return (
    <>
      <Navbar>
        <Title>My Notes</Title>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </Search>
      </Navbar>
    </>
  );
}
