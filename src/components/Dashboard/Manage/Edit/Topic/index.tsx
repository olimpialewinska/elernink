import { Topic, Name } from "./style";

interface TopicProps {
  name: string;
  id: number;
}

export function TopicEdit(props: TopicProps) {
  return (
    <Topic>
      <Name>{props.name}</Name>
    </Topic>
  );
}
