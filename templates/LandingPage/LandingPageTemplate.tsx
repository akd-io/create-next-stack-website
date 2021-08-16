import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Code,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
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

/*
// TODO: Make use of Option when adding CIF
type Option = {
  key: string;
  label: string;
};
*/

// TODO: Strengthen types using a constrained identity function
const options = {
  yarn: { key: "yarn", value: "yarn", label: "Yarn" },
  npm: { key: "npm", value: "npm", label: "npm" },
  emotion: { key: "emotion", value: "emotion", label: "Emotion" },
  styledComponents: {
    key: "styledComponents",
    value: "styled-components",
    label: "Styled Components",
  },
  cssModules: {
    key: "cssModules",
    value: "css-modules",
    label: "CSS Modules",
  },
  cssModulesWithSass: {
    key: "cssModulesWithSass",
    value: "css-modules-with-sass",
    label: "CSS Modules with Sass",
  },
  reactHookForm: {
    key: "reactHookForm",
    value: "react-hook-form",
    label: "React Hook Form",
  },
  formik: { key: "formik", value: "formik", label: "Formik" },
  prettier: { key: "prettier", value: "prettier", label: "Prettier" },
  chakra: { key: "chakra", value: "chakra", label: "Chakra UI" },
  framerMotion: {
    key: "framerMotion",
    value: "framer-motion",
    label: "Framer Motion",
  },
  githubActions: {
    key: "githubActions",
    value: "github-actions",
    label: "GitHub Actions",
  },
  formattingPreCommitHook: {
    key: "formattingPreCommitHook",
    value: "formatting-pre-commit-hook",
    label: "Formatting Pre-Commit Hook",
  },
} as const;
const optionKeys = objectToKeyToKeyMap(options);

const packageManagers = arrayToKeyToKeyMap([optionKeys.yarn, optionKeys.npm]);
const stylingMethods = arrayToKeyToKeyMap([
  optionKeys.emotion,
  optionKeys.styledComponents,
  optionKeys.cssModules,
  optionKeys.cssModulesWithSass,
]);
const formStateManagementLibraries = arrayToKeyToKeyMap([
  optionKeys.reactHookForm,
  optionKeys.formik,
]);
const formattingLibraries = arrayToKeyToKeyMap([optionKeys.prettier]);
const componentLibraries = arrayToKeyToKeyMap([optionKeys.chakra]);
const animationLibraries = arrayToKeyToKeyMap([optionKeys.framerMotion]);
const continuousIntegrations = arrayToKeyToKeyMap([optionKeys.githubActions]);
const miscellaneousOptions = arrayToKeyToKeyMap([
  optionKeys.formattingPreCommitHook,
]);

type FormData = {
  packageManager: keyof typeof packageManagers;
  stylingMethod: keyof typeof stylingMethods;
  formStateManagement: Array<keyof typeof formStateManagementLibraries>;
  formatting: Array<keyof typeof formattingLibraries>;
  componentLibraries: Array<keyof typeof componentLibraries>;
  animationLibraries: Array<keyof typeof animationLibraries>;
  continuousIntegrations: Array<keyof typeof continuousIntegrations>;
  miscellaneousOptions: Array<keyof typeof miscellaneousOptions>;
};
const defaultFormData: FormData = {
  packageManager: optionKeys.yarn,
  stylingMethod: optionKeys.emotion,
  formStateManagement: [optionKeys.reactHookForm],
  formatting: [optionKeys.prettier],
  componentLibraries: [optionKeys.chakra],
  animationLibraries: [optionKeys.framerMotion],
  continuousIntegrations: [optionKeys.githubActions],
  miscellaneousOptions: [optionKeys.formattingPreCommitHook],
};
const formDataKeys = objectToKeyToKeyMap(defaultFormData);

