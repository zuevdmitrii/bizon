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
    <>
      <div className={"filtersRoot"}>
        <div className={'findAll'}>
          <Input
            value={filterValue}
            placeholder={"Поиск"}
            onChange={(value) => setFilterValue(value)}
          />
          <div className={"filterButton"}>
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
              caption={"Применить"}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            history.push(`/person/new`);
          }}
          caption={"Создать нового сотрудника"}
        />
      </div>

      <div className="listRoot">
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
                const done = Math.random() * 10 
                const wip = Math.random() * 10
                const count = Math.floor(done) + Math.floor(wip)
                return (
                  <tr className={"personTr"} key={index}>
                    <td></td>
                    <td
                      className={"listTitle"}
                      onClick={() => {
                        history.push(`/person/${person._id}`);
                      }}
                    >
                      <div>
                        {" "}
                        {person.firstName + " "} {person.lastName}
                      </div>
                      <div className="subText"> {person.role} </div>
                      <div className="subText">{person.department}</div>
                    </td>
                    <td>{Math.floor(done)}</td>
                    <td>{Math.floor(wip)}</td>
                    <td>{count}</td>
                    <td width={"100px"}>
                      <Button
                        caption={"Удалить"}
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
    </>
  );
};
