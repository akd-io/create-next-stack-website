import {
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Section } from "../../components/Section";
import { arrayToKeyToKeyMap } from "../../utils/arrayToKeyToKeyMap";
import { objectToKeyToKeyMap } from "../../utils/objectToKeyToKeyMap";

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 20px;

  font-size: 3rem;
  font-weight: bold;
`;

const H2 = styled.h2`
  margin: 0;
  margin-bottom: 20px;

  font-size: 1.5rem;
  font-weight: bold;
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
      <main>
        <Section>
          <H1>Create Next Stack</H1>

          <form onSubmit={handleSubmit(handleValidSubmit)}>
            <Stack direction="column" spacing="8">
              <div>
                <H2>Package manager</H2>
                <Controller
                  name={formDataKeys.packageManager}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack direction="column">
                        {Object.keys(packageManagers).map((packageManager) => (
                          <Radio
                            key={packageManager}
                            id={`radio-${packageManager}`}
                            value={packageManager}
                          >
                            {packageManager}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </div>

              <div>
                <H2>Styling method</H2>
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
              </div>

              <div>
                <H2>Form state management</H2>
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
              </div>
            </Stack>

            <Button type="submit">Submit</Button>
          </form>
        </Section>
      </main>
    </>
  );
};

export default LandingPageTemplate;
