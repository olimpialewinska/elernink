import { keyframes } from "styled-components";
import styled from "styled-components";

export const NotificationWrapper = styled.div`
  width: 360px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff9994;
  border-radius: 16px;
  position: fixed;
  top: 15px;
  left: calc(50% - 180px);
  transform: translateY(-200%);
  animation: noti 3s infinite forwards alternate ease-in;
`;

export const NotificationTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const noti = keyframes`
    50% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(0);
    }
`;
