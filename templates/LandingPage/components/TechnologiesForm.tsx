import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox as ChakraCheckbox,
  CheckboxGroup,
  Code,
  Heading,
  Input,
  Radio as ChakraRadio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Anchor } from "../../../components/Anchor";
import { objectToKeyToKeyMap } from "../../../utils/objectToKeyToKeyMap";

const Checkbox: FC<ComponentProps<typeof ChakraCheckbox>> = (props) => {
  return <ChakraCheckbox size="md" colorScheme="purple" {...props} />;
};

const Radio: FC<ComponentProps<typeof ChakraRadio>> = (props) => {
  return <ChakraRadio size="md" colorScheme="purple" {...props} />;
};

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
  materialUi: { key: "materialUi", value: "material-ui", label: "Material UI" },
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

const packageManagers = [optionKeys.yarn, optionKeys.npm];
const stylingMethods = [
  optionKeys.emotion,
  optionKeys.styledComponents,
  optionKeys.cssModules,
  optionKeys.cssModulesWithSass,
];
const formStateManagementLibraries = [
  optionKeys.reactHookForm,
  optionKeys.formik,
];
const formattingLibraries = [optionKeys.prettier];
const componentLibraries = [optionKeys.chakra, optionKeys.materialUi];
const animationLibraries = [optionKeys.framerMotion];
const continuousIntegrations = [optionKeys.githubActions];
const miscellaneousOptions = [optionKeys.formattingPreCommitHook];

