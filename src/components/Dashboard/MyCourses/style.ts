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
`;

export const Search = styled.div`
  width: 200px;
  padding: 8px;
  border-radius: 24px;
  display: flex;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
`;

export const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  margin: 0;
  margin-left: 4px;
  color: #002542;
  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const SearchIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
  background-image: url("/search.svg");
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Text = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 4px 20px;
  color: rgba(0, 0, 0, 0.7);
`;

export const Courses = styled.div<ContentProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 20px;
  justify-content: center;
  overflow: ${(props) => (props.close ? "scroll" : "none")};
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Course = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.2s;
  height: 200px;
  background: linear-gradient(
    45deg,
    rgba(101, 157, 255, 1) 0%,
    rgba(185, 203, 255, 1) 100%
  );
  border-radius: 10px;
  padding: 20px;
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
