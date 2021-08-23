import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import GitHubButton from "react-github-btn";
import { Section } from "../../components/Section";
import { DescriptionSection } from "./components/DescriptionSection";
import { Footer } from "./components/Footer";
import { TechnologiesForm } from "./components/TechnologiesForm";

const globalStyles = css`
  body {
    background-color: #eee;
  }
`;

const LandingPageTemplate = () => {
  return (
    <>
      <Global styles={globalStyles} />

      <Stack spacing="16" align="center" py="16">
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

        <Stack as="main" spacing="16" align="center" width="100%">
          <DescriptionSection />

          <Section>
            <Box
              width="100%"
              borderRadius={[30, 50]}
              padding={[30, 50, 70]}
              background="white"
              boxShadow="0 10px 50px rgba(0,0,0,0.1)"
            >
              <TechnologiesForm />
            </Box>
          </Section>
        </Stack>

        <Footer />
      </Stack>
    </>
  );
};

export default LandingPageTemplate;
