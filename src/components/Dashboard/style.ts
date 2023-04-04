import styled, { keyframes } from "styled-components";

interface ContentProps {
  close: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(185, 203, 255, 1) 0%,
    rgba(101, 157, 255, 1) 100%
  );
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled.div`
  width: 200px;
  height: 50px;
  background-image: url("logo1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 30px;
  margin-left: -20px;
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    -45deg,
    rgba(229, 243, 255, 1) 0%,
    rgba(247, 252, 255, 1) 100%
  );
  width: ${(props) => (props.close ? "100%" : "100vw")};
  margin-left: ${(props) => (props.close ? "-20px" : "-300px")};
  border-radius: ${(props) => (props.close ? "20px 0 0 20px" : 0)};
  padding: 30px;
  padding-bottom: 0;
  box-shadow: -6px -6px 24px 0px rgba(66, 68, 90, 1);
  height: ${(props) => (props.close ? "100vh" : "none")};
`;

export const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -20px;
`;

export const Item = styled.div`
  display: flex;
  width: 200px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;
  padding: 14px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #002542;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled.div`
  display: flex;
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-left: -20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;
  padding: 14px;
  background: rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #ffffff;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;
