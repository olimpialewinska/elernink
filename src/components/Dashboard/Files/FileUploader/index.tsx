import { useState, useRef, Key, useCallback, useContext } from "react";
import {
  Button,
  Files,
  File,
  Icon,
  Name,
  Form,
  Input,
  Label,
  UploadButton,
  Drag,
  Error,
} from "./style";
import { userContext } from "../..";

export function DragDropFile() {
  const { id } = useContext(userContext);
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
      }
    },
    [files]
  );

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const deleteFile = useCallback(
    (index: Key) => {
      const newFiles = [...files];
      newFiles.splice(index as number, 1);
      setFiles(newFiles);
    },
    [files]
  );

  const handleUpload = useCallback(async () => {
    if (!files) {
      return;
    }
    const formData = new FormData();
    formData.append(
      "userId",
      JSON.stringify({
        id,
      })
    );

    files.forEach((file) => {
      formData.append("files", file);
    });
    const data = await fetch("/api/files/upload", {
      method: "POST",

      body: formData,
    });
    if (data.status !== 200) {
      setError(true);
      return;
    }

    window.location.reload();
  }, [files, id]);

  return (
    <>
      <Form
        onDragEnter={(e) => handleDrag(e)}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
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
            setError(false);
            const newFiles = event.target.files;
            if (!newFiles) return;
            setFiles([...files, ...Array.from(newFiles)]);
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

      <Button onClick={() => handleUpload()}>Upload</Button>
    </>
  );
}
