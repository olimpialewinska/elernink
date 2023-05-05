import React, { useCallback, useContext, useRef, useState } from "react";
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
import { mainContext } from "@/pages/_app";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
  imageUrl: string;
  courseId: string;
}
export function EditImageModal(props: MyModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { errorFunction } = useContext(mainContext);

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

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  }, []);

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback((file: File) => {
    setImage(file);
  }, []);

  const handleSave = useCallback(async () => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("courseId", props.courseId);
    formData.append("file", image);
    const data = await fetch("/api/photos/updateCoursePhoto", {
      method: "POST",
      body: formData,
    });

    if (data.status !== 200) {
      errorFunction();
      return;
    }
    window.location.reload();
  }, [errorFunction, image, props.courseId]);

  const handleDelete = useCallback(async () => {
    const data = await fetch("/api/photos/deleteCoursePhoto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: props.courseId,
      }),
    });
    if (data.status === 200) {
      window.location.reload();
    }
  }, [props.courseId]);

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
                  backgroundImage: image
                    ? `url(${URL.createObjectURL(image)})`
                    : `url(${props.imageUrl})`,
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
                  handleSave();
                  props.hide();
                }}
              >
                {" "}
                Save
              </Button>
              <Button
                onClick={() => {
                  setImage(null);
                  handleDelete();
                }}
              >
                Delete Image
              </Button>
            </Div2>
          </>
        </Container>
      </ModalBg>
    </>
  );
}
