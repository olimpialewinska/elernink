import styled from "styled-components";

export const Nav = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Logo = styled.div`
  width: 120px;
  height: 60px;
  background-image: url("/logo1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Menu = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    width: 160px;
    padding: 0 10px;
  }
`;

export const MenuItem = styled.div`
  width: 50px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #005291;
  }
`;
