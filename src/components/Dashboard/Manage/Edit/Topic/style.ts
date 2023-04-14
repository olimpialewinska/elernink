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
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  z-index: 30;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;

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
  align-items: center;
  flex: 1;
`;

export const EditButton = styled.div`
  width: 18px;
  height: 18px;
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
  align-items: center;
  justify-content: center;
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

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;
