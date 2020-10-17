import * as React from "react";
import { useState } from "react";
import { webSocketControllerInstance } from "../../WebSocketInstance";

interface IPerson {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const usePerson = (personId: string) => {
  const [person, setPerson] = useState<IPerson | null>(null);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (personId !=='-1'){webSocketControllerInstance
        .call({ type: "employeeGet", data: { id: personId } })
        .then((res) => {
          console.log(res);
          res && res.data && setPerson(res.data);
        });} else {
            setPerson({} as IPerson)
        }
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return person;
};
