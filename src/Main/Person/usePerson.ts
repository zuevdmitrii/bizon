import * as React from "react";
import { useState } from "react";
import { employeeGet } from "../../api/EmployeeApi";

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
    if (personId !== "new") {
      employeeGet(personId).then((res) => {
        res && res.data && setPerson(res.data);
      });
    } else {
      setPerson({} as IPerson);
    }
  }, []);

  return person;
};
