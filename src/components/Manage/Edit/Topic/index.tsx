import { FileInterface, TopicInterface } from "@/types";
import {
  DeleteButton,
  Drag,
  Files,
  Form,
  Input,
  InputFile,
  Label,
  Topic,
  TopicTitle,
  UploadButton,
  Wrapper,
  Error,
  Box,
  CourseFile,
  FileContainer,
  FileIcon,
  FileName,
  DeleteIcon,
} from "./style";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ProgressBar } from "@/components/LoadingBar";
import { mainContext } from "@/pages/_app";

interface TopicItemInterface {
  topic: TopicInterface;
  key: number;
  courseId: string;
}
export function TopicEdit(props: TopicItemInterface) {
  const { errorFunction } = useContext(mainContext);
  const [error, setError] = useState(false);
  const [lesson, setLesson] = useState(props.topic.lesson);
  const [topic, setTopic] = useState(props.topic.topic);
  const inputRef = useRef<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [courseFiles, setCourseFiles] = useState<FileInterface[]>([]);

  const [loading, setLoading] = useState(true);

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

  const getFiles = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/courses/getTopicFiles", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        topicId: props.topic.id,
      }),
    });

    const data = await response.json();

    setLoading(false);
    setCourseFiles(data.files);
  }, [props.topic.id]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const handleFileChange = useCallback(
    async (newfiles: FileList | null) => {
      setLoading(true);
      setError(false);

      if (!newfiles) {
        return;
      }

      const formData = new FormData();
      formData.append("topicId", props.topic.id.toString());
      formData.append("courseId", props.courseId);

      for (let i = 0; i < newfiles.length; i++) {
        const file = newfiles[i];
        formData.append("file", file);
      }

      const fileRes = await fetch("/api/courses/addCourseFiles", {
        method: "POST",
        body: formData,
      });

      if (fileRes.status !== 200) {
        setError(true);
        return;
      }

      getFiles();
    },
    [getFiles, props.courseId, props.topic.id]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files);
      }
    },
    [handleFileChange]
  );

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const updateTopic = useCallback(async () => {
    setLoading(true);
    const data = await fetch(`/api/courses/updateTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.topic.id,
        value: topic,
        type: "topic",
      }),
    });

    if (data.status !== 200) {
      errorFunction();
    }
  }, [errorFunction, props.topic.id, topic]);

  const updateLesson = useCallback(async () => {
    const data = await fetch(`/api/courses/updateTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.topic.id,
        value: lesson,
        type: "lesson",
      }),
    });

    if (data.status !== 200) {
      errorFunction();
    }
  }, [props.topic.id, lesson, errorFunction]);

  const deleteTopic = useCallback(async () => {
    const data = await fetch(`/api/courses/deleteTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.topic.id,
      }),
    });

    if (data.status === 200) {
      window.location.reload();
    }
  }, [props.topic.id]);

  const deleteFile = useCallback(
    async (filename: string) => {
      setCourseFiles([]);
      setLoading(true);
      const data = await fetch(`/api/courses/deleteCourseFiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: props.topic.id,
          courseId: props.courseId,
          filename: filename,
        }),
      });

      if (data.status === 200) {
        getFiles();
      }
    },
    [getFiles, props.courseId, props.topic.id]
  );

  return (
    <>
      <Wrapper>
        <Topic>
          <TopicTitle
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            onBlur={() => {
              updateTopic();
            }}
          />
          <DeleteButton
            onClick={() => {
              deleteTopic();
            }}
          />
        </Topic>

        <Input
          value={lesson}
          onChange={(e) => {
            setLesson(e.target.value);
          }}
          onBlur={() => {
            updateLesson();
          }}
        />
        <FileContainer>
          {Array.isArray(courseFiles)
            ? courseFiles?.map((file: any) => {
                return (
                  <CourseFile key={file.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      <Box>
                        <FileIcon />
                        <FileName> {file.name}</FileName>
                      </Box>
                      <DeleteIcon
                        onClick={() => {
                          deleteFile(file.name);
                        }}
                      />
                    </div>
                  </CourseFile>
                );
              })
            : null}
          {loading ? <ProgressBar /> : null}
        </FileContainer>

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
            {error === true ? <Error>Something went wrong</Error> : null}
          </Files>
        </>
      </Wrapper>
    </>
  );
}
