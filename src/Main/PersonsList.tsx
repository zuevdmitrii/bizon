import * as React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { employeeDelete } from "../api/EmployeeApi";
import { IDataProviderFilter, Logic, Operator } from "../api/IFilter";
import { Input } from "../Task/Input";
import { Button } from "./Components/Button";
import "./PersonsList.less";
import { usePersons } from "./usePersons";


export const PersonsList = (props: {
  setUser?: (id: string, email?: string) => void;
  onClose?: () => void;
}) => {
  const [filters, setFilters] = useState<IDataProviderFilter | null>();
  const [filterValue, setFilterValue] = useState("");
  const persons = usePersons(filters, {}, {});
  const history = useHistory();

  return (
    <div className="listRoot">
      <Link to={`/person/new`} className="list__row-wrapper">
        Создать нового сотрудника
      </Link>
      <div className={"list_root"}>
        <Input
          value={filterValue}
          placeholder={"Поиск"}
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
        <table width={"100%"}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Выполнены</th>
              <th>В работе</th>
              <th>Количество</th>
              <th></th>
              {props.setUser && <th></th>}
            </tr>
          </thead>
          <tbody>
            {persons.map((person, index) => {
              return (
                <tr className={'personTr'} key={index}>
                  <td></td>
                  <td
                    className={"listTitle"}
                    onClick={() => {
                      console.log("there");
                      history.push(`/person/${person._id}`);
                    }}
                  >
                    <div>
                      {" "}
                      {person.firstName + " "} {person.lastName}
                    </div>
                    <div className='subText'> {person.role} </div>
                    <div className='subText'>{person.department}</div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Button
                      caption={"X"}
                      onClick={() => {
                        employeeDelete(person._id);
                      }}
                    />
                  </td>
                  {props.setUser && (
                    <td>
                      <Button
                        onClick={() => {
                          props.setUser(person._id, person.email);
                          props.onClose();
                        }}
                        caption={"Выбрать"}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : persons ? (
        <div>Список пуст</div>
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
