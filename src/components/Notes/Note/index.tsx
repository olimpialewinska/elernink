import { NoteInterface } from "@/types";
import { Icon, Icons, Name, Wrapper, Note } from "./style";
import { useCallback, useContext, useEffect, useState } from "react";
import { NotesModalEdit } from "./NotesModalEdit";
import { mainContext } from "@/pages/_app";

interface NoteComponentProps {
  note: NoteInterface;
  deleteNote: (id: string) => void;
}

export function NoteComponent(props: NoteComponentProps) {
  const { errorFunction } = useContext(mainContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = useCallback(async () => {
    const data = await fetch(`/api/notes/deleteNote`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        noteId: props.note.id,
      }),
    });
    if (data.status !== 200) {
      errorFunction();
      return;
    }
    props.deleteNote(props.note.id);
  }, [errorFunction, props]);

  return (
    <Note>
      <Wrapper>
        <Icon
          style={{
            backgroundImage: `url("/file.png")`,
          }}
        />
        <Name>{props.note.name}</Name>
      </Wrapper>

      <Icons>
        <Icon
          style={{
            backgroundImage: `url("/expand.png")`,
          }}
          onClick={handleShow}
        />

        <Icon
          style={{
            backgroundImage: `url("/delete.png")`,
          }}
          onClick={handleDelete}
        />
      </Icons>
      <NotesModalEdit visible={show} hide={handleClose} note={props.note} />
    </Note>
  );
}
