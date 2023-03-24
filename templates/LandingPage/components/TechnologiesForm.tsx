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

const cssModulesValue = "css-modules"

const options = {
  pnpm: { key: "pnpm", value: "pnpm", label: "pnpm" },
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

const packageManagerOptionKeys = [
  optionKeys.pnpm,
  optionKeys.yarn,
  optionKeys.npm,
]
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
  packageManager: optionKeys.pnpm,
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
  const { register, control, watch, handleSubmit, formState } =
    useForm<TechnologiesFormData>({
      defaultValues: defaultFormData,
    })

  const { errors } = formState

  const [isCommandModalShow, setIsModalShown] = React.useState(false)
  const [command, setCommand] = React.useState("")

  const handleSuccessfulSubmit: SubmitHandler<TechnologiesFormData> = (
    formData
  ) => {
    const calculateCommand = (formData: TechnologiesFormData) => {
      const args = ["npx", "create-next-stack@0.2.0"]

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

  const CheckboxesOfOptionKeys = (optionKeys: Array<keyof typeof options>) => {
    return (
      <Flex direction="column" gap="3">
        {optionKeys.map((optionKey) => (
          <Checkbox key={optionKey} value={optionKey}>
            {options[optionKey].label}
          </Checkbox>
        ))}
      </Flex>
    )
  }

  const RadiosOfOptionKeys = (optionKeys: Array<keyof typeof options>) => {
    return (
      <Flex direction="column" gap="3">
        {optionKeys.map((optionKey) => (
          <Radio key={optionKey} value={optionKey}>
            {options[optionKey].label}
          </Radio>
        ))}
      </Flex>
    )
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

        <Flex direction="column" gap="16">
          <Flex direction={["column", "column", "row"]} gap={["8", "8", "16"]}>
            <Flex direction="column" gap="8" flexBasis="100%">
              <Flex direction="column" gap="4">
                <Heading as="h3" size="md" gap="8px">
                  <WithInfoIconAndTooltip
                    tooltip={`Project names must be valid npm package names.`}
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
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.packageManager}
                </Heading>
                <Controller
                  name={formDataKeys.packageManager}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <RadioGroup {...rest}>
                      {RadiosOfOptionKeys(packageManagerOptionKeys)}
                    </RadioGroup>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.styling}
                </Heading>
                <Controller
                  name={formDataKeys.styling}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <RadioGroup {...rest}>
                      {RadiosOfOptionKeys(stylingOptionKeys)}
                    </RadioGroup>
                  )}
                />
              </Flex>

              <Flex direction={"column"} gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.formStateManagement}
                </Heading>
                <Controller
                  name={formDataKeys.formStateManagement}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      {CheckboxesOfOptionKeys(formStateManagementOptionKeys)}
                    </CheckboxGroup>
                  )}
                />
              </Flex>
            </Flex>

            <Flex direction="column" gap="8" flexBasis="100%">
              <Flex direction="column" gap="4">
                <Heading
                  as="h3"
                  size="md"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  {categoryLabels.language}
                </Heading>
                <CheckboxGroup value={["TypeScript"]}>
                  <Flex direction="column" gap="3">
                    <Checkbox value="TypeScript" isDisabled>
                      <WithInfoIconAndTooltip tooltip="TypeScript is currently required.">
                        TypeScript
                      </WithInfoIconAndTooltip>
                    </Checkbox>
                  </Flex>
                </CheckboxGroup>
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.formatting}
                </Heading>
                <Controller
                  name={formDataKeys.formatting}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      {CheckboxesOfOptionKeys(formattingOptionKeys)}
                    </CheckboxGroup>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.linting}
                </Heading>
                <CheckboxGroup value={["ESLint"]}>
                  <Flex direction="column" gap="3">
                    <Checkbox value="ESLint" isDisabled>
                      <WithInfoIconAndTooltip tooltip="ESLint is currently required.">
                        ESLint
                      </WithInfoIconAndTooltip>
                    </Checkbox>
                  </Flex>
                </CheckboxGroup>
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.componentLibraries}
                </Heading>
                <Controller
                  name={formDataKeys.componentLibraries}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      {CheckboxesOfOptionKeys(componentLibraryOptionKeys)}
                    </CheckboxGroup>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.animation}
                </Heading>
                <Controller
                  name={formDataKeys.animation}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      {CheckboxesOfOptionKeys(animationOptionKeys)}
                    </CheckboxGroup>
                  )}
                />
              </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.continuousIntegration}
                </Heading>
                <Controller
                  name={formDataKeys.continuousIntegration}
                  control={control}
                  render={({ field: { ref, ...rest } }) => (
                    <CheckboxGroup {...rest}>
                      {CheckboxesOfOptionKeys(continuousIntegrationOptionKeys)}
                    </CheckboxGroup>
                  )}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="row" justifyContent={["left", "center"]}>
            <Button type="submit" colorScheme={"purple"}>
              Create Next Stack
            </Button>
          </Flex>

          <Text align={["left", "center"]}>
            Missing your favorite technology or encountering a bug? <br />
            <Anchor
              href="https://github.com/akd-io/create-next-stack/issues"
              isExternal
            >
              Open an issue on GitHub <ExternalLinkIcon mx="2px" />
            </Anchor>
          </Text>
        </Flex>
      </form>
    </>
  )
}
