import React, { useCallback, useContext, useState } from "react";
import { ModalBg, Container, Box, NameInput, Wrapper, Button } from "./style";
import { NoteInterface } from "@/types";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface MyModalProps {
  visible: boolean;
  hide: () => void;
  note: NoteInterface;
}
export function NotesModalEdit(props: MyModalProps) {
  const [value, setValue] = useState(props.note.value.toString());
  const [name, setName] = useState(props.note.name);

  const saveDocument = useCallback(async () => {
    const response = await fetch("/api/notes/updateNote", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
        value: value,
        noteId: props.note.id,
      }),
    });

    if (response.status == 200) {
      window.location.reload();
    }
  }, [name, props.note.id, value]);

  return (
    <>
      <ModalBg
        style={{
          opacity: props.visible ? 1 : 0,
          pointerEvents: props.visible ? "inherit" : "none",
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            props.hide();
          }
        }}
      >
        <Container>
          <Box>
            <NameInput
              placeholder="Note name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              style={{
                height: "70%",
                width: "100%",
              }}
            />

            <Wrapper>
              <Button onClick={() => saveDocument()}>Save note</Button>
            </Wrapper>
          </Box>
        </Container>
      </ModalBg>
    </>
  );
}
