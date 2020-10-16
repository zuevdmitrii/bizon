import * as React from 'react';


interface IButtonProps {
  onClick: () => void;
  caption: string;
}
export const Button = (props: IButtonProps) => {
  return <button onClick={props.onClick}>{props.caption}</button>;
};
