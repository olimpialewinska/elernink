/* eslint-disable jsx-a11y/alt-text */
import { Course } from "@/types";
import {
  Container,
  Description,
  Title,
  TitleBox,
  Image,
  MenuButton,
  Menu,
  MenuItem,
} from "./style";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import { mainContext } from "@/pages/_app";

interface CourseProps {
  course: Course;
  key: string;
}

export function CourseCard(props: CourseProps) {
  const { auth } = useContext(mainContext);
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const leaveCourse = useCallback(async () => {
    const data = await fetch(`/api/courses/leaveCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: props.course.id,
        userId: auth.id,
      }),
    });
    if (data.status === 200) {
      window.location.reload();
    }
  }, [auth.id, props.course.id]);
  return (
    <Container
      onClick={() => {
        router.push(`/dashboard/course/${props.course.id}`);
      }}
    >
      <Image
        style={{
          backgroundImage: props.course.image
            ? `url(${props.course.image})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <MenuButton
        onClick={(e) => {
          e.stopPropagation();
          setMenu(!menu);
        }}
      />
      {menu ? (
        <Menu
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              leaveCourse();
            }}
          >
            Leave Course
          </MenuItem>
        </Menu>
      ) : null}
      <TitleBox>
        <Title>{props.course.name}</Title>
        <Description>
          {props.course.description.length > 150
            ? props.course.description.slice(0, 150) + "..."
            : props.course.description}
        </Description>
      </TitleBox>
    </Container>
  );
}
