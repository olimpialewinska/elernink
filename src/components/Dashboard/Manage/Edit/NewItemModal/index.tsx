import React, { Key, useCallback, useRef, useState } from "react";
import {
  ModalBg,
  Container,
  Button,
  Drag,
  Form,
  Input,
  Label,
  UploadButton,
  Wrapper,
  DeleteButton,
  Files,
  Icon,
  InputFile,
  Name,
  Topic,
  TopicTitle,
  Error,
  File,
  Div2,
} from "./style";

interface MyModalProps {
  visible: boolean;
  hide: () => void;
  courseId: string;
  order: number;
}
export function NewItemModal(props: MyModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);
  const [lesson, setLesson] = useState("");
  const [topic, setTopic] = useState("");
  const inputRef = useRef<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [button, setButton] = useState("Save");

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

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
        const newFiles = [...files, ...Array.from(e.dataTransfer.files)];
        setFiles(newFiles);
      }
    },
    [files]
  );

  const handleFileChange = useCallback(
    (newfiles: FileList | null) => {
      setError(false);
      const newFiles = newfiles;
      if (!newFiles) return;
      setFiles([...files, ...Array.from(newFiles)]);
    },
    [files]
  );

  const deleteFile = useCallback(
    (index: Key) => {
      const newFiles = [...files];
      newFiles.splice(index as number, 1);
      setFiles(newFiles);
    },
    [files]
  );

  const handleSave = useCallback(async () => {
    setButton("Saving...");
    const response = await fetch("/api/courses/createTopics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: props.courseId,
        topic: topic,
        lesson: lesson,
        order: props.order,
      }),
    });
    if (response.status !== 200) {
      setButton("Create");
      return;
    }
    const TopicData = await response.json();

    const formData = new FormData();
    formData.append("topicId", TopicData[0].id);
    formData.append("courseId", props.courseId);

    for (const item in files) {
      formData.append("file", files[item]);
    }

    console.log(formData);

    const fileRes = await fetch("/api/courses/addCourseFiles", {
      method: "POST",
      body: formData,
    });
    if (fileRes.status !== 200) {
      setError(true);
      return;
    }
    setButton("Create");
    window.location.reload();
  }, [files, lesson, props.courseId, props.order, topic]);

  const handleCancel = useCallback(() => {
    setFiles([]);
    setLesson("");
    setTopic("");
    props.hide();
  }, [props]);

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
          <>
            <Wrapper>
              <Topic>
                <TopicTitle
                  placeholder="Topic"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                />
              </Topic>

              <Input
                placeholder="Lesson"
                value={lesson}
                onChange={(e) => {
                  setLesson(e.target.value);
                }}
              />

              <>
                <Form
                  onDragEnter={(e) => handleDrag(e)}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <InputFile
                    accept="
      .doc,
      .docx,
      .pdf,
      .txt,
      .xls,
      .xlsx,
      .ppt,
      .pptx,
      .csv,
      
      "
                    ref={inputRef}
                    type="file"
                    multiple={true}
                    onChange={(event) => {
                      handleFileChange(event.target.files);
                    }}
                  />
                  <Label>
                    <div>
                      <p>Drag and drop your file here or</p>
                      <UploadButton
                        onClick={() => {
                          onButtonClick();
                        }}
                      >
                        Upload a file
                      </UploadButton>
                    </div>
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
                <Files>
                  {error === true ? (
                    <Error>Something went wrong</Error>
                  ) : (
                    files &&
                    files.map((file: any, index: Key) => (
                      <File key={index}>
                        <Icon onClick={() => deleteFile(index)} />
                        <Name>
                          {file.name
                            ? file.name.length > 10
                              ? file.name.slice(0, 10) + "..."
                              : file.name
                            : ""}
                        </Name>
                      </File>
                    ))
                  )}
                </Files>
              </>
            </Wrapper>
            <Div2>
              {" "}
              <Button
                onClick={() => {
                  handleCancel();
                }}
              >
                {" "}
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleSave();
                }}
              >
                {button}
              </Button>
            </Div2>
          </>
        </Container>
      </ModalBg>
    </>
  );
}
