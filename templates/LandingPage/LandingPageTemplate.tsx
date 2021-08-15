import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Anchor } from "../../components/Anchor";
import { Section } from "../../components/Section";
import { arrayToKeyToKeyMap } from "../../utils/arrayToKeyToKeyMap";
import { objectToKeyToKeyMap } from "../../utils/objectToKeyToKeyMap";

const globalStyles = css`
  body {
    background-color: #eee;
  }
`;

const packageManagers = arrayToKeyToKeyMap(["yarn", "npm"]);
const stylingMethods = arrayToKeyToKeyMap([
  "emotion",
  "styled-components",
  "css-modules",
  "css-modules-with-sass",
]);
const formStateManagementLibraries = arrayToKeyToKeyMap([
  "react-hook-form",
  "formik",
]);

type FormData = {
  packageManager: keyof typeof packageManagers;
  stylingMethod: keyof typeof stylingMethods;
  formStateManagement: Array<keyof typeof formStateManagementLibraries>;
};
const defaultFormData: FormData = {
  packageManager: "yarn",
  stylingMethod: "emotion",
  formStateManagement: ["react-hook-form"],
};
const formDataKeys = objectToKeyToKeyMap(defaultFormData);

const LandingPageTemplate = () => {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultFormData,
  });

  const handleValidSubmit: SubmitHandler<FormData> = useCallback((formData) => {
    // TODO: Implement
    alert(JSON.stringify(formData, null, 2));
  }, []);

  return (
    <>
      <Global styles={globalStyles} />
      <main>
        <Section>
          <Stack spacing="16" align="center">
            <Stack align="center" spacing="1">
              <Heading
                as="h1"
                size="3xl"
                bgGradient="linear(to-bl, #ED88FD, #5B45E4)"
                bgClip="text"
                textAlign="center"
                fontWeight="800"
              >
                Create Next Stack
              </Heading>
              <Text
                fontSize="1.25em"
                fontWeight="bold"
                bgGradient="linear(to-bl, #ED88FD, #5B45E4)"
                bgClip="text"
                textAlign="center"
              >
                The ultimate starter kit for Next.js
              </Text>
            </Stack>

            {/* TODO: Insert social icons */}

            <Stack maxWidth="600" spacing="4">
              <Text>
                <b>Create Next Stack</b> is a website and CLI tool used to
                easily set up the boilerplate of new{" "}
                <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
                  Next.js
                </Anchor>{" "}
                apps.
              </Text>
              <Text>
                Where{" "}
                <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
                  Create Next App
                </Anchor>{" "}
                lets you choose a single template only, Create Next Stack lets
                you pick and choose an array of technologies often used
                alongside Next.js, and free you of the pain of making them work
                together.
              </Text>
            </Stack>

            <Box
              width="100%"
              borderRadius="50"
              padding="70"
              background="white"
              boxShadow="0 10px 50px rgba(0,0,0,0.1)"
            >
              <Stack spacing="4">
                <Heading as="h2" size="lg">
                  Setup form coming soon
                </Heading>
                <Text>
                  Until the new setup form is here, install Node.js and run the
                  following command to use the interactive CLI tool directly:
                </Text>
                <Text>
                  <UnorderedList paddingLeft="2">
                    <ListItem>
                      <code
                        css={css`
                          white-space: nowrap;
                        `}
                      >
                        npx create-next-stack
                      </code>
                    </ListItem>
                  </UnorderedList>
                </Text>
                <Text>
                  You can also find more information on the following GitHub
                  repositories:
                </Text>
                <Text>
                  <UnorderedList paddingLeft="2">
                    <ListItem>
                      CLI:{" "}
                      <Anchor href="https://github.com/akd-io/create-next-stack">
                        create-next-stack
                      </Anchor>{" "}
                    </ListItem>
                    <ListItem>
                      Website:{" "}
                      <Anchor href="https://github.com/akd-io/create-next-stack-website">
                        create-next-stack-website
                      </Anchor>
                    </ListItem>
                  </UnorderedList>
                </Text>
              </Stack>
            </Box>

            <Text>
              Created by{" "}
              <Anchor href="https://twitter.com/akd_io">@akd_io</Anchor>
            </Text>
          </Stack>
        </Section>
      </main>
    </>
  );
};

export default LandingPageTemplate;
