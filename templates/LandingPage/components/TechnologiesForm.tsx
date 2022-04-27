import { ExternalLinkIcon } from "@chakra-ui/icons"
import {
  Button,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Anchor } from "../../../components/Anchor"
import { Checkbox } from "../../../components/Checkbox"
import { Radio } from "../../../components/Radio"
import { capitalizeFirstCharacter } from "../../../utils/capitalizeFirstCharacter"
import { objectToKeyToKeyMap } from "../../../utils/objectToKeyToKeyMap"
import { validateProjectName } from "../../../utils/validateProjectName"
import { CommandModal } from "./CommandModal"
import { WithInfoIconAndTooltip } from "./InfoIconTooltip"

// TODO: Make use of Option when adding CIF
/*
type Option = {
  key: string;
  label: string;
};
*/

const cssModulesValue = "css-modules"

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
    value: cssModulesValue,
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
  noStyling: {
    key: "noStyling",
    value: cssModulesValue,
    label: "None",
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
} as const
const optionKeys = objectToKeyToKeyMap(options)

const packageManagerOptionKeys = [optionKeys.yarn, optionKeys.npm]
const stylingOptionKeys = [
  optionKeys.emotion,
  optionKeys.styledComponents,
  optionKeys.tailwindCss,
  optionKeys.cssModules,
  optionKeys.cssModulesWithSass,
  optionKeys.noStyling,
]
const formStateManagementOptionKeys = [
  optionKeys.reactHookForm,
  optionKeys.formik,
]
const formattingOptionKeys = [
  optionKeys.prettier,
  optionKeys.formattingPreCommitHook,
]
const componentLibraryOptionKeys = [optionKeys.chakra, optionKeys.materialUi]
const animationOptionKeys = [optionKeys.framerMotion]
const continuousIntegrationOptionKeys = [optionKeys.githubActions]

type TechnologiesFormData = {
  projectName: string
  packageManager: typeof packageManagerOptionKeys[number]
  styling: typeof stylingOptionKeys[number]
  formStateManagement: Array<typeof formStateManagementOptionKeys[number]>
  formatting: Array<typeof formattingOptionKeys[number]>
  componentLibraries: Array<typeof componentLibraryOptionKeys[number]>
  animation: Array<typeof animationOptionKeys[number]>
  continuousIntegration: Array<typeof continuousIntegrationOptionKeys[number]>
}
const defaultFormData: TechnologiesFormData = {
  projectName: "my-app",
  packageManager: optionKeys.yarn,
  styling: optionKeys.emotion,
  formStateManagement: [optionKeys.reactHookForm],
  formatting: [optionKeys.prettier, optionKeys.formattingPreCommitHook],
  componentLibraries: [optionKeys.chakra],
  animation: [optionKeys.framerMotion],
  continuousIntegration: [optionKeys.githubActions],
}
const formDataKeys = objectToKeyToKeyMap(defaultFormData)

const categoryLabels = {
  projectName: "Project Name",
  packageManager: "Package Manager",
  styling: "Styling",
  formStateManagement: "Form State Management",
  language: "Language",
  formatting: "Formatting",
  linting: "Linting",
  componentLibraries: "Component Libraries",
  animation: "Animation",
  continuousIntegration: "Continuous Integration",
}

