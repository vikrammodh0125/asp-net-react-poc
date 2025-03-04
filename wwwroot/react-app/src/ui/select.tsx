import React, { PropsWithChildren } from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  data: { label: string; value: string; disabled?: boolean }[];
  error?: string;
  touched?: boolean;
};

export const Select: React.FC<PropsWithChildren<SelectProps>> = ({
  error,
  touched,
  data,
  ...rest
}) => {
  return (
    <div className="web-space-y-1">
      <select {...rest} className="web-outline-none web-px-2 web-py-1 web-border-2 web-rounded-md web-w-full" >
        {data.map((element) => (
          <option value={element.value} disabled={element.disabled}>
            {element.label}
          </option>
        ))}
      </select>
      {!!touched && !!error && (
        <p className="web-text-xs web-text-red-600">{error}</p>
      )}
    </div>
  );
};
