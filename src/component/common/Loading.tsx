import { Spinner } from "@chakra-ui/react";
import styled from "styled-components";

const LoadingBox = styled.div<{ height: string | undefined }>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading({ height }) {
  return (
    <LoadingBox height={height}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </LoadingBox>
  );
}

export default Loading;
