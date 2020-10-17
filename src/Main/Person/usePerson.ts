import * as React from "react";
import { useState } from "react";
import { employeeGet } from "../../api/EmployeeApi";
import { IPerson } from "../usePersons";


export const usePerson = (personId: string, update?: number) => {
  const [person, setPerson] = useState<IPerson | null>(null);

  React.useEffect(() => {
    if (personId !== "new") {
      employeeGet(personId).then((res) => {
        res && res.data && setPerson(res.data);
      });
    } else {
      setPerson({} as IPerson);
    }
  }, [update]);

  return person;
};
