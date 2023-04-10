import Link from "next/link";
import { Button, Container, Content, Subtitle, Title } from "./style";
import { Navbar } from "@/components/navbar";

export function HomePage() {
  return (
    <Container>
      <Navbar />
      <Content>
        <Title />
        <Subtitle>Learn anything, anytime, anywhere</Subtitle>
        <Link href="/register">
          {" "}
          <Button>Get Started</Button>
        </Link>
      </Content>
    </Container>
  );
}
