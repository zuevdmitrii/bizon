import * as React from "react";
import './TextArea.less'

export const TextArea = (props: {
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
        <div
          className="textArea"
          contentEditable={!props.disabled}
          // @ts-ignore
          onInput={(value) => props.onChange(value.target.value)}
        >
          {props.value}
        </div>

      </p>
    </div>
  );
};
