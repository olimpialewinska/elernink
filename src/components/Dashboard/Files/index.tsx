import { useState } from "react";
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
import { FileModal } from "./Modal";

export function Files() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
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
          <AddButton onClick={handleShow}>+ Add file</AddButton>
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
        <FileModal visible={show} hide={handleClose} />
      </Container>
    </>
  );
}
