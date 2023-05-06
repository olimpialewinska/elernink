/* eslint-disable react-hooks/rules-of-hooks */
import "@/styles/globals.css";
import App, { AppContext, AppProps } from "next/app";
import Router from "next/router";
import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useState,
} from "react";
import {
  BurgerMenu,
  Button,
  Close,
  CloseMobile,
  Container,
  Content,
  Item,
  List,
  Logo,
  LogoMobile,
  Menu,
  MenuMobile,
} from "../components/style";
import { IUser } from "../types";
import { Notification } from "@/components/Notification";
import { NextPage } from "next";

interface MainContext {
  close: boolean;
  open: boolean;
  auth: IUser;
  errorFunction: () => void;
}

export const mainContext = createContext({} as MainContext);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  const [close, setClose] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const userId = pageProps.auth?.user?.id;
  const email = pageProps.auth?.user?.email;

  const errorFunction = useCallback(() => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 4000);
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/signOut", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    Router.push("/login");
  }, []);

  return (
    <mainContext.Provider
      value={{
        close,
        open,
        auth: {
          id: userId,
          email: email,
        },
        errorFunction,
      }}
    >
      <Container>
        {error ? <Notification /> : <></>}

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
                Router.push("/dashboard");
                setOpen(!open);
              }}
            >
              My Courses
            </Item>

            <>
              <Item
                onClick={() => {
                  Router.push("/dashboard/create");
                  setOpen(!open);
                }}
              >
                Create a course
              </Item>

              <Item
                onClick={() => {
                  Router.push("/dashboard/manage");
                  setOpen(!open);
                }}
              >
                Manage courses
              </Item>
            </>

            <Item
              onClick={() => {
                Router.push("/dashboard/find");
                setOpen(!open);
              }}
            >
              Find a course
            </Item>

            <Item
              onClick={() => {
                Router.push("/dashboard/notes");
                setOpen(!open);
              }}
            >
              Notes
            </Item>

            <Item
              onClick={() => {
                Router.push("/dashboard/files");
                setOpen(!open);
              }}
            >
              Files
            </Item>

            <Item
              onClick={() => {
                Router.push("/dashboard/settings");
                setOpen(!open);
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
          <Component {...pageProps} />
        </Content>
      </Container>
    </mainContext.Provider>
  );
}
