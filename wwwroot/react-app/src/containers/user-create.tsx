import React from "react";
import { useFormik } from "formik";
import { Button, Input, Select } from "../ui";
import { useCreateUser } from "../hooks";

const FormField = ({ label, children }) => {
  return (
    <div className="web-grid web-grid-cols-3 web-gap-4 web-items-center">
      <label className="web-font-medium">{label}</label>
      <div className="web-col-span-2">{children}</div>
    </div>
  );
};

export const UserCreate = () => {
  const { mutateAsync: createUser } = useCreateUser();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
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
    onSubmit: async (formValues, helper) => {
      try {
        await createUser({
          name: formValues.name,
          email: formValues.email,
        });

        alert("User created successfully");
        helper.resetForm();
      } catch (error) {
        console.log("error", error.message);
        alert("Failed to create user: " + error.message);
      }
    },
  });

  return (
    <form
      className="web-flex-1 web-flex-col web-flex web-space-y-4"
      onSubmit={handleSubmit}
    >
      <p className="web-font-semibold web-text-2xl">Create User</p>
      <div className="web-grid web-grid-cols-2 web-gap-12 web-flex-1">
        <div className="web-space-y-4">
          <FormField label="First Name">
            <Input
              placeholder="First name"
              value={values.name}
              onChange={handleChange}
              name="name"
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              name="email"
              type="email"
            />
          </FormField>
          <FormField label="Date of birth">
            <Input
              placeholder="Date of birth"
              type="date"
              value={values.dob}
              onChange={handleChange}
              name="dob"
            />
          </FormField>
          <FormField label="Patient Code">
            <Input
              placeholder="Patient Code"
              value={values.code}
              onChange={handleChange}
              name="code"
            />
          </FormField>
          <FormField label="SSN">
            <Input
              placeholder="SSN"
              value={values.ssn}
              onChange={handleChange}
              name="ssn"
            />
          </FormField>
          <FormField label="Gender">
            <Select
              value={values.gender}
              onChange={handleChange}
              name="gender"
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
              value={values.streetAddress}
              onChange={handleChange}
              name="streetAddress"
            />
          </FormField>
          <FormField label="Apt/Suite/Unit">
            <Input
              placeholder="Apt/Suite/Unit"
              value={values.unit}
              onChange={handleChange}
              name="unit"
            />
          </FormField>
          <FormField label="City">
            <Input
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              name="city"
            />
          </FormField>
          <FormField label="State">
            <Input
              placeholder="State"
              value={values.state}
              onChange={handleChange}
              name="state"
            />
          </FormField>
          <FormField label="Zipcode">
            <Input
              placeholder="Zipcode"
              value={values.zipcode}
              onChange={handleChange}
              name="zipcode"
            />
          </FormField>
          <FormField label="Country">
            <Input
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
              name="country"
            />
          </FormField>
        </div>
      </div>

      <Button>Save</Button>
    </form>
  );
};
