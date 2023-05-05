import React, { useCallback, useContext, useState } from "react";
import { ModalBg, Container } from "./style";
import { Editor } from "../editor";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
}
export function NotesModal(props: MyModalProps) {
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
          <Editor />
        </Container>
      </ModalBg>
    </>
  );
}
