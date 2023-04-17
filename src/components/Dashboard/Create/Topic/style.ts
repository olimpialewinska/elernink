import styled from "styled-components";

export const Topic = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  margin: 10px 0;
  background-color: #ebebeb;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
