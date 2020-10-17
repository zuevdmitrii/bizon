import * as React from "react";

export const Input = (props: {
  value: string;
  disabled?: boolean
  password?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?:string
}) => {
  return (
    <div>
      <p>{props.label}</p>
      <p>
        <input
          disabled={props.disabled}
          type={props.password ? 'password' : 'text'}
          placeholder={props.label}
          value={props.value}
          onChange={(value) => props.onChange(value.target.value)}
        />
      </p>
    </div>
  );
};
