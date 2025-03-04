import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Input } from "../ui";
import { Note } from "../types";

const FormField = ({ label, children }) => {
  return (
    <div className="web-grid web-grid-cols-3 web-gap-4 web-items-center">
      <label className="web-font-medium">{label}</label>
      <div className="web-col-span-2">{children}</div>
    </div>
  );
};

const validationSchema = yup.object().shape({
  content: yup.string().required("Content is required"),
});

interface NoteCreateProps {
  initialValues?: Note;
  onSave: (note: Note) => void;
}

export const NoteCreate: React.FC<NoteCreateProps> = ({
  initialValues,
  onSave,
}) => {
  const { values, handleChange, handleSubmit, touched, errors, handleBlur } =
    useFormik({
      initialValues: initialValues ?? {
        content: "",
      },
      validationSchema,
      onSubmit: (values) => {
        onSave(values);
      },
      enableReinitialize: true,
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
      <p className="web-font-semibold web-text-2xl">Create Note</p>
      <div className="web-grid web-grid-cols-1 web-gap-12 web-flex-1">
        <div className="web-space-y-4">
          <FormField label="Content">
            <Input placeholder="Content" {...registerField("content")} />
          </FormField>
        </div>
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
};
