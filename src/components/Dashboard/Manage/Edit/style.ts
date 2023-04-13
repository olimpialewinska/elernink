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
