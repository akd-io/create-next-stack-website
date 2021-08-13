import styled from "@emotion/styled";
import { ComponentProps, FC } from "react";

const StyledSection = styled.section`
  padding: 50px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

const ContentContainer = styled.div`
  max-width: 800px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section: FC<ComponentProps<"section">> = ({
  children,
  ...props
}) => {
  return (
    <StyledSection {...props}>
      <ContentContainer>{children}</ContentContainer>
    </StyledSection>
  );
};
