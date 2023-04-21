import React, { useCallback, useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button, Container, NameInput, Wrapper } from "./style";
import { userContext } from "../..";

export function Editor() {
  const { id } = useContext(userContext);
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const [value, setValue] = useState("Create new note");
  const [name, setName] = useState("New note");

  const saveDocument = useCallback(async () => {
    const response = await fetch("/api/notes/saveNote", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
        value: value,
        userId: id,
      }),
    });

    if (response.status == 200) {
      window.location.reload();
    }
  }, [id, name, value]);

  return (
    <Container>
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
    </Container>
  );
}
