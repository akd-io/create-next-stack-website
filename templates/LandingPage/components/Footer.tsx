import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Anchor } from "../../../components/Anchor";
import { Section } from "../../../components/Section";

export const Footer: React.FC = () => {
  return (
    <Section
      as="footer"
      boxProps={{
        alignItems: "left",
      }}
    >
      <Text align={["left", "center"]}>
        Created by{" "}
        <Anchor href="https://akd.io/" isExternal>
          Anders Damgaard
        </Anchor>{" "}
        <Box as="span" whiteSpace="nowrap">
          &ndash;{" "}
          <Anchor href="https://twitter.com/akd_io" isExternal>
            @akd_io
          </Anchor>
        </Box>
      </Text>
    </Section>
  );
};
