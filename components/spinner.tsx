import { FcSynchronize } from "react-icons/fc";
import styled from "styled-components";

const StyledSpinner = styled.span`
  display: inline-block;
  vertical-align: middle;
  svg {
    animation: rotation 2s linear infinite;
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
  }
`;

export default function Spinner() {
  return (
    <StyledSpinner>
      <FcSynchronize />
    </StyledSpinner>
  );
}
