import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 160px;
  height: 160px;
`;

export const animation = keyframes`
0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 0;
        }
        4.9% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 0;
        }
        5% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
        }
        100% {
        top: -1px;
        left: -1px;
        width: 82px;
        height: 82px;
        opacity: 0;
        }`;

export const Div = styled.div`
  position: absolute;
  border: 6px solid #cdaae9;
  opacity: 1;
  border-radius: 50%;
  animation: ${animation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

export const Div2 = styled.div`
  animation-delay: -0.5s;
`;
