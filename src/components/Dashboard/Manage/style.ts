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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  padding: 20px;
  overflow-y: auto;

  //media
  @media (max-width: 768px) {
    overflow: none;
  }
`;
