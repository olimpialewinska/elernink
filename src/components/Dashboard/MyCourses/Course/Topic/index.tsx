import { useCallback, useEffect, useState } from "react";
import {
  Topic,
  Name,
  ArrowDown,
  Wrapper,
  File,
  Content,
  Divider,
  FileContainer,
  FileIcon,
  FileName,
  DownloadIcon,
  Box,
  LessonContent,
} from "./style";
import Link from "next/link";

interface TopicProps {
  topic: string;
  lesson: string;
  id: number;
  courseId: string;
}

export function TopicItem(props: TopicProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<any>();

  const getFiles = useCallback(async () => {
    const response = await fetch("/api/courses/getTopicFiles", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        courseId: props.courseId,
        topicId: props.id,
      }),
    });

    const data = await response.json();
    setFiles(data);
  }, [props.courseId, props.id]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);
  return (
    <>
      <Topic>
        <Wrapper>
          <Name>{props.topic}</Name>
        </Wrapper>

        <ArrowDown
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </Topic>

      <Content isOpen={isOpen}>
        <LessonContent>{props.lesson}</LessonContent>

        <FileContainer>
          {files?.map((file: any) => {
            return (
              <File key={file.id}>
                <Link
                  href={file.url}
                  target="_blank"
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
                  <DownloadIcon />
                </Link>
              </File>
            );
          })}
        </FileContainer>
      </Content>
    </>
  );
}
