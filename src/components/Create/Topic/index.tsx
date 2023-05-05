import { TopicInterface } from "@/types";
import {
  Topic,
  TopicTitle,
  DeleteButton,
  Input,
  Wrapper,
  InputFile,
  Drag,
  Files,
  Form,
  Icon,
  Label,
  Name,
  UploadButton,
  Error,
  File,
} from "./style";
import { Key, useCallback, useContext, useRef, useState } from "react";
import { listContext } from "..";

interface TopicItemInterface {
  topic: TopicInterface;
  key: number;
}

export function TopicItem(props: TopicItemInterface) {
  const {
    dragEnter,
    dragStart,
    deleteItem,
    drop,
    changeLesson,
    changeTopic,
    list,
    setList,
    addFileList,
  } = useContext(listContext);

  const [lesson, setLesson] = useState(props.topic.lesson);
  const [topic, setTopic] = useState(props.topic.topic);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);

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
        const newFiles = [...files, ...Array.from(e.dataTransfer.files)];
        setFiles(newFiles);
        addFileList(props.topic.id, newFiles);
      }
    },
    [addFileList, files, props.topic.id]
  );

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const deleteFile = useCallback(
    (index: Key) => {
      const newFiles = [...files];
      newFiles.splice(index as number, 1);
      setFiles(newFiles);
      addFileList(props.topic.id, newFiles);
    },
    [addFileList, files, props.topic.id]
  );

  const handleChangeTopic = useCallback(
    (e: string) => {
      setTopic(e);
      changeTopic(props.topic.id, e);
    },
    [changeTopic, props.topic.id]
  );

  const handleChangeLesson = useCallback(
    (e: string) => {
      setLesson(e);
      changeLesson(props.topic.id, e);
    },
    [changeLesson, props.topic.id]
  );

  const handleFileChange = useCallback(
    (newfiles: FileList | null) => {
      setError(false);
      const newFiles = newfiles;
      if (!newFiles) return;
      setFiles([...files, ...Array.from(newFiles)]);
      addFileList(props.topic.id, [...files, ...Array.from(newFiles)]);
    },
    [addFileList, files, props.topic.id]
  );

  return (
    <Wrapper
      onDragStart={(e) => {
        dragStart(e, props.topic.id);
      }}
      onDragEnter={(e) => dragEnter(e, props.topic.id)}
      onDragEnd={(e) => {
        drop(props.topic.id);
      }}
      draggable
    >
      <Topic>
        <TopicTitle
          value={topic}
          onChange={(e) => handleChangeTopic(e.target.value)}
        />
        <DeleteButton
          onClick={() => {
            deleteItem(props.topic.id);
          }}
        />
      </Topic>

      <Input
        value={lesson}
        onChange={(e) => {
          handleChangeLesson(e.target.value);
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
              <UploadButton onClick={onButtonClick}>Upload a file</UploadButton>
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
  );
}
