import styled from "styled-components";

export const RegisterContainer = styled.div`
  width: 400px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.5);
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
  margin-bottom: 0;
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

  border: none;
  font-size: 16px;
  padding: 16px;
  outline: none;
  border-radius: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 50px;
  padding: 0 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: 0.5s;

  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Button = styled.div`
  width: 180px;
  background-image: linear-gradient(
    0deg,
    rgba(133, 183, 219, 0.3) 0%,
    rgba(205, 170, 233, 0.3) 100%
  );
  margin: 10px;
  border: none;
  font-size: 16px;
  color: #000;
  padding: 16px;
  outline: none;
  border-radius: 24px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    transition: 0.2s opacity;
    display: block;
    inset: 0;
    position: absolute;
    background-image: linear-gradient(
      0deg,
      rgba(133, 183, 219, 0.4) 0%,
      rgba(205, 170, 233, 0.4) 100%
    );
    opacity: 0;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
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
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.5);
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
  margin-bottom: 0;
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

export const Paragraph = styled.div`
  margin: 20px 10px;
  font-size: 14px;
  font-weight: 600;
  color: red;
`;
