import React, { PropsWithChildren } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
  touched?: boolean;
};

export const Input: React.FC<PropsWithChildren<InputProps>> = ({
  error,
  touched,
  ...rest
}) => {
  return (
    <div className="web-space-y-1">
      <input
        {...rest}
        className="web-outline-none web-px-2 web-py-1 web-border-2 web-rounded-md web-w-full"
      />
      {!!touched && !!error && (
        <p className="web-text-xs web-text-red-600">{error}</p>
      )}
    </div>
  );
};
