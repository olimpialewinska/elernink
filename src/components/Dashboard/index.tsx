import {
  BurgerMenu,
  Button,
  Close,
  Container,
  Content,
  Item,
  List,
  Logo,
  Menu,
  MenuMobile,
  LogoMobile,
  CloseMobile,
} from "./style";
import { createContext, useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MyCourses } from "./MyCourses";
import { FindCourse } from "./FindCourse";
import { Notes } from "./Notes";
import { Files } from "./Files";
import { Settings } from "./Settings";
import { useRouter } from "next/navigation";
import { Create } from "./Create";
import { useCookies } from "react-cookie";

export const userContext = createContext({ email: "", id: "" });

export function Dashboard() {
  const router = useRouter();
  const [close, setClose] = useState(true);
  const [open, setOpen] = useState(false);
  const category = usePathname();
  const currentCategory = category;
  const isTeacher = true;
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const token = cookies.Authorization;
  const id = token.user.id;
  const email = token.user.email;

  const signOut = useCallback(async () => {
    await fetch("/api/auth/signOut", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/login");
  }, [router]);

  return (
    <>
      <userContext.Provider value={{ email, id }}>
        <Container>
          <MenuMobile>
            <LogoMobile />
            <BurgerMenu
              onClick={() => {
                setOpen(!open);
              }}
            />
          </MenuMobile>
          <Menu open={open}>
            {open ? (
              <CloseMobile
                onClick={() => {
                  setOpen(!open);
                }}
              />
            ) : (
              <></>
            )}
            {close ? (
              <Close
                onClick={() => {
                  setClose(!close);
                }}
              />
            ) : (
              <></>
            )}

            <Logo />
            <List>
              <Item
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                My Courses
              </Item>

              {isTeacher && (
                <Item
                  onClick={() => {
                    router.push("/dashboard/create");
                  }}
                >
                  Create a course
                </Item>
              )}
              <Item
                onClick={() => {
                  router.push("/dashboard/find");
                }}
              >
                Find a course
              </Item>

              <Item
                onClick={() => {
                  router.push("/dashboard/notes");
                }}
              >
                Notes
              </Item>

              <Item
                onClick={() => {
                  router.push("/dashboard/files");
                }}
              >
                Files
              </Item>

              <Item
                onClick={() => {
                  router.push("/dashboard/settings");
                }}
              >
                Settings
              </Item>
            </List>
            <Button onClick={signOut}>Sign Out</Button>
          </Menu>

          <Content close={close}>
            {close ? (
              <></>
            ) : (
              <Close
                onClick={() => {
                  setClose(!close);
                }}
              />
            )}
            {currentCategory === "/dashboard" && <MyCourses close={close} />}
            {currentCategory === "/dashboard/find" && <FindCourse />}
            {currentCategory === "/dashboard/create" && <Create />}
            {currentCategory === "/dashboard/notes" && <Notes />}
            {currentCategory === "/dashboard/files" && <Files />}
            {currentCategory === "/dashboard/settings" && <Settings />}
          </Content>
        </Container>
      </userContext.Provider>
    </>
  );
}
