import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import BadlyTypedGitHubButton from "react-github-btn";
import { GitHubButtonProps } from "github-buttons";
import { Section } from "../../../components/Section";

const GitHubButton = BadlyTypedGitHubButton as unknown as React.FC<
  GitHubButtonProps & {
    children?: React.ReactNode;
  }
>;

export const Header = () => {
  return (
    <Section as="header">
      <Stack align={["left", "center"]} spacing="6">
        <Stack align={["left", "center"]} spacing="1">
          <Heading
            as="h1"
            size="3xl"
            bgGradient="linear(to-tr, brand.600, brand.400)"
            bgClip="text"
            textAlign={["left", "center"]}
            fontWeight="800"
          >
            Create Next Stack
          </Heading>
          <Text
            fontSize="1.25em"
            fontWeight="bold"
            bgGradient="linear(to-tr, brand.600, brand.400)"
            bgClip="text"
            textAlign={["left", "center"]}
          >
            The ultimate starter kit for Next.js
          </Text>
        </Stack>

        <GitHubButton
          href="https://github.com/akd-io/create-next-stack"
          data-size="large"
          data-show-count="true"
          aria-label="Star Create Next Stack on GitHub"
        >
          Star
        </GitHubButton>
      </Stack>
    </Section>
  );
};
