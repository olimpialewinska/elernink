import styled from "styled-components";

interface ContentProps {
  close: boolean;
}

export const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Search = styled.div`
  width: 70%;
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
  margin-bottom: 12px;
  transition: 0.5s;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const SearchIcon = styled.div`
  height: 28px;
  width: 28px;
  background-image: url("/search.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: 0.5s;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  background-color: transparent;
  flex: 1;
`;

export const Content = styled.div<ContentProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 14px;
  padding: 10px;
  justify-content: center;
  height: 78vh;
  overflow-y: ${(props) => (props.close ? "scroll" : "none")};

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 20px;
  }

  @media only screen and (max-width: 1280px) and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;
  }
`;

export const Error = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: red;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
