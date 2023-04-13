import { FileComponent } from "../Files/File";
import { NoteComponent } from "./Note";
import {
  AddButton,
  Button,
  Container,
  FilterIcon,
  Filterbar,
  Navbar,
  Search,
  SearchIcon,
  SearchInput,
  Title,
  Wrapper,
} from "./style";

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
      <Container>
        <Filterbar>
          <AddButton>+ Add note</AddButton>
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
        <NoteComponent />
        <NoteComponent />
        <NoteComponent />
        <NoteComponent />
        <NoteComponent />
        <NoteComponent />
      </Container>
    </>
  );
}
