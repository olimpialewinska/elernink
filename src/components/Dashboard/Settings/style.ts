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
  height: calc(100% - 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border: 1px #000 solid;
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

export const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Email = styled.input`
  width: 400px;
  background-color: #ecf1f4;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.2);
  margin: 10px;
  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Password = styled.input`
  width: 400px;
  background-color: #ecf1f4;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.2);
  margin: 10px;
  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Validation = styled.div`
  margin: 10px;
  font-size: 14px;
  font-weight: 600;
  color: red;
  margin-top: 28px;
`;

export const Button = styled.div`
  width: 180px;
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

  text-align: center;

  &:hover {
    background-color: #3e5f78;
  }
`;
