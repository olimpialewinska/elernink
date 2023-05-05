import { useCallback, useContext, useEffect, useState } from "react";
import { FileComponent } from "./File";
import {
  Navbar,
  Title,
  Search,
  SearchIcon,
  SearchInput,
  Container,
  AddButton,
  FilterIcon,
  Filterbar,
  Wrapper,
  Button,
  LoaderWrapper,
  FileWrapper,
} from "./style";
import { FileModal } from "./Modal";

import { FileInterface } from "@/types";
import { Loader } from "@/components/Loader";
import { mainContext } from "@/pages/_app";

interface IFiles {
  files: any;
}

const sortFiles = (fileList: FileInterface[], type: "asc" | "desc") => {
  const sortedFiles = fileList
    ?.slice()
    .sort((a: FileInterface, b: FileInterface) => {
      if (type === "asc") {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      } else {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
      }
      return 0;
    });
  return sortedFiles;
};

export function Files(props: IFiles) {
  const { auth } = useContext(mainContext);
  const [files, setFiles] = useState<FileInterface[]>(JSON.parse(props.files));
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [select, setSelect] = useState<"AZ" | "ZA">("AZ");

  const getFiles = useCallback(async () => {
    setLoading(true);

    const files = await fetch("/api/files/getMyFiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: auth.id,
      }),
    });

    if (files.status !== 200) {
      return;
    }

    const data = await files.json();
    setFiles(data.files);
    setLoading(false);
  }, [auth.id]);

  const searchByName = useCallback(
    (name: string) => {
      if (name != "") {
        const filteredList = files?.filter((file: FileInterface) => {
          return file.name.toLowerCase().includes(name.toLowerCase());
        });
        setFiles(filteredList);
      } else {
        getFiles();
      }
    },
    [files, getFiles]
  );

  const deleteFile = useCallback(
    (id: string) => {
      const newFiles = files?.filter((file: FileInterface) => file.id !== id);
      setFiles(newFiles);
    },
    [files]
  );

  const sort = useCallback(() => {
    const sortedFiles = sortFiles(files, select === "AZ" ? "desc" : "asc");
    setFiles(sortedFiles);
  }, [files, select]);

  return (
    <>
      <Navbar>
        <Title>My Files</Title>
        <Search>
          <SearchIcon />
          <SearchInput
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchByName(e.target.value);
            }}
          />
        </Search>
      </Navbar>

      <Container>
        <Filterbar>
          <AddButton onClick={handleShow}>+ Add file</AddButton>
          <Wrapper>
            <Button
              style={
                select === "AZ"
                  ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                  : { backgroundColor: "transparent" }
              }
              onClick={() => {
                sort();
                setSelect("AZ");
              }}
            >
              <FilterIcon style={{ backgroundImage: `url("/AZ.png")` }} />
            </Button>

            <Button
              style={
                select === "ZA"
                  ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                  : { backgroundColor: "transparent" }
              }
              onClick={() => {
                sort();
                setSelect("ZA");
              }}
            >
              <FilterIcon style={{ backgroundImage: `url("/ZA.png")` }} />
            </Button>
          </Wrapper>
        </Filterbar>

        {loading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <FileWrapper>
            {files ? (
              files?.map((file: FileInterface) => {
                return (
                  <FileComponent
                    key={file.id}
                    file={file}
                    deleteFile={deleteFile}
                  />
                );
              })
            ) : (
              <p>No files found</p>
            )}
          </FileWrapper>
        )}

        <FileModal visible={show} hide={handleClose} />
      </Container>
    </>
  );
}
