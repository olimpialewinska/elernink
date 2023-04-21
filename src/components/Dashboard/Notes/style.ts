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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  padding: 20px;
`;

export const Filterbar = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const AddButton = styled.div`
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const FilterIcon = styled.div`
  height: 20px;
  width: 20px;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
`;

export const Button = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  flex: 1;
`;
