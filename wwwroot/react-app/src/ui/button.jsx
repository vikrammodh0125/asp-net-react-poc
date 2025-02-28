export const Button = ({ children, ...rest }) => {
  return <button className="web-bg-blue-600 web-py-2 web-text-white web-rounded-md web-px-4" {...rest}>{children}</button>;
};
