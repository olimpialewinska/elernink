import styled from "styled-components";

export const Topic = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  margin: 10px 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 30;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const TopicTitle = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  background-color: transparent;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  margin-top: -14px;
  margin-bottom: 20px;
  background-color: #fff;
  /* border-radius: 0 0 10px 10px; */
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  transition: height 0.3s;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

export const LessonContent = styled.textarea`
  width: 100%;
  border: none;
  font-size: 16px;
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  resize: vertical;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
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

  &:hover {
    opacity: 1;
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

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Button = styled.div`
  width: 180px;
  background-image: linear-gradient(
    0deg,
    rgba(133, 183, 219, 0.3) 0%,
    rgba(205, 170, 233, 0.3) 100%
  );
  margin: 10px;
  border: none;
  font-size: 16px;
  color: #000;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    transition: 0.2s opacity;
    display: block;
    inset: 0;
    position: absolute;
    background-image: linear-gradient(
      0deg,
      rgba(133, 183, 219, 0.4) 0%,
      rgba(205, 170, 233, 0.4) 100%
    );
    opacity: 0;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;

export const Files = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 10px 0;
  overflow-x: scroll;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Icon = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("/file.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: 0.2s background-image;

  &:hover {
    background-image: url("/delete.png");
  }
`;

export const Name = styled.div``;

export const Form = styled.form`
  width: 100%;
  max-width: 100%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const InputFile = styled.input`
  display: none;
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-radius: 1rem;
  border-style: dashed;
  border-color: #cbd5e1;
  background-color: #f8fafc;
  padding: 10px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const DragActive = styled.label`
  background-color: #ffffff;
`;

export const UploadButton = styled.button`
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  font-family: "Oswald", sans-serif;
  background-color: transparent;

  //hover
  &:hover {
    text-decoration-line: underline;
  }
`;

export const Drag = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const Error = styled.div`
  color: red;
  font-size: 18px;
  margin-top: 0.25rem;
`;
