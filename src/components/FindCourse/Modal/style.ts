import styled from "styled-components";

export const ModalBg = styled.div`
  transition: 0.2s opacity;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

export const Navbar = styled.div`
  display: flex;
  width: 100%;
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

export const Image = styled.div`
  width: 280px;
  height: 180px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

export const Description = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  flex: 1;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
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

export const CodeInput = styled.input`
  width: 300px;
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

export const Validation = styled.div`
  margin-top: 10px;
  margin-bottom: 16px;
  font-size: 16px;
  color: red;
  font-weight: 600;
`;
