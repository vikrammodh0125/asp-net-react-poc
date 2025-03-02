import React, { PropsWithChildren } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<PropsWithChildren<InputProps>> = ({ ...rest }) => {
  return (
    <input
      {...rest}
      className="web-outline-none web-px-2 web-py-1 web-border-2 web-rounded-md web-w-full"
    />
  );
};
