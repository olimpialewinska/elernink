import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  //media
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
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
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }
`;
