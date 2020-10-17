import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { employeeDelete } from "../api/EmployeeApi";
import { IDataProviderFilter, Logic, Operator } from "../api/IFilter";
import { Input } from "../Task/Input";
import { Button } from "./Components/Button";
import "./Main.less";
import { usePersons } from "./usePersons";

export const PersonsList = (props: {setUser?: (email: string, id: string) => void, onClose?: () => void}) => {
  const [filters, setFilters] = useState<IDataProviderFilter | null>();
  const [filterValue, setFilterValue] = useState("");
  const persons = usePersons(filters, {}, {});
  console.log("persons", persons);
  return (
    <div>
      <Link to={`/person/new`} className="list__row-wrapper">
        Создать нового сотрудника
      </Link>
      <div className={"list_root"}>
        <Input
          value={filterValue}
          label={"Поиск"}
          onChange={(value) => setFilterValue(value)}
        />

        <Button
          onClick={() =>
            setFilters({
              logic: Logic.or,
              filters: [
                {
                  field: "firstName",
                  value: filterValue,
                  operator: Operator.contains,
                },
                {
                  field: "lastName",
                  value: filterValue,
                  operator: Operator.contains,
                },
                {
                  field: "department",
                  value: filterValue,
                  operator: Operator.contains,
                },
              ],
            })
          }
          caption={"Ок"}
        />
      </div>
      {persons && persons.length ? (
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
                  employeeDelete(person._id);
                }}
              />
                {props.setUser && <Button onClick={() => {
                    props.setUser(person.email, person._id)
                    props.onClose()
                }} caption={'Выбрать'}/>}
            </div>
          );
        })
      ) : persons ? (
        <div>Список пуст</div>
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