export const TechnologiesForm: React.FC = () => {
  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState,
  } = useForm<TechnologiesFormData>({
    defaultValues: defaultFormData,
  })

  const { errors } = formState

  const styling = watch("styling")
  const formatting = watch("formatting")
  const animation = watch("animation")

  const [isCommandModalShow, setIsModalShown] = React.useState(false)
  const [command, setCommand] = React.useState("")

  const handleSuccessfulSubmit: SubmitHandler<TechnologiesFormData> = (
    formData
  ) => {
    const calculateCommand = (formData: TechnologiesFormData) => {
      const args = ["npx", "create-next-stack@0.1.6"]

      args.push(`--package-manager=${options[formData.packageManager].value}`)
      args.push(`--styling=${options[formData.styling].value}`)

      const pushArgs = (selectedOptionKeys: Array<keyof typeof options>) => {
        selectedOptionKeys.forEach((optionKey) => {
          args.push(`--${options[optionKey].value}`)
        })
      }
      pushArgs(formData.formStateManagement)
      pushArgs(formData.formatting)
      pushArgs(formData.componentLibraries)
      pushArgs(formData.animation)
      pushArgs(formData.continuousIntegration)

      const projectNameSegments = formData.projectName.split("/")
      const lastPartOfProjectName = projectNameSegments.pop()!
      args.push(lastPartOfProjectName)

      return args.join(" ")
    }

    setCommand(calculateCommand(formData))
    setIsModalShown(true)
  }

  return (
    <>
      <CommandModal
        isOpen={isCommandModalShow}
        command={command}
        onClose={() => {
          setIsModalShown(false)
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
                <Heading as="h3" size="md" gap="8px">
                  <WithInfoIconAndTooltip
                    tooltip={`Project names must be valid NPM package names.`}
                  >
                    {categoryLabels.projectName}
                  </WithInfoIconAndTooltip>
                </Heading>
                <FormControl isInvalid={errors?.projectName?.message != null}>
                  <Input
                    {...register(formDataKeys.projectName, {
                      validate: validateProjectName,
                    })}
                  />
                  {errors.projectName?.message != null ? (
                    <FormErrorMessage>
                      {capitalizeFirstCharacter(errors.projectName.message) +
                        "."}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
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
                        {packageManagerOptionKeys.map(
                          (packageManagerOptionKey) => (
                            <Radio
                              key={packageManagerOptionKey}
                              value={packageManagerOptionKey}
                            >
                              {options[packageManagerOptionKey].label}
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
                  {categoryLabels.styling}
                </Heading>
                <Controller
                  name={formDataKeys.styling}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <RadioGroup {...rest}>
                      <Stack spacing="3">
                        {stylingOptionKeys.map((stylingOptionKey) => (
                          <Radio
                            key={stylingOptionKey}
                            value={stylingOptionKey}
                            onChange={(e) => {
                              if (e.target.value !== optionKeys.emotion) {
                                setValue(
                                  "componentLibraries",
                                  getValues("componentLibraries").filter(
                                    (value) => value !== optionKeys.chakra
                                  )
                                )
                              }
                            }}
                          >
                            {options[stylingOptionKey].label}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </Stack>

              <Flex direction={"column"} gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.formStateManagement}
                </Heading>
                <Controller
                  name={formDataKeys.formStateManagement}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      <Stack spacing="3">
                        {formStateManagementOptionKeys.map(
                          (formStateManagementOptionKey) => (
                            <Checkbox
                              key={formStateManagementOptionKey}
                              value={formStateManagementOptionKey}
                            >
                              {options[formStateManagementOptionKey].label}
                            </Checkbox>
                          )
                        )}
                      </Stack>
                    </CheckboxGroup>
                  )}
                />
              </Flex>
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
                            if (!e.target.checked) {
                              setValue(
                                "formatting",
                                getValues("formatting").filter(
                                  (formattingOption) =>
                                    formattingOption !==
                                    optionKeys.formattingPreCommitHook
                                )
                              )
                            }
                          }}
                        >
                          {options[optionKeys.prettier].label}
                        </Checkbox>
                        <Checkbox
                          value={optionKeys.formattingPreCommitHook}
                          isDisabled={
                            !getValues("formatting").includes(
                              optionKeys.prettier
                            )
                          }
                        >
                          {formatting.includes(optionKeys.prettier) ? (
                            options[optionKeys.formattingPreCommitHook].label
                          ) : (
                            <WithInfoIconAndTooltip
                              tooltip={`${
                                options[optionKeys.formattingPreCommitHook]
                                  .label
                              } requires ${
                                options[optionKeys.prettier].label
                              }. Select it above.`}
                            >
                              {
                                options[optionKeys.formattingPreCommitHook]
                                  .label
                              }
                            </WithInfoIconAndTooltip>
                          )}
                        </Checkbox>
                      </Stack>
                    </CheckboxGroup>
                  )}
                />
              </Stack>

              <Stack spacing="4">
                <Heading as="h3" size="md">
                  {categoryLabels.linting}
                </Heading>
                <CheckboxGroup value={["ESLint"]}>
                  <Stack spacing="3">
                    <Checkbox value="ESLint" isDisabled>
                      <WithInfoIconAndTooltip tooltip="ESLint is currently required.">
                        ESLint
                      </WithInfoIconAndTooltip>
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
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
                          isDisabled={
                            styling !== optionKeys.emotion ||
                            !animation.includes("framerMotion")
                          }
                        >
                          {styling !== optionKeys.emotion ? (
                            <WithInfoIconAndTooltip
                              tooltip={`${
                                options[optionKeys.chakra].label
                              } requires ${
                                options[optionKeys.emotion].label
                              }. Select it under ${categoryLabels.styling}.`}
                            >
                              {options[optionKeys.chakra].label}
                            </WithInfoIconAndTooltip>
                          ) : !animation.includes("framerMotion") ? (
                            <WithInfoIconAndTooltip
                              tooltip={`${
                                options[optionKeys.chakra].label
                              } requires ${
                                options[optionKeys.framerMotion].label
                              }. Select it under ${categoryLabels.animation}.`}
                            >
                              {options[optionKeys.chakra].label}
                            </WithInfoIconAndTooltip>
                          ) : (
                            options[optionKeys.chakra].label
                          )}
                        </Checkbox>
                        <Checkbox value={optionKeys.materialUi} isDisabled>
                          <WithInfoIconAndTooltip
                            tooltip={`${
                              options[optionKeys.materialUi].label
                            } is currently disabled while we wait for React 18 support.`}
                          >
                            {options[optionKeys.materialUi].label}
                          </WithInfoIconAndTooltip>
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
                  name={formDataKeys.animation}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      <Stack spacing="3">
                        <Checkbox
                          key={optionKeys.framerMotion}
                          value={optionKeys.framerMotion}
                          onChange={(e) => {
                            if (!e.target.checked) {
                              setValue(
                                "componentLibraries",
                                getValues("componentLibraries").filter(
                                  (componentLibrary) =>
                                    componentLibrary !== optionKeys.chakra
                                )
                              )
                            }
                          }}
                        >
                          {options.framerMotion.label}
                        </Checkbox>
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
                  name={formDataKeys.continuousIntegration}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      <Stack spacing="3">
                        {continuousIntegrationOptionKeys.map(
                          (continuousIntegrationOptionKey) => (
                            <Checkbox
                              key={continuousIntegrationOptionKey}
                              value={continuousIntegrationOptionKey}
                            >
                              {options[continuousIntegrationOptionKey].label}
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
  )
}
