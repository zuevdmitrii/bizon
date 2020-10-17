import * as React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "./useTasks";
import "./Main.less";
import { Button } from "./Components/Button";
import { Input } from "../Task/Input";
import { useState } from "react";
import { IDataProviderFilter, Logic, Operator } from "../api/IFilter";

export const TasksList = () => {
  const [filters, setFilters] = useState<IDataProviderFilter>();
  const [filterValue, setFilterValue] = useState("");
  const tasks = useTasks(filters, {}, {});

  return (
    <div>
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
                  field: "title",
                  value: filterValue,
                  operator: Operator.contains,
                },
                {
                  field: "description",
                  value: filterValue,
                  operator: Operator.contains,
                },
                {
                  field: "status",
                  value: filterValue,
                  operator: Operator.contains,
                },
              ],
            })
          }
          caption={"Ок"}
        />
      </div>

      {tasks ? (
        <div>
          {tasks.map((task, index) => {
            return (
              <div className="list_root" key={index}>
                <Link to={`/task/${task._id}`} className="list__row-wrapper">
                  Открыть
                </Link>
                <div className={"listTitle"} key={index}>
                  {task.title}
                </div>
              </div>
            );
          })}
          <Link to={`/task/new/`} className="list__row-wrapper">
            <Button onClick={() => {}} caption={"Создать задачу"} />
          </Link>
        </div>
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
