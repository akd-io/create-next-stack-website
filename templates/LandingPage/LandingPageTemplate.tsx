import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
              >
                Create Next Stack
              </Heading>
              <Text
                fontSize="21"
                fontWeight="bold"
                bgGradient="linear(to-bl, #ED88FD, #5B45E4)"
                bgClip="text"
              >
                The ultimate starter kit for Next.js
              </Text>
            </Stack>

            {/* TODO: Insert social icons */}

            <Stack maxWidth="600" spacing="4">
              <Text>
                <b>Create Next Stack</b> is a website and interactive CLI tool
                used to easily set up the boilerplate of new{" "}
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
              <form onSubmit={handleSubmit(handleValidSubmit)}>
                <Heading as="h2" marginBottom="6">
                  Pick your technologies
                </Heading>
                <Stack spacing="8">
                  <Stack spacing="4">
                    <Heading as="h3" size="md">
                      Package manager
                    </Heading>
                    <Controller
                      name={formDataKeys.packageManager}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field}>
                          <Stack direction="column">
                            {Object.keys(packageManagers).map(
                              (packageManager) => (
                                <Radio
                                  key={packageManager}
                                  id={`radio-${packageManager}`}
                                  value={packageManager}
                                >
                                  {packageManager}
                                </Radio>
                              )
                            )}
                          </Stack>
                        </RadioGroup>
                      )}
                    />
                  </Stack>

                  <Stack spacing="4">
                    <Heading as="h3" size="md">
                      Styling method
                    </Heading>
                    <Controller
                      name={formDataKeys.stylingMethod}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field}>
                          <Stack direction="column">
                            {Object.keys(stylingMethods).map(
                              (stylingMethod) => (
                                <Radio
                                  key={stylingMethod}
                                  id={`radio-${stylingMethod}`}
                                  value={stylingMethod}
                                >
                                  {stylingMethod}
                                </Radio>
                              )
                            )}
                          </Stack>
                        </RadioGroup>
                      )}
                    />
                  </Stack>

                  <Stack spacing="4">
                    <Heading as="h3" size="md">
                      Form state management
                    </Heading>
                    <Controller
                      name={formDataKeys.formStateManagement}
                      control={control}
                      render={({ field }) => (
                        <CheckboxGroup {...field}>
                          <Stack direction="column">
                            {Object.keys(formStateManagementLibraries).map(
                              (formStateManagementLibrary) => (
                                <Checkbox
                                  key={formStateManagementLibrary}
                                  id={`radio-${formStateManagementLibrary}`}
                                  value={formStateManagementLibrary}
                                >
                                  {formStateManagementLibrary}
                                </Checkbox>
                              )
                            )}
                          </Stack>
                        </CheckboxGroup>
                      )}
                    />
                  </Stack>
                  <Stack align="center">
                    <Button type="submit" size="lg">
                      Create Next Stack
                    </Button>
                  </Stack>
                </Stack>
              </form>
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
