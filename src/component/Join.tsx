import { Formik, Form, Field } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const validateCheck = (value) => {
  let error;
  if (!value) {
    error = `필수 항목 입니다.`;
  }
  return error;
};

const initialValues = {};
const onSubmit = (values) => {
  console.log(values);
};

function Admin() {
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field name="email" validate={validateCheck}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel>First email</FormLabel>
                <Input {...field} placeholder="email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validateCheck}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel>First password</FormLabel>
                <Input {...field} placeholder="password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
}

export default Admin;
