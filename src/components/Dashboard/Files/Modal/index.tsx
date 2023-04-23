/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { ModalBg, Container } from "./style";
import { DragDropFile } from "../FileUploader";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
}
function FileModal(props: MyModalProps) {
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
          <DragDropFile />
        </Container>
      </ModalBg>
    </>
  );
}

export { FileModal };
