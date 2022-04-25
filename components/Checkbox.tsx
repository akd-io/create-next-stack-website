import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import { FC, ComponentProps } from "react";

export const Checkbox: FC<ComponentProps<typeof ChakraCheckbox>> = (props) => {
  return <ChakraCheckbox size="md" colorScheme="purple" {...props} />;
};
