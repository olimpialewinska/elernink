import {
  Container,
  CreateButton,
  DescriptionInput,
  IdentityBox,
  ImageInput,
  NameInput,
  Navbar,
  Title,
} from "./style";

export function Create() {
  return (
    <>
      <Navbar>
        <Title>Create</Title>
      </Navbar>
      <Container>
        <IdentityBox>
          <NameInput placeholder="Name" required />
          <ImageInput type="file" />
          <DescriptionInput placeholder="Description" />
        </IdentityBox>

        <CreateButton>Create</CreateButton>
      </Container>
    </>
  );
}
