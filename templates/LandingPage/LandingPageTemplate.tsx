import { Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
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

type FormData = {
  packageManager: "yarn" | "npm";
};
const defaultFormData: FormData = {
  packageManager: "yarn",
};
const formDataKeys = objectToKeyToKeyMap(defaultFormData);

const LandingPageTemplate = () => {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: defaultFormData,
  });

  const handleValidSubmit: SubmitHandler<FormData> = (formData) => {
    // TODO: Implement
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <>
      <main>
        <Section>
          <H1>Create Next Stack</H1>
          <form onSubmit={handleSubmit(handleValidSubmit)}>
            <H2>Package manager</H2>

            <Controller
              name={formDataKeys.packageManager}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="column">
                    <Radio id="radio-yarn" value="yarn">
                      Yarn
                    </Radio>
                    <Radio id="radio-npm" value="npm">
                      npm
                    </Radio>
                  </Stack>
                </RadioGroup>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Section>
      </main>
    </>
  );
};

export default LandingPageTemplate;
