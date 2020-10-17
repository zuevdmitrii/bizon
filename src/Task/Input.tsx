import * as React from "react";

export const Input = (props: {
  value: string;
  password?: boolean;
  onChange?: (value: string) => void;
  label: string;
}) => {
  return (
    <div>
      <p>{props.label}</p>
      <p>
        <input
          type={props.password ? 'password' : 'text'}
          value={props.value}
          onChange={(value) => props.onChange(value.target.value)}
        />
      </p>
    </div>
  );
};
