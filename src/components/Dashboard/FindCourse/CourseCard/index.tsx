import { Course } from "@/types";
import { Container, Description, Title, TitleBox, Image } from "./style";

interface CourseProps {
  course: Course;
  key: string;
}

export function CourseCard(props: CourseProps) {
  return (
    <Container>
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
