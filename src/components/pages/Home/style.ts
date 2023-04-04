import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("/home-bg-desktop.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Content = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.div`
  width: 300px;
  height: 100px;
  background-image: url("/logo1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Subtitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 150px;
  background-color: #5882a3;
  margin: 10px;
  border: none;
  font-size: 16px;
  color: #fff;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s all;
  &:hover {
    background-color: #3e5f78;
  }
`;
