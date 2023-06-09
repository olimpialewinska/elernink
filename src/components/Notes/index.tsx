import { useCallback, useContext, useEffect, useState } from "react";
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

import { NoteInterface } from "@/types";
import { Loader } from "@/components/Loader";
import { mainContext } from "@/pages/_app";
import { sortArrayByProperty } from "@/utils/functions";

interface NotesProps {
  notes: any;
}
export function Notes(props: NotesProps) {
  const { auth } = useContext(mainContext);
  const [notes, setNotes] = useState<NoteInterface[]>(JSON.parse(props.notes));
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [select, setSelect] = useState<"AZ" | "ZA">("AZ");

  const sortNotes = useCallback(() => {
    const sortedNotes = sortArrayByProperty(
      notes,
      "name",
      select === "AZ" ? "asc" : "desc"
    );
    setNotes(sortedNotes);
  }, [notes, select]);

  const getNotes = useCallback(async () => {
    setLoading(true);
    const data = await fetch(`/api/notes/getNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        userId: auth.id,
      }),
    });
    if (data.status !== 200) {
      return;
    }
    const notes = await data.json();
    setNotes(notes.data);
    setLoading(false);
  }, [auth.id]);

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

  const deleteNote = useCallback(
    (id: string) => {
      const newNotes = notes?.filter((note: NoteInterface) => note.id !== id);
      setNotes(newNotes);
    },
    [notes]
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
                sortNotes();
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
                sortNotes();
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
            return (
              <NoteComponent
                key={note.id}
                note={note}
                deleteNote={deleteNote}
              />
            );
          })
        )}
      </Container>
      <NotesModal visible={show} hide={handleClose} />
    </>
  );
}
