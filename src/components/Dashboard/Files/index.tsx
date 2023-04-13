import { FileComponent } from "./File";
import {
  Navbar,
  Title,
  Search,
  SearchIcon,
  SearchInput,
  Container,
  AddButton,
  FilterIcon,
  Filterbar,
  Wrapper,
  Button,
} from "./style";

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

      <Container>
        <Filterbar>
          <AddButton>+ Add file</AddButton>
          <Wrapper>
            <Button>
              <FilterIcon
                style={{
                  backgroundImage: `url("/AZ.png")`,
                }}
              />
            </Button>

            <Button>
              <FilterIcon
                style={{
                  backgroundImage: `url("/ZA.png")`,
                }}
              />
            </Button>
          </Wrapper>
        </Filterbar>

        <FileComponent />
        <FileComponent />
        <FileComponent />
        <FileComponent />
        <FileComponent />
        <FileComponent />
        <FileComponent />
      </Container>
    </>
  );
}
