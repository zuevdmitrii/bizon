import * as React from "react";
import { useEffect, useState } from "react";
import { usePerson } from "./usePerson";
import { Input } from "../../Task/Input";
import { Button } from "../Components/Button";
import { IPerson } from "../usePersons";
import { employeeCreate, employeeUpdate } from "../../api/EmployeeApi";

export const PersonCard = (props: { personId: string }) => {
  const [localPerson, setLocalPerson] = useState<IPerson | null>(null);
  const [disabled, setDisabled] = useState(false);
const person= usePerson(props.personId);

  useEffect(() => {
    setLocalPerson(person);
  }, [person]);

  return (
    <div>
      {localPerson ? (
        <div>
          <Input
            value={localPerson.email}
            label={"Email"}
            onChange={(value) =>
              setLocalPerson({ ...localPerson, email: value })
            }
          />

          <Input
            value={localPerson.firstName}
            label={"Имя"}
            onChange={(value) =>
              setLocalPerson({ ...localPerson, firstName: value })
            }
          />
          <Input
            value={localPerson.lastName}
            label={"Фамилия"}
            onChange={(value) =>
              setLocalPerson({ ...localPerson, lastName: value })
            }
          />
          <Input
            value={localPerson.role}
            label={"Роль"}
            onChange={(value) =>
              setLocalPerson({ ...localPerson, role: value })
            }
          />
          <Button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              props.personId==='new' ? employeeCreate(localPerson) : employeeUpdate(localPerson)
              setDisabled(false)
            }}
            caption={props.personId==='new' ? 'Создать': "Обновить"}
          />
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};
