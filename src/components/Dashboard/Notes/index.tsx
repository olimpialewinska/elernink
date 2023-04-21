import { useCallback, useContext, useEffect, useState } from "react";
import { FileComponent } from "../Files/File";
import { NoteComponent } from "./Note";
import { NotesModal } from "./NotesModal";
import {
  AddButton,
  Button,
  Container,
  FilterIcon,
  Filterbar,
  LoaderWrapper,
  Navbar,
  Search,
  SearchIcon,
  SearchInput,
  Title,
  Wrapper,
} from "./style";
import { userContext } from "..";
import { NoteInterface } from "@/types";
import { Loader } from "@/components/Loader";

export function Notes() {
  const { id } = useContext(userContext);
  const [notes, setNotes] = useState<NoteInterface[]>();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [select, setSelect] = useState<"AZ" | "ZA">("AZ");

  const sortNotesAZ = useCallback(() => {
    const sortedNotes = notes
      ?.slice()
      .sort((a: NoteInterface, b: NoteInterface) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    setNotes(sortedNotes);
  }, [notes]);

  const sortNotesZA = useCallback(() => {
    const sortedNotes = notes
      ?.slice()
      .sort((a: NoteInterface, b: NoteInterface) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    setNotes(sortedNotes);
  }, [notes]);

  const getNotes = useCallback(async () => {
    setLoading(true);
    const data = await fetch(`/api/notes/getNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    if (data.status !== 200) {
      return;
    }
    const notes = await data.json();
    setNotes(notes);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const searchByName = useCallback(
    (name: string) => {
      if (name != "") {
        const filteredList = notes?.filter((note: NoteInterface) => {
          return note.name.toLowerCase().includes(name.toLowerCase());
        });
        setNotes(filteredList);
      } else {
        getNotes();
      }
    },
    [getNotes, notes]
  );

  return (
    <>
      <Navbar>
        <Title>My Notes</Title>
        <Search>
          <SearchIcon />
          <SearchInput
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              searchByName(e.target.value);
            }}
          />
        </Search>
      </Navbar>
      <Container>
        <Filterbar>
          <AddButton
            onClick={() => {
              handleShow();
            }}
          >
            + Add note
          </AddButton>
          <Wrapper>
            <Button
              style={
                select === "AZ"
                  ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                  : { backgroundColor: "transparent" }
              }
              onClick={() => {
                sortNotesAZ();
                setSelect("AZ");
              }}
            >
              <FilterIcon style={{ backgroundImage: `url("/AZ.png")` }} />
            </Button>

            <Button
              style={
                select === "ZA"
                  ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                  : { backgroundColor: "transparent" }
              }
              onClick={() => {
                sortNotesZA();
                setSelect("ZA");
              }}
            >
              <FilterIcon style={{ backgroundImage: `url("/ZA.png")` }} />
            </Button>
          </Wrapper>
        </Filterbar>
        {loading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          notes?.map((note: NoteInterface) => {
            return <NoteComponent key={note.id} note={note} />;
          })
        )}
      </Container>
      <NotesModal visible={show} hide={handleClose} />
    </>
  );
}
