import { Course } from "@/types";
import {
  CourseDiv,
  Icon,
  Icons,
  Name,
  Wrapper,
  Image,
  IdentityBox,
  Description,
} from "./style";
import { useCallback, useState } from "react";
import { UserModal } from "../UserModal";

interface ICourseComponent {
  course: Course;
  courseList: Course[];
  deleteCourse: (id: string) => void;
}

export function CourseComponent(props: ICourseComponent) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleDelete = useCallback(async () => {
    const data = await fetch("/api/courses/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.course.id,
      }),
    });

    const response = data.status;

    if (response === 200) {
      props.deleteCourse(props.course.id);
    }
  }, [props]);
  return (
    <CourseDiv>
      <Wrapper>
        <Image
          style={{
            backgroundImage: props.course.image
              ? `url("${props.course.image}")`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <IdentityBox>
          <Name>{props.course.name}</Name>
          <Description>
            {props.course.description.length > 100
              ? props.course.description.slice(0, 100) + "..."
              : props.course.description}
          </Description>
        </IdentityBox>
      </Wrapper>

      <Icons>
        <Icon
          style={{
            backgroundImage: `url("/people.png")`,
          }}
          onClick={handleShow}
        />
        <Icon
          style={{
            backgroundImage: `url("/edit.png")`,
          }}
          onClick={() => {
            window.location.href = `/dashboard/manage/${props.course.id}`;
          }}
        />

        <Icon
          style={{
            backgroundImage: `url("/delete.png")`,
          }}
          onClick={handleDelete}
        />
      </Icons>
      <UserModal visible={show} hide={handleClose} course={props.course} />
    </CourseDiv>
  );
}
