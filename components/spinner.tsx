import { FcSynchronize } from "react-icons/fc";
import styled from "styled-components";

const StyledSpinner = styled.span<{ fontSize?: number }>`
  display: inline-block;
  vertical-align: middle;
  font-size: ${(props) => props.fontSize + "px"};
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

export default function Spinner(props: { fontSize?: number }) {
  return (
    <StyledSpinner fontSize={props.fontSize}>
      <FcSynchronize />
    </StyledSpinner>
  );
}
