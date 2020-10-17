import * as React from "react";
import { Button } from "./Components/Button";
import "./Exit.less";

export const Exit = (props: { logout: () => void }) => {
  return (
    <div className={"exit"}>
      <Button
        onClick={() => {
          localStorage.setItem("token", "");
          props.logout();
        }}
        caption={"Выход"}
      />
    </div>
  );
};
