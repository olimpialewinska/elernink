import styled from "styled-components";

export const CourseDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: 0.5s;

  border: 1px solid rgba(0, 0, 0, 0.1);

  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

export const Icon = styled.div`
  width: 18px;
  height: 18px;
  margin: 6px;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;

  :hover {
    opacity: 1;
  }
`;

export const Name = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Image = styled.div`
  width: 140px;
  height: 80px;
  background-color: rebeccapurple;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100px;
    height: 60px;
  }
`;

export const IdentityBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
`;

export const Description = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;
