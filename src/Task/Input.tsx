import * as React from "react";

export const Input = (props: {
  value: string;
  onChange?: (value: string) => void;
  label: string;
}) => {
  return (
    <div>
      <p>
        <input
          placeholder={props.label}
          value={props.value}
          onChange={(value) => props.onChange(value.target.value)}
        />
      </p>
    </div>
  );
};
