import * as React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "./useTasks";
import { Button } from "./Components/Button";
import { Input } from "../Task/Input";
import { useState } from "react";
import "./TasksList.less";
import { IDataProviderFilter, Logic, Operator } from "../api/IFilter";

interface ITasksListProps {
  setTask?: (title: string, id: string) => void
}

export const TasksList = (props: ITasksListProps) => {
  const [filters, setFilters] = useState<IDataProviderFilter | null>();
  const [filterValue, setFilterValue] = useState("");
  const tasks = useTasks(filters, {}, {});

  return (
    <div className="listRoot">
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

      {tasks && tasks.length ? (
        <div>
          {tasks.map((task, index) => {
            return (
              <div className="list_root" key={index}>
                <Link to={`/task/${task._id}`} className="list__row-wrapper">
                  Открыть
                </Link>
                <div className={"listTitle"} key={index}>
                  {task.title}
                  {props.setTask && <Button 
                    caption="Выбрать"
                    onClick={() => {
                      props.setTask(task.title, task._id)
                    }}
                  />}
                </div>

              </div>
            );
          })}
          <Link to={`/task/new/`} className="list__row-wrapper">
            <Button onClick={() => {}} caption={"Создать задачу"} />
          </Link>
        </div>
      ) : tasks ? (
        <div>Список пуст</div>
      ) : (
        <div>Загрузка</div>
      )}
    </div>
  );
};
