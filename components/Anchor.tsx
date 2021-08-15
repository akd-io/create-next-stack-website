import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ComponentProps, FC } from "react";

const StyledText = styled(Text)`
  color: #319bff;

  :hover {
    text-decoration: underline;
  }
`;

export const Anchor: FC<ComponentProps<typeof Text>> = (props) => {
  return <StyledText as="a" {...props} />;
};
