import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  height: 260px;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: inline-block;
`;

export const Image = styled.div`
  height: 60%;
  width: 100%;
  background-color: purple;
`;

export const TitleBox = styled.div`
  height: 40%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
`;

export const Description = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`;

export const MenuButton = styled.div`
  background-image: url("/more.png");
  background-size: cover;
  background-position: center;
  width: 24px;
  height: 24px;
  filter: invert(1);
  opacity: 0.6;
  position: absolute;
  top: 8px;
  right: 0;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 34px;
  right: 4px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
`;

export const MenuItem = styled.div`
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.6);
`;
