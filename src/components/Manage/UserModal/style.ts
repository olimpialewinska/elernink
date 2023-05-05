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
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    width: 90%;
    height: 80%;
    padding: 10px;
  }
`;

export const Input = styled.input`
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

export const HR = styled.div`
  width: 90%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  -webkit-letter-spacing: 0.1em;
  -moz-letter-spacing: 0.1em;
  -ms-letter-spacing: 0.1em;
  letter-spacing: 0.1em;
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Button = styled.div`
  width: 100px;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
