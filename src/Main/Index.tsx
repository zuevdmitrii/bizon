import * as React from "react";
import { Auth } from "./Auth/Auth";
import { PageTemplate } from "./PageTemplate";
import {login} from '../api/LoginApi'

export const Index = (props: any) => {
  const [logged, setLogged] = React.useState<boolean>(!!localStorage.getItem("token"));
  return (
    <>
      {logged ? (
        <PageTemplate>
          <div>Test cmp</div>
        </PageTemplate>
      ) : (
        <Auth
          onAuth={async (name, pass) => {
            await login(name, pass)
            setLogged(true)
            console.log('DD:', localStorage.getItem('token'))
            return true
          }}
        />
      )}
    </>
  );
};
