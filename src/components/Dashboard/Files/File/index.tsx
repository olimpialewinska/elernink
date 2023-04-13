import { Icon, Icons, Name, Wrapper, File } from "./style";

export function FileComponent() {
  return (
    <File>
      <Wrapper>
        <Icon
          style={{
            backgroundImage: `url("/file.png")`,
          }}
        />
        <Name>plik.pdf</Name>
      </Wrapper>

      <Icons>
        <Icon
          style={{
            backgroundImage: `url("/expand.png")`,
          }}
        />
        <Icon
          style={{
            backgroundImage: `url("/download.png")`,
          }}
        />

        <Icon
          style={{
            backgroundImage: `url("/delete.png")`,
          }}
        />
      </Icons>
    </File>
  );
}
