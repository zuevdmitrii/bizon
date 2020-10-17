import * as React from "react";
import { Auth } from "./Auth/Auth";
import { PageTemplate } from "./PageTemplate";
import {login} from '../api/LoginApi'
import {Button} from "./Components/Button";
import {Exit} from "./Exit";

export const Index = (props: any) => {
  const [logged, setLogged] = React.useState<boolean>(!!localStorage.getItem("token"));
  console.log(localStorage.getItem("token"), logged)
  return (
    <>
      {logged ? (
          <>
          <Exit logout={() => setLogged(false)}/>
        <PageTemplate>
          <div>Test cmp</div>
        </PageTemplate>
          </>
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
