import { FileInterface } from "@/types";
import { Icon, Icons, Name, Wrapper, File } from "./style";
import { useCallback, useContext, useEffect } from "react";
import { mainContext } from "@/pages/_app";

interface IFileComponent {
  file: FileInterface;
  deleteFile: (id: string) => void;
}

export function FileComponent(props: IFileComponent) {
  const { auth } = useContext(mainContext);
  const handleDelete = useCallback(async () => {
    const data = await fetch("/api/files/deleteFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: props.file.name,
        userId: auth.id,
        id: props.file.id,
      }),
    });
    if (data.status == 200) {
      props.deleteFile(props.file.id);
    } else {
      alert("Something went wrong");
    }
  }, [auth.id, props]);

  return (
    <File>
      <Wrapper>
        <Icon
          style={{
            backgroundImage: `url("/file.png")`,
          }}
        />
        <Name>{props.file.name}</Name>
      </Wrapper>

      <Icons>
        <Icon
          style={{
            backgroundImage: `url("/download.png")`,
          }}
          onClick={() => {
            window.open(props.file.url);
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
