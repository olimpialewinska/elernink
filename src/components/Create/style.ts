import styled from "styled-components";

export const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const NameInput = styled.input`
  width: 400px;
  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-radius: 8px;
  transition: 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;
export const AlertInput = styled.input`
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
  height: 50px;
  padding: 0 20px;
  border-radius: 8px;
  transition: 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;
export const CodeInput = styled.input`
  width: 200px;
  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-radius: 8px;
  transition: 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const DescriptionInput = styled.textarea`
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

export const ImageInput = styled.input`
  width: 400px;
  border: none;
  padding: 20px 0;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const CreateButton = styled.div`
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

export const IdentityBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const Topic = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  margin: 10px 0;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  z-index: 30;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const TopicTitle = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
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
  border-radius: 0 0 10px 10px;
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

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
`;

export const NewTopicButton = styled.div`
  width: 50px;
  height: 50px;
  background-image: linear-gradient(
    0deg,
    rgba(133, 183, 219, 0.3) 0%,
    rgba(205, 170, 233, 0.3) 100%
  );

  border: none;
  outline: none;
  border-radius: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    font-size: 40px;
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
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const AddImageButton = styled.div`
  width: 50px;
  height: 50px;
  padding: 0 20px;
  border-radius: 8px;
  transition: 0.5s;
  background-image: url("/add-image.png");
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px dotted rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: 0.5;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const NameCont = styled.div`
  display: flex;
  justify-content: row;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
