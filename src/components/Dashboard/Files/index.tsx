import { Navbar, Title, Search, SearchIcon, SearchInput } from "./style";

export function Files() {
  return (
    <>
      <Navbar>
        <Title>My Files</Title>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </Search>
      </Navbar>
    </>
  );
}
