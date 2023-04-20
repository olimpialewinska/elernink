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
} from "./style";
import { FileModal } from "./Modal";
import { userContext } from "..";
import { FileInterface } from "@/types";
import { Loader } from "@/components/Loader";

export function Files() {
  const { id } = useContext(userContext);
  const [files, setFiles] = useState<FileInterface[]>();
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
        userId: id,
      }),
    });

    if (files.status !== 200) {
      return;
    }

    const data = await files.json();
    setFiles(data);
    setLoading(false);
    console.log(data);
  }, [id]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

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

  const sortFilesAZ = useCallback(() => {
    const sortedFiles = files
      ?.slice()
      .sort((a: FileInterface, b: FileInterface) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    setFiles(sortedFiles);
  }, [files]);

  const sortFilesZA = useCallback(() => {
    const sortedFiles = files
      ?.slice()
      .sort((a: FileInterface, b: FileInterface) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
    setFiles(sortedFiles);
  }, [files]);

  return (
    <>
      <Navbar>
        <Title>My Files</Title>
        <Search>
          <SearchIcon />
          <SearchInput
            placeholder="Search"
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
                sortFilesAZ();
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
                sortFilesZA();
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
          files?.map((file: FileInterface) => {
            return (
              <FileComponent
                key={file.url}
                name={file.name}
                url={file.url}
                id={file.id}
              />
            );
          })
        )}

        <FileModal visible={show} hide={handleClose} />
      </Container>
    </>
  );
}
