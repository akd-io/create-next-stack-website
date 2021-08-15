import { Box, Stack } from "@chakra-ui/react";
import { ComponentProps, FC } from "react";

type SectionProps = ComponentProps<typeof Stack> & {
  boxProps?: ComponentProps<typeof Box>;
};
export const Section: FC<SectionProps> = ({ boxProps, children, ...props }) => {
  return (
    <Stack padding="50px 30px" alignItems="center" as="section" {...props}>
      <Box width="100%" maxWidth="800" {...boxProps}>
        {children}
      </Box>
    </Stack>
  );
};
