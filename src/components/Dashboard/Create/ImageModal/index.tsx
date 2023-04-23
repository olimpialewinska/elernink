import React, {
  Dispatch,
  Key,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  ModalBg,
  Container,
  Button,
  Drag,
  Form,
  Input,
  Label,
  UploadButton,
  Div,
  P,
  Div2,
} from "./style";
import { imageContext, userContext } from "..";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
}
export function ImageModal(props: MyModalProps) {
  const { addImage, deleteImage, image } = useContext(imageContext);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<any>(null);

  const handleDrag = useCallback(
    (e: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        addImage(e.dataTransfer.files[0]);
      }
    },
    [addImage]
  );

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const deleteFile = useCallback(() => {
    deleteImage();
  }, [deleteImage]);

  const handleChange = useCallback(
    (file: File) => {
      if (file) {
        addImage(file);
      }
    },
    [addImage]
  );

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
          {" "}
          <>
            <Form
              onDragEnter={(e) => handleDrag(e)}
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                accept="
          .jpg,
          .jpeg,
          .png,
        "
                ref={inputRef}
                type="file"
                multiple={false}
                onChange={(event) => {
                  handleChange(event.target.files![0]);
                }}
              />
              <Label
                style={{
                  backgroundImage:
                    image && `url(${URL.createObjectURL(image)})`,
                }}
              >
                <Div>
                  <P
                    style={{
                      color: image ? "white" : "black",
                    }}
                  >
                    Drag and drop your file here or
                  </P>
                  <UploadButton
                    onClick={onButtonClick}
                    style={{
                      color: image ? "white" : "black",
                    }}
                  >
                    Upload a file
                  </UploadButton>
                </Div>
              </Label>
              {dragActive && (
                <Drag
                  onDragEnter={(e) => handleDrag(e)}
                  onDragLeave={(e) => handleDrag(e)}
                  onDragOver={(e) => handleDrag(e)}
                  onDrop={(e) => handleDrop(e)}
                ></Drag>
              )}
            </Form>

            <Div2>
              {" "}
              <Button
                onClick={() => {
                  props.hide();
                  console.log(image);
                }}
              >
                {" "}
                Save
              </Button>
              <Button
                onClick={() => {
                  deleteFile();
                  props.hide();
                }}
              >
                Close
              </Button>
            </Div2>
          </>
        </Container>
      </ModalBg>
    </>
  );
}
