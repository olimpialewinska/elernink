import styled, { keyframes } from "styled-components";

interface ContentProps {
  close: boolean;
}

interface MenuMobile {
  open: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div<MenuMobile>`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100vh;
  background: linear-gradient(0deg, #85b7db 0%, #cdaae9 100%);
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    ${(props) =>
      props.open
        ? {
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999,
            height: "100vh",
          }
        : { display: "none" }}
  }
`;

export const Logo = styled.div`
  width: 200px;
  height: 50px;
  background-image: url("/logo1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 30px;
  margin-top: 10px;
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
  margin-left: ${(props) => (props.close ? "-20px" : "-380px")};
  border-radius: ${(props) => (props.close ? "20px 0 0 20px" : 0)};
  padding: 30px;
  box-shadow: -6px -6px 24px 0px rgba(66, 68, 90, 0.2);
  height: ${(props) => (props.close ? "100vh" : "none")};

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    border-radius: 0;
    padding: 0;
    padding-top: 18px;
    padding-bottom: 0;
  }
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
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;
  padding: 14px;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;
  color: rgba(0, 0, 0, 0.7);

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-left: -20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.06);
  text-transform: uppercase;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.1em;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Close = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/close.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: 0.2s;
  opacity: 0.5;
  position: absolute;
  top: 10px;
  left: 10px;

  &:hover {
    opacity: 0.7;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const MenuMobile = styled.div`
  background: linear-gradient(45deg, #85b7db 0%, #cdaae9 100%);
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const BurgerMenu = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/menu.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
`;

export const LogoMobile = styled.div`
  width: 150px;
  height: 50px;
  background-image: url("/logo1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const CloseMobile = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/close.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
  position: fixed;
  top: 18px;
  right: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;
