/* eslint-disable jsx-a11y/alt-text */
import { Course } from "@/types";
import { Container, Description, Title, TitleBox, Image } from "./style";
import { useRouter } from "next/navigation";

interface CourseProps {
  course: Course;
  key: string;
}

export function CourseCard(props: CourseProps) {
  const router = useRouter();
  return (
    <Container
      onClick={() => {
        router.push(`/dashboard/course/${props.course.id}`);
      }}
    >
      <Image />
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
