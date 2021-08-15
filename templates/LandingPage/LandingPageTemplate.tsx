import {
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Section } from "../../components/Section";
import { arrayToKeyToKeyMap } from "../../utils/arrayToKeyToKeyMap";
import { objectToKeyToKeyMap } from "../../utils/objectToKeyToKeyMap";

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
      <main>
        <Section>
          <Stack spacing="8" align="flex-start">
            <Heading as="h1" size="2xl">
              Create Next Stack
            </Heading>

            <form onSubmit={handleSubmit(handleValidSubmit)}>
              <Stack spacing="8">
                <Stack spacing="4">
                  <Heading>Package manager</Heading>
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
                  <Heading>Styling method</Heading>
                  <Controller
                    name={formDataKeys.stylingMethod}
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <Stack direction="column">
                          {Object.keys(stylingMethods).map((stylingMethod) => (
                            <Radio
                              key={stylingMethod}
                              id={`radio-${stylingMethod}`}
                              value={stylingMethod}
                            >
                              {stylingMethod}
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                </Stack>

                <Stack spacing="4">
                  <Heading>Form state management</Heading>
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
                <Stack alignItems="center">
                  <Button type="submit" size="lg">
                    Create Next Stack
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Section>
      </main>
    </>
  );
};

export default LandingPageTemplate;
