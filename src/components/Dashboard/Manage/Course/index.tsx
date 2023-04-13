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
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function CourseComponent(props: Course) {
  const router = useRouter();
  const handleDelete = useCallback(async () => {
    const data = await fetch("/api/courses/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });

    const response = data.status;

    if (response === 200) {
      router.push("/dashboard/manage");
    }
  }, [props.id, router]);
  return (
    <CourseDiv>
      <Wrapper>
        <Image />
        <IdentityBox>
          <Name>{props.name}</Name>
          <Description>
            {props.description.length > 100
              ? props.description.slice(0, 100) + "..."
              : props.description}
          </Description>
        </IdentityBox>
      </Wrapper>

      <Icons>
        <Icon
          style={{
            backgroundImage: `url("/edit.png")`,
          }}
          onClick={() => {
            window.location.href = `/dashboard/manage/edit/${props.id}`;
          }}
        />

        <Icon
          style={{
            backgroundImage: `url("/delete.png")`,
          }}
          onClick={handleDelete}
        />
      </Icons>
    </CourseDiv>
  );
}
