import styled from "styled-components";

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
`;

export const Description = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  flex: 1;
`;

export const Image = styled.div`
  width: 280px;
  height: 180px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
`;

export const BackArrow = styled.div`
  position: absolute;
  background-image: url("/close.svg");
  background-size: cover;
  width: 30px;
  height: 30px;
  opacity: 0.6;
  top: 20px;
  right: 20px;
  cursor: pointer;

  //hover
  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

export const EditButton = styled.div`
  width: 18px;
  height: 18px;
  background-image: url("/edit.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.3;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const DescriptionInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  font-weight: 600;
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  width: 100%;
`;

export const NameInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

export const Alert = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  margin: 10px 0;
  background-color: rgba(255, 106, 106, 0.42);
  border-radius: 10px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  z-index: 30;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const AlertInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #333;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  background-color: transparent;
`;