type FormData = {
  projectName: string;
  packageManager: typeof packageManagers[number];
  stylingMethod: typeof stylingMethods[number];
  formStateManagement: Array<typeof formStateManagementLibraries[number]>;
  formatting: Array<typeof formattingLibraries[number]>;
  componentLibraries: Array<typeof componentLibraries[number]>;
  animationLibraries: Array<typeof animationLibraries[number]>;
  continuousIntegrations: Array<typeof continuousIntegrations[number]>;
  miscellaneousOptions: Array<typeof miscellaneousOptions[number]>;
};
const defaultFormData: FormData = {
  projectName: "my-app",
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

export const TechnologiesForm: React.FC = () => {
  const { register, control, watch, setValue } = useForm<FormData>({
    defaultValues: defaultFormData,
  });
  const formData = watch();

  const [output, setOutput] = useState<string>("");

  const updateCommand: SubmitHandler<FormData> = useCallback((formData) => {
    const args = ["npx", "create-next-stack@0.1.5"];

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
    if (formData.componentLibraries.includes(optionKeys.materialUi)) {
      args.push("--material-ui");
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

    args.push(formData.projectName);

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
    <form>
      <Heading as="h2" size="lg" marginBottom="6">
        Pick your technologies
      </Heading>

      <Stack spacing="16">
        <Stack
          spacing={["8", "8", "16"]}
          direction={["column", "column", "row"]}
        >
          <Stack spacing="8" flexBasis="100%">
            <Stack spacing="4">
              <Heading as="h3" size="md">
                Project name
              </Heading>
              <Input
                {...register(formDataKeys.projectName, {
                  pattern: /^[a-z0-9-]+$/,
                })}
              />
            </Stack>
            <Stack spacing="4">
              <Heading as="h3" size="md">
                Package manager
              </Heading>
              <Controller
                name={formDataKeys.packageManager}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <RadioGroup {...rest}>
                    <Stack spacing="3">
                      {packageManagers.map((packageManager) => (
                        <Radio
                          key={packageManager}
                          id={`radio-${packageManager}`}
                          value={packageManager}
                        >
                          {options[packageManager].label}
                        </Radio>
                      ))}
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
                render={({ field: { ref, ...rest } }) => (
                  <RadioGroup {...rest}>
                    <Stack spacing="3">
                      {stylingMethods.map((stylingMethod) => (
                        <Radio
                          key={stylingMethod}
                          id={`radio-${stylingMethod}`}
                          value={stylingMethod}
                          onChange={(e) => {
                            if (e.target.value !== optionKeys.emotion) {
                              setValue(
                                "componentLibraries",
                                formData.componentLibraries.filter(
                                  (value) => value !== optionKeys.chakra
                                )
                              );
                            }
                          }}
                        >
                          {options[stylingMethod].label}
                        </Radio>
                      ))}
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
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack spacing="3">
                      {formStateManagementLibraries.map(
                        (formStateManagementLibrary) => (
                          <Checkbox
                            key={formStateManagementLibrary}
                            id={`checkbox-${formStateManagementLibrary}`}
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
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack spacing="3">
                      <Checkbox
                        id={`checkbox-${optionKeys.prettier}`}
                        value={optionKeys.prettier}
                        onChange={(e) => {
                          if (
                            !e.target.checked &&
                            formData.miscellaneousOptions.includes(
                              optionKeys.formattingPreCommitHook
                            )
                          ) {
                            setValue(
                              "miscellaneousOptions",
                              formData.miscellaneousOptions.filter(
                                (miscellaneousOption) =>
                                  miscellaneousOption !==
                                  optionKeys.formattingPreCommitHook
                              )
                            );
                          }
                        }}
                      >
                        {options[optionKeys.prettier].label}
                      </Checkbox>
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
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack spacing="3">
                      <Checkbox
                        id={`checkbox-${optionKeys.chakra}`}
                        value={optionKeys.chakra}
                        isDisabled={
                          formData.stylingMethod !== optionKeys.emotion
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (
                              !formData.animationLibraries.includes(
                                optionKeys.framerMotion
                              )
                            ) {
                              setValue("animationLibraries", [
                                ...formData.animationLibraries,
                                optionKeys.framerMotion,
                              ]);
                            }
                          }
                        }}
                      >
                        {options[optionKeys.chakra].label}
                      </Checkbox>
                      <Checkbox
                        id={`checkbox-${optionKeys.materialUi}`}
                        value={optionKeys.materialUi}
                      >
                        {options[optionKeys.materialUi].label}
                      </Checkbox>
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
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack spacing="3">
                      {animationLibraries.map((animationLibrary) => (
                        <Checkbox
                          key={animationLibrary}
                          id={`checkbox-${animationLibrary}`}
                          value={animationLibrary}
                        >
                          {options[animationLibrary].label}
                        </Checkbox>
                      ))}
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
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack spacing="3">
                      {continuousIntegrations.map((continuousIntegration) => (
                        <Checkbox
                          key={continuousIntegration}
                          id={`checkbox-${continuousIntegration}`}
                          value={continuousIntegration}
                        >
                          {options[continuousIntegration].label}
                        </Checkbox>
                      ))}
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
                render={({ field: { ref, ...rest } }) => (
                  <CheckboxGroup {...rest}>
                    <Stack spacing="3">
                      <Checkbox
                        id={`checkbox-${optionKeys.formattingPreCommitHook}`}
                        value={optionKeys.formattingPreCommitHook}
                        onChange={(e) => {
                          if (
                            e.target.checked &&
                            !formData.formatting.includes(optionKeys.prettier)
                          ) {
                            setValue("formatting", [
                              ...formData.formatting,
                              optionKeys.prettier,
                            ]);
                          }
                        }}
                      >
                        {options[optionKeys.formattingPreCommitHook].label}
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>
                )}
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Heading as="h2" size="lg">
            Command
          </Heading>
          <Text>Run the following command in your preferred directory:</Text>
          <Stack>
            <Code padding="4">{output}</Code>
          </Stack>
          <Button type="button" onClick={handleCopyClick}>
            Copy
          </Button>
        </Stack>
        <Text align={["left", "center"]}>
          Missing your favorite technology or encountering a bug? <br />
          <Anchor
            href="https://github.com/akd-io/create-next-stack/issues"
            isExternal
          >
            Open an issue on GitHub <ExternalLinkIcon mx="2px" />
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
};
