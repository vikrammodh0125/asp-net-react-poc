import React, { PropsWithChildren } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...rest
}) => {
  return (
    <button
      className="web-bg-blue-600 web-py-2 web-text-white web-rounded-md web-px-4"
      {...rest}
    >
      {children}
    </button>
  );
};
