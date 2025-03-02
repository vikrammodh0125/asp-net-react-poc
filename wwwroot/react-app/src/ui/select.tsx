import React, { PropsWithChildren } from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  data: { label: string; value: string; disabled?: boolean }[];
};

export const Select: React.FC<PropsWithChildren<SelectProps>> = ({ data }) => {
  return (
    <select className="web-outline-none web-px-2 web-py-1 web-border-2 web-rounded-md web-w-full">
      {data.map((element) => (
        <option value={element.value} disabled={element.disabled}>
          {element.label}
        </option>
      ))}
    </select>
  );
};
