import * as React from "react";
import classNames from 'classnames'

interface IButtonProps {
  className?: string
  onClick: () => void;
  caption?: string;
  disabled?: boolean;
  icon?: any
}
export const Button = (props: IButtonProps) => {
  return (
    <button className={classNames(props.className,props.icon)} disabled={props.disabled} onClick={props.onClick}>
      {props.caption}
    </button>
  );
};
