import * as React from "react";
import "./Button.less";

interface IButtonProps {
  onClick: () => void;
  caption: string;
  disabled?: boolean;
  icon?: string;
}
export const Button = (props: IButtonProps) => {
  return (
    <button
      className="button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.icon ? (
        <div className={'withIcons'}>
          <div  className={'icons'}>
          <div className={props.icon} />
          </div>
          {props.caption}{" "}
        </div>
      ) : (
        props.caption
      )}
    </button>
  );
};
