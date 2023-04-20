import { FileInterface } from "@/types";
import { Icon, Icons, Name, Wrapper, File } from "./style";
import { useCallback, useContext } from "react";
import { userContext } from "../..";

interface FileProps {
  file: FileInterface;
  key: string;
}

export function FileComponent(props: FileInterface, key: string) {
  const { id } = useContext(userContext);
  const handleDelete = useCallback(async () => {
    const data = await fetch("/api/files/deleteFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: props.name,
        userId: id,
        id: props.id,
      }),
    });
    if (data.status == 200) {
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  }, [id, props.id, props.name]);
  return (
    <File>
      <Wrapper>
        <Icon
          style={{
            backgroundImage: `url("/file.png")`,
          }}
        />
        <Name>{props.name}</Name>
      </Wrapper>

      <Icons>
        <Icon
          style={{
            backgroundImage: `url("/expand.png")`,
          }}
        />
        <Icon
          style={{
            backgroundImage: `url("/download.png")`,
          }}
          onClick={() => {
            window.open(props.url);
          }}
        />

        <Icon
          style={{
            backgroundImage: `url("/delete.png")`,
          }}
          onClick={() => {
            handleDelete();
          }}
        />
      </Icons>
    </File>
  );
}
