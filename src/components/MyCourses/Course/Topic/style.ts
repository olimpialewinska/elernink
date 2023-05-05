import styled from "styled-components";

interface Content {
  isOpen: boolean;
}

export const Topic = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  margin: 10px 0;
  background-color: #ebebeb;
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  z-index: 30;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    font-size: 16px;
    flex: 1;
  }
`;

export const ArrowDown = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/arrow-down.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
`;

export const EditButton = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/edit.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    opacity: 1;
  }
`;
export const Close = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/close.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    opacity: 1;
  }
`;

export const Save = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/check.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    opacity: 1;
  }
`;

export const NameInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const Content = styled.div<Content>`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  margin-top: -14px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  transition: height 0.3s;
  display: ${(props) => (props.isOpen ? "auto" : "none")};
  overflow: hidden;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Input = styled.textarea`
  width: 100%;
  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  transition: 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  resize: vertical;
  white-space: pre-line;

  @media (max-width: 768px) {
    width: 90%;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

export const DeleteButton = styled.div`
  width: 20px;
  height: 20px;
  background-image: url("/delete.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  cursor: pointer;
  margin-left: 14px;
  margin-right: 14px;

  &:hover {
    opacity: 1;
  }
`;

export const FileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const File = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

export const FileName = styled.div``;

export const FileIcon = styled.div`
  width: 20px;
  height: 20px;

  background-image: url("/file.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;
  margin-right: 10px;

  &:hover {
    opacity: 1;
  }
`;
export const DownloadIcon = styled.div`
  width: 20px;
  height: 20px;

  background-image: url("/download.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

export const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const LessonContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;
