import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  CheckboxGroup,
  Heading,
  Input,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Anchor } from "../../../components/Anchor";
import { Checkbox } from "../../../components/Checkbox";
import { Radio } from "../../../components/Radio";
import { objectToKeyToKeyMap } from "../../../utils/objectToKeyToKeyMap";
import { WithInfoIconAndTooltip } from "./InfoIconTooltip";
import { CommandModal } from "./CommandModal";

// TODO: Make use of Option when adding CIF
/*
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
  tailwindCss: {
    key: "tailwindCss",
    value: "tailwind-css",
    label: "Tailwind CSS",
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
  optionKeys.tailwindCss,
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

type TechnologiesFormData = {
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
const defaultFormData: TechnologiesFormData = {
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

const categoryLabels = {
  projectName: "Project Name",
  packageManager: "Package Manager",
  styling: "Styling",
  formStateManagement: "Form State Management",
  language: "Language",
  formatting: "Formatting",
  componentLibraries: "Component Libraries",
  animation: "Animation",
  continuousIntegration: "Continuous Integration",
  miscellaneous: "Miscellaneous",
};

export const TechnologiesForm: React.FC = () => {
  const { register, control, setValue, getValues, watch, handleSubmit } =
    useForm<TechnologiesFormData>({
      defaultValues: defaultFormData,
    });

  const stylingMethod = watch("stylingMethod");

  const [isCommandModalShow, setIsModalShown] = React.useState(false);
  const [command, setCommand] = React.useState("");

  const handleSuccessfulSubmit: SubmitHandler<TechnologiesFormData> = (
    formData
  ) => {
    const calculateCommand = (formData: TechnologiesFormData) => {
      const args = ["npx", "create-next-stack@0.1.6"];

      args.push(`--package-manager=${options[formData.packageManager].value}`);
      args.push(`--styling=${options[formData.stylingMethod].value}`);

      const pushArgs = (selectedOptionKeys: Array<keyof typeof options>) => {
        selectedOptionKeys.forEach((optionKey) => {
          args.push(`--${options[optionKey].value}`);
        });
      };
      pushArgs(formData.formStateManagement);
      pushArgs(formData.formatting);
      pushArgs(formData.componentLibraries);
      pushArgs(formData.animationLibraries);
      pushArgs(formData.continuousIntegrations);
      pushArgs(formData.miscellaneousOptions);

      args.push(formData.projectName);

      return args.join(" ");
    };

    setCommand(calculateCommand(formData));
    setIsModalShown(true);
  };

  return (
    <>
      <CommandModal
        isOpen={isCommandModalShow}
        command={command}
        onClose={() => {
          setIsModalShown(false);
        }}
      />
      <form onSubmit={handleSubmit(handleSuccessfulSubmit)}>
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
                  {categoryLabels.projectName}
                </Heading>
                <Input
                  {...register(formDataKeys.projectName, {
                    pattern: /^[a-z0-9-]+$/,
                  })}
                />
              </Stack>
              <Stack spacing="4">
                <Heading as="h3" size="md">
                  {categoryLabels.packageManager}
                </Heading>
                <Controller
                  name={formDataKeys.packageManager}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <RadioGroup {...rest}>
                      <Stack spacing="3">
                        {packageManagers.map((packageManager) => (
                          <Radio key={packageManager} value={packageManager}>
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
                  {categoryLabels.styling}
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
                            value={stylingMethod}
                            onChange={(e) => {
                              if (e.target.value !== optionKeys.emotion) {
                                setValue(
                                  "componentLibraries",
                                  getValues("componentLibraries").filter(
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
                  {categoryLabels.formStateManagement}
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
                <Heading
                  as="h3"
                  size="md"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  {categoryLabels.language}
                </Heading>
                <RadioGroup value="TypeScript">
                  <Stack spacing="3">
                    <Radio value="TypeScript">TypeScript</Radio>
                    <Radio value="JavaScript" isDisabled>
                      <WithInfoIconAndTooltip tooltip="JavaScript is currently not supported.">
                        JavaScript
                      </WithInfoIconAndTooltip>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Stack>

              <Stack spacing="4">
                <Heading as="h3" size="md">
                  {categoryLabels.formatting}
                </Heading>
                <Controller
                  name={formDataKeys.formatting}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      <Stack spacing="3">
                        <Checkbox
                          value={optionKeys.prettier}
                          onChange={(e) => {
                            if (
                              !e.target.checked &&
                              getValues("miscellaneousOptions").includes(
                                optionKeys.formattingPreCommitHook
                              )
                            ) {
                              setValue(
                                "miscellaneousOptions",
                                getValues("miscellaneousOptions").filter(
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
                  {categoryLabels.componentLibraries}
                </Heading>
                <Controller
                  name={formDataKeys.componentLibraries}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      <Stack spacing="3">
                        <Checkbox
                          value={optionKeys.chakra}
                          isDisabled={stylingMethod !== optionKeys.emotion}
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (
                                !getValues("animationLibraries").includes(
                                  optionKeys.framerMotion
                                )
                              ) {
                                setValue("animationLibraries", [
                                  ...getValues("animationLibraries"),
                                  optionKeys.framerMotion,
                                ]);
                              }
                            }
                          }}
                        >
                          {stylingMethod === optionKeys.emotion ? (
                            options[optionKeys.chakra].label
                          ) : (
                            <WithInfoIconAndTooltip
                              tooltip={`${
                                options[optionKeys.chakra].label
                              } requires ${
                                options[optionKeys.emotion].label
                              }. Select it under ${categoryLabels.styling}.`}
                            >
                              {options[optionKeys.chakra].label}
                            </WithInfoIconAndTooltip>
                          )}
                        </Checkbox>
                        <Checkbox value={optionKeys.materialUi}>
                          {options[optionKeys.materialUi].label}
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  )}
                />
              </Stack>

              <Stack spacing="4">
                <Heading as="h3" size="md">
                  {categoryLabels.animation}
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
                  {categoryLabels.continuousIntegration}
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
                  {categoryLabels.miscellaneous}
                </Heading>
                <Controller
                  name={formDataKeys.miscellaneousOptions}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      <Stack spacing="3">
                        <Checkbox
                          value={optionKeys.formattingPreCommitHook}
                          onChange={(e) => {
                            if (
                              e.target.checked &&
                              !getValues("formatting").includes(
                                optionKeys.prettier
                              )
                            ) {
                              setValue("formatting", [
                                ...getValues("formatting"),
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

          <Stack direction={"row"} justifyContent={["left", "center"]}>
            <Button type="submit" colorScheme={"purple"}>
              Create Next Stack
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
    </>
  );
};
