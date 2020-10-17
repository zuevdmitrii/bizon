import * as React from "react";
import { useEffect, useState } from "react";
import { usePerson } from "./usePerson";
import { Input } from "../../Task/Input";
import { Button } from "../Components/Button";
import { IPerson } from "../usePersons";
import { employeeCreate, employeeUpdate } from "../../api/EmployeeApi";
import { departmentGet } from "../../api/DepartmentApi";
import { DepartmentsModal } from "../DepartmentsModal";
import { Modal } from "../Components/Modal";

export const PersonCard = (props: { personId: string }) => {
  const [localPerson, setLocalPerson] = useState<IPerson | null>(null);
  const [disabled, setDisabled] = useState(false);
  const person = usePerson(props.personId);
  const [depModal, setDepModal] = useState(false);
  const [allDepartments, setAllDepartments] = useState<string[]>([]);

  useEffect(() => {
    setLocalPerson(person);
  }, [person]);

  const fetchDepartments = async () => {
    const { data } = await departmentGet();
    setAllDepartments(data);
  };

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
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div> 
              
              {`Департамент : ${localPerson.departament || 'Выберите департамент из списка'}`}
            </div>
            <Button
              onClick={() => {
                fetchDepartments();
                setDepModal(true);
              }}
              caption={"Выбрать департамент"}
            />
          </div>
          <Button
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              props.personId === "new"
                ? employeeCreate(localPerson)
                : employeeUpdate(localPerson);
              setDisabled(false);
            }}
            caption={props.personId === "new" ? "Создать" : "Обновить"}
          />
          {depModal && (
            <Modal onClose={() => setDepModal(false)}>
              <DepartmentsModal
                departmentsList={allDepartments}
                select={(value: string) => {
                  setLocalPerson({ ...localPerson, departament: value });
                }}
              />
            </Modal>
          )}
        </div>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};
