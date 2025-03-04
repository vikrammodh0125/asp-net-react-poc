import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Input, Select } from "../ui";
import { User } from "../types";

const FormField = ({ label, children }) => {
  return (
    <div className="web-grid web-grid-cols-3 web-gap-4 web-items-center">
      <label className="web-font-medium">{label}</label>
      <div className="web-col-span-2">{children}</div>
    </div>
  );
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is reuqired"),
  email: yup.string().required("Email is required").email("Invalid email"),
  dob: yup.string().required("DOB is required"),
  code: yup.string().required("Code is required"),
  ssn: yup.string().required("SSN is required"),
  gender: yup.string().required("Gender is required"),
  streetAddress: yup.string().required("Street address is required"),
  unit: yup.string().required("Unit is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
});

interface UserCreateProps {
  initialValues?: User;
  onSave: (user: User) => void;
}

export const UserCreate: React.FC<UserCreateProps> = ({
  initialValues,
  onSave,
}) => {
  const { values, handleChange, handleSubmit, touched, errors, handleBlur } =
    useFormik({
      initialValues: initialValues ?? {
        name: "",
        email: "",
        dob: "",
        code: "",
        ssn: "",
        gender: "",
        streetAddress: "",
        unit: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        onSave(values);
      },
    });

  const registerField = (field: string) => {
    return {
      touched: touched[field],
      error: errors[field],
      name: field,
      onChange: handleChange,
      value: values[field],
      onBlur: handleBlur,
    };
  };

  return (
    <form
      className="web-flex-1 web-flex-col web-flex web-space-y-4"
      onSubmit={handleSubmit}
    >
      <p className="web-font-semibold web-text-2xl">Create User</p>
      <div className="web-grid web-grid-cols-2 web-gap-12 web-flex-1">
        <div className="web-space-y-4">
          <FormField label="First Name">
            <Input placeholder="First name" {...registerField("name")} />
          </FormField>
          <FormField label="Email Address">
            <Input
              placeholder="Email Address"
              type="email"
              {...registerField("email")}
            />
          </FormField>
          <FormField label="Date of birth">
            <Input
              placeholder="Date of birth"
              type="date"
              {...registerField("dob")}
            />
          </FormField>
          <FormField label="Patient Code">
            <Input placeholder="Patient Code" {...registerField("code")} />
          </FormField>
          <FormField label="SSN">
            <Input placeholder="SSN" {...registerField("ssn")} />
          </FormField>
          <FormField label="Gender">
            <Select
              {...registerField("gender")}
              defaultValue=""
              data={[
                {
                  label: "Unknown",
                  value: "",
                },
                {
                  label: "Male",
                  value: "Male",
                },
                {
                  label: "Female",
                  value: "Female",
                },
              ]}
            />
          </FormField>
        </div>
        <div className="web-space-y-4">
          <FormField label="Street Address">
            <Input
              placeholder="Street Address"
              {...registerField("streetAddress")}
            />
          </FormField>
          <FormField label="Apt/Suite/Unit">
            <Input placeholder="Apt/Suite/Unit" {...registerField("unit")} />
          </FormField>
          <FormField label="City">
            <Input placeholder="City" {...registerField("city")} />
          </FormField>
          <FormField label="State">
            <Input placeholder="State" {...registerField("state")} />
          </FormField>
          <FormField label="Zipcode">
            <Input placeholder="Zipcode" {...registerField("zipcode")} />
          </FormField>
          <FormField label="Country">
            <Input placeholder="Country" {...registerField("country")} />
          </FormField>
        </div>
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
};
