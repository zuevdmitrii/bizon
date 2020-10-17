import * as React from "react";
import "./Button.less"

interface IButtonProps {
  onClick: () => void;
  caption: string;
  disabled?: boolean;
}
export const Button = (props: IButtonProps) => {
  return (
    <button className='button' disabled={props.disabled} onClick={props.onClick}>
      {props.caption}
    </button>
  );
};
