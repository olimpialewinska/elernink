import { Course } from "@/types";
import { Container, Description, Title, TitleBox, Image } from "./style";

interface CourseProps {
  course: Course;
  key: string;
  onClick: () => void;
}

export function CourseCard(props: CourseProps) {
  return (
    <Container onClick={props.onClick}>
      <Image
        style={{
          backgroundImage:
            props.course.image != null ? `url(${props.course.image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
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
