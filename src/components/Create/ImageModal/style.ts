import styled from "styled-components";

export const ModalBg = styled.div`
  transition: 0.2s opacity;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 99999;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
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

export const Files = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 10px 0;
  overflow-x: scroll;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Icon = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("/file.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: 0.2s background-image;

  &:hover {
    background-image: url("/delete.png");
  }
`;

export const Name = styled.div``;

export const Form = styled.form`
  height: 16rem;
  width: 28rem;
  max-width: 100%;
  text-align: center;
  position: relative;
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-radius: 1rem;
  border-style: dashed;
  border-color: #cbd5e1;
  background-color: #f8fafc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  filter: brightness(100%) grayscale(10%) contrast(30%);
`;

export const DragActive = styled.label`
  background-color: #ffffff;
`;

export const UploadButton = styled.button`
  cursor: pointer;
  padding: 0.25rem;
  font-size: 1rem;
  border: none;
  font-family: "Oswald", sans-serif;
  background-color: transparent;
  filter: none;
  color: white;

  //hover
  &:hover {
    text-decoration-line: underline;
  }
`;

export const Drag = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  filter: none;
`;

export const Error = styled.div`
  color: red;
  font-size: 18px;
  margin-top: 0.25rem;
`;

export const P = styled.div`
  filter: none;
`;

export const Div = styled.div`
  filter: none;
  color: white;
`;

export const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
