import styled, { keyframes } from "styled-components";

const progressAnimation = keyframes`
  0% {
    width: 0%;
    background-color: #f9bcca;
  }
  100% {
    width: 85%;
    background-color: #ef476f;
  }
`;

const Container = styled.div`
  .progress2 {
    padding: 6px;
    border-radius: 30px;
    background: rgba(0, 0, 0, 0.25);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
      0 1px rgba(255, 255, 255, 0.08);
  }

  .progress-bar2 {
    height: 18px;
    border-radius: 30px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05)
    );
    transition: 0.4s linear;
    transition-property: width, background-color;
  }

  .progress-moved .progress-bar2 {
    width: 85%;
    background-color: #ef476f;
    animation: ${progressAnimation} 6s;
  }
`;
