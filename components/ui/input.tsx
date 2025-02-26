import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="border rounded-md px-3 py-2 w-full"
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;