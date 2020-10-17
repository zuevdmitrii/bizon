import * as React from "react";
import "./Input.less";

export const Input = (props: {
  value: string;
  type?: "password" | "date" | "text";
  disabled?: boolean;
  password?: boolean;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <div>
      <p>{props.label}</p>
      <div className={"input"}>
        <input
          type={props.type ? props.type : "text"}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(value) => props.onChange(value.target.value)}
        />
      </div>
    </div>
  );
};
