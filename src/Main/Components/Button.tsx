import * as React from "react";

interface IButtonProps {
  onClick: () => void;
  caption: string;
  disabled?: boolean;
}
export const Button = (props: IButtonProps) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.caption}
    </button>
  );
};