const LandingPageTemplate = () => {
  const { control, watch } = useForm<FormData>({
    defaultValues: defaultFormData,
  });

  const [output, setOutput] = useState<string>("");

  const formData = watch();

  const updateCommand: SubmitHandler<FormData> = useCallback((formData) => {
    const args = ["npx", "create-next-stack@0.1.4"];

    // Package manager
    args.push(`--package-manager=${options[formData.packageManager].value}`);

    // Styling method
    args.push(`--styling=${options[formData.stylingMethod].value}`);

    // Form State Management
    if (formData.formStateManagement.includes(optionKeys.reactHookForm)) {
      args.push("--react-hook-form");
    }
    if (formData.formStateManagement.includes(optionKeys.formik)) {
      args.push("--formik");
    }

    // Formatting
    if (formData.formatting.includes(optionKeys.prettier)) {
      args.push("--prettier");
    }

    // Component Libraries
    if (formData.componentLibraries.includes(optionKeys.chakra)) {
      args.push("--chakra");
    }

    // Animation Libraries
    if (formData.animationLibraries.includes(optionKeys.framerMotion)) {
      args.push("--framer-motion");
    }

    // Continuous Integrations
    if (formData.continuousIntegrations.includes(optionKeys.githubActions)) {
      args.push("--github-actions");
    }

    // Miscellaneous Options
    if (
      formData.miscellaneousOptions.includes(optionKeys.formattingPreCommitHook)
    ) {
      args.push("--formatting-pre-commit-hook");
    }

    setOutput(args.join(" "));
  }, []);

  useEffect(() => {
    updateCommand(formData);
  }, [updateCommand, formData]);

  const handleCopyClick = useCallback(async () => {
    await navigator.clipboard.writeText(output);
    // TODO: Add a success popup
  }, [output]);

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
              <form>
                <Heading as="h2" size="lg" marginBottom="6">
                  Pick your technologies
                </Heading>

                <Stack
                  spacing={["8", "8", "16"]}
                  direction={["column", "column", "row"]}
                >
                  <Stack spacing="8" flexBasis="100%">
                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Package manager
                      </Heading>
                      <Controller
                        name={formDataKeys.packageManager}
                        control={control}
                        render={({ field: { ref, ...restField } }) => (
                          <RadioGroup {...restField}>
                            <Stack direction="column">
                              {Object.entries(packageManagers).map(
                                ([_, packageManager]) => (
                                  <Radio
                                    key={packageManager}
                                    id={`radio-${packageManager}`}
                                    value={packageManager}
                                  >
                                    {options[packageManager].label}
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
                              {Object.entries(stylingMethods).map(
                                ([_, stylingMethod]) => (
                                  <Radio
                                    key={stylingMethod}
                                    id={`radio-${stylingMethod}`}
                                    value={stylingMethod}
                                  >
                                    {options[stylingMethod].label}
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
                              {Object.entries(formStateManagementLibraries).map(
                                ([_, formStateManagementLibrary]) => (
                                  <Checkbox
                                    key={formStateManagementLibrary}
                                    id={`radio-${formStateManagementLibrary}`}
                                    value={formStateManagementLibrary}
                                  >
                                    {options[formStateManagementLibrary].label}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>
                  </Stack>

                  <Stack spacing="8" flexBasis="100%">
                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Formatting
                      </Heading>
                      <Controller
                        name={formDataKeys.formatting}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.entries(formattingLibraries).map(
                                ([_, formattingLibrary]) => (
                                  <Checkbox
                                    key={formattingLibrary}
                                    id={`radio-${formattingLibrary}`}
                                    value={formattingLibrary}
                                  >
                                    {options[formattingLibrary].label}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Component libraries
                      </Heading>
                      <Controller
                        name={formDataKeys.componentLibraries}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.entries(componentLibraries).map(
                                ([_, componentLibrary]) => (
                                  <Checkbox
                                    key={componentLibrary}
                                    id={`radio-${componentLibrary}`}
                                    value={componentLibrary}
                                  >
                                    {options[componentLibrary].label}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Animation
                      </Heading>
                      <Controller
                        name={formDataKeys.animationLibraries}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.entries(animationLibraries).map(
                                ([_, animationLibrary]) => (
                                  <Checkbox
                                    key={animationLibrary}
                                    id={`radio-${animationLibrary}`}
                                    value={animationLibrary}
                                  >
                                    {options[animationLibrary].label}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Continuous integration
                      </Heading>
                      <Controller
                        name={formDataKeys.continuousIntegrations}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.entries(continuousIntegrations).map(
                                ([_, continuousIntegration]) => (
                                  <Checkbox
                                    key={continuousIntegration}
                                    id={`radio-${continuousIntegration}`}
                                    value={continuousIntegration}
                                  >
                                    {options[continuousIntegration].label}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Miscellaneous
                      </Heading>
                      <Controller
                        name={formDataKeys.miscellaneousOptions}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.entries(miscellaneousOptions).map(
                                ([_, miscellaneousOption]) => (
                                  <Checkbox
                                    key={miscellaneousOption}
                                    id={`radio-${miscellaneousOption}`}
                                    value={miscellaneousOption}
                                  >
                                    {options[miscellaneousOption].label}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack marginTop="16">
                  {output !== "" ? (
                    <>
                      <Heading as="h2" size="lg">
                        Command
                      </Heading>
                      <Text>
                        Run the following command in your preferred directory:
                      </Text>
                      <Stack>
                        <Code padding="4">{output}</Code>
                      </Stack>
                      <Button type="button" onClick={handleCopyClick}>
                        Copy
                      </Button>
                    </>
                  ) : null}
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
