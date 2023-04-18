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
