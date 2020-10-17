import * as React from "react";
import { Input } from "../../Task/Input";
import { Button } from "../Components/Button";
import "./Auth.less";

interface IProps {
  onAuth: (login: string, password: string) => Promise<boolean>;
}

export const Auth = (props: IProps) => {
  const [cred, setCred] = React.useState<{ login: string; pass: string }>({
    login: "",
    pass: "",
  });
  return (
    <div className='auth'>
      <Input
        value={cred.login}
        label={"Email"}
        onChange={(value) => {
          setCred({ ...cred, login: value });
        }}
      />
      <Input
        type={"password"}
        value={cred.pass}
        label={"Password"}
        onChange={(value) => {
          setCred({ ...cred, pass: value });
        }}
      />
      <Button
        caption="Войти"
        onClick={async () => {
          await props.onAuth(cred.login, cred.pass);
        }}
      />
    </div>
  );
};
