import React, { useCallback, useContext, useState } from "react";
import { ModalBg, Container, Box, NameInput, Wrapper, Button } from "./style";
import { userContext } from "../../..";
import { NoteInterface } from "@/types";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
  note: NoteInterface;
}
export function NotesModalEdit(props: MyModalProps) {
  const { id } = useContext(userContext);
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const [value, setValue] = useState(props.note.value);
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

                "@media (maxWidth: 768px)": {
                  height: "60%",
                },
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
