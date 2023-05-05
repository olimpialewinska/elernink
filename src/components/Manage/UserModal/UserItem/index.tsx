import { Course, IParticipant } from "@/types";
import { Icon, Name, Wrapper } from "./style";
import { useCallback, useContext } from "react";
import { mainContext } from "@/pages/_app";

interface IUserItem {
  user: IParticipant;
  handleDelete: (id: string) => void;
  course: Course;
}

export function UserItem(props: IUserItem) {
  const { errorFunction } = useContext(mainContext);
  const onClick = useCallback(async () => {
    const data = await fetch("/api/courses/deleteParticipant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.user.userId,
        courseId: props.course.id,
      }),
    });

    if (data.status !== 200) {
      errorFunction();
      return;
    }

    props.handleDelete(props.user.userId);
  }, [errorFunction, props]);
  return (
    <Wrapper>
      <Name>{props.user.user_name}</Name>
      <Icon
        style={{
          backgroundImage: "url(/delete.png)",
        }}
        onClick={onClick}
      />
    </Wrapper>
  );
}
