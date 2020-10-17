import * as React from "react";
import { Link } from "react-router-dom";
import { employeeDelete } from "../api/EmployeeApi";
import { Button } from "./Components/Button";
import "./Main.less";
import { usePersons } from "./usePersons";

export const PersonsList = () => {
  const persons = usePersons({}, {}, {});

  return (
    <div>

      <Link to={`/person/new`} className="list__row-wrapper">
        Создать нового сотрудника
      </Link>

      {persons ? (
        persons.map((person, index) => {
          return (
            <div className="list_root" key={index}>
              <Link to={`/person/${person._id}`} className="list__row-wrapper">
                Открыть
              </Link>
              <div className={"listTitle"} key={index}>
                {person.firstName}
              </div>
              <Button
                caption={"X"}
                onClick={() => {
                  employeeDelete(person._id)
                }}
              />
            </div>
          );
        })
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
