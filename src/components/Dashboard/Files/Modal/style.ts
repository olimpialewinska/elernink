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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;

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
