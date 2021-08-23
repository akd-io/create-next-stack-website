import { Box, Stack } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { Section } from "../../components/Section";
import { DescriptionSection } from "./components/DescriptionSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
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
        <Header />

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
