import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  transition: 0.5s;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 20px;
  }

  //hover
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Icon = styled.div`
  width: 18px;
  height: 18px;
  margin: 6px;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.5s;
  opacity: 0.6;

  :hover {
    opacity: 1;
  }
`;

export const Name = styled.div``;
