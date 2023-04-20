import styled from "styled-components";

export const File = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 20px;
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
`;

export const Icon = styled.div`
  width: 18px;
  height: 18px;
  margin: 6px;
  border-radius: 50%;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;

  :hover {
    opacity: 1;
  }
`;

export const Name = styled.div`
  flex: 1;
  overflow: auto;
  padding: 6px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 70%;
`;
