import { useSupabase } from "@/app/supabase-provider";
import { Button, Container, Content, Item, List, Logo, Menu } from "./style";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MyCourses } from "./MyCourses";
import { FindCourse } from "./FindCourse";
import { Notes } from "./Notes";
import { Files } from "./Files";
import { Settings } from "./Settings";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Dashboard() {
  const router = useRouter();
  const [close, setClose] = useState(true);
  const category = usePathname();

  const currentCategory = category;

  return (
    <>
      <Container>
        <Menu>
          <Logo />
          <List>
            <Item
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              My Courses
            </Item>

            <Item
              onClick={() => {
                router.push("/dashboard/find");
              }}
            >
              Find a curse
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
          <Button>Sign Out</Button>
        </Menu>
        <Content
          onClick={() => {
            setClose(!close);
          }}
          close={close}
        >
          {currentCategory === "/dashboard" && <MyCourses close={close} />}
          {currentCategory === "/dashboard/find" && <FindCourse />}
          {currentCategory === "/dashboard/notes" && <Notes />}
          {currentCategory === "/dashboard/files" && <Files />}
          {currentCategory === "/dashboard/settings" && <Settings />}
        </Content>
      </Container>
    </>
  );
}
