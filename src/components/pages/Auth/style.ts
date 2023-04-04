import styled from "styled-components";

export const RegisterContainer = styled.div`
  width: 400px;
  border-radius: 10px;
  background-color: white;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.5),
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: 90% !important;
  }
`;

export const RegisterHeaderIcon = styled.div`
  width: 140px;
  height: 60px;
  background-image: url("/logo1.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const RegisterContent = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const Input = styled.input`
  width: 100%;
  background-color: #ecf1f4;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.2);
  margin: 10px;
  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
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

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: calc(100vh - 60px);
`;

export const LoginContainer = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  background-color: white;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.5),
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: 80% !important;
  }
`;

export const LoginHeaderIcon = styled.div`
  width: 140px;
  height: 60px;
  background-image: url("/logo1.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 30px;
`;

export const LoginContent = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

export const LoginFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
`;

export const Text = styled.div`
  font-size: 14px;
`;

export const Href = styled.div`
  text-decoration: none;
  font-size: 14px;
  transition: 0.1s all;
  margin-left: 8px;
  color: #5882a3;
`;

export const ParagraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
