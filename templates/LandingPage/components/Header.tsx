import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Section } from "../../../components/Section";
import {
  faDiscord,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

        <Flex direction="row" alignItems="center" gap="10px">
          <a
            aria-label="GitHub Repository of Create Next Stack"
            href="https://github.com/akd-io/create-next-stack"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            aria-label="Community Discord"
            href="https://discord.gg/7Ns5WwGjjZ"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a
            aria-label="Twitter profile of the creator of Create Next Stack"
            href="https://twitter.com/akd_io"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </Flex>
      </Stack>
    </Section>
  );
};
