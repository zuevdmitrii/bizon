import * as React from "react";
import { Link } from "react-router-dom";
import { useTasks } from "./useTasks";
import "./TaskList.less";
import { Button } from "./Components/Button";
import { Input } from "../Task/Input";
import { useState } from "react";
import { IDataProviderFilter, IFilter, Logic, Operator } from "../api/IFilter";
import { Modal } from "./Components/Modal";
import { DepartmentsModal } from "./DepartmentsModal";
import { taskGetByDepartment, taskGetByUser } from "../api/TaskApi";
import { PersonsList } from "./PersonsList";

interface ITasksListProps {
  setTask?: (title: string, id: string) => void;
}

export const TasksList = (props: ITasksListProps) => {
  const [filters, setFilters] = useState<IDataProviderFilter | null>();
  const [filterValue, setFilterValue] = useState("");
  const { tasks, setTasks } = useTasks(filters, {}, {});
  const [departmentSearch, setDepartmentSearch] = useState(false);
  const [assignedSearch, setAssignedSearch] = useState(false);

  const departmentFilter = async (value: string) => {
    const { data } = await taskGetByDepartment(value, undefined || filters);
    setTasks(data);
  };

  const personFilter = async (value: string) => {
    const { data } = await taskGetByUser(value, undefined || filters);
    setTasks(data);
  };

  const simpleFilter = async (filters: IFilter[]) => {
    const { data } = await taskGetByUser(undefined, filters);
    setTasks(data);
  };

  return (
    <div>
      <div className={"filterRoot"}>
        <div className={"list_root"}>
          <Input
            value={filterValue}
            placeholder={"Поиск"}
            onChange={(value) => setFilterValue(value)}
          />
          <div className={"buttonFilter"}>
            <Button
              onClick={() => {
                const currentFilters = [
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
                ];

                if (filters && filterValue) {
                  simpleFilter(currentFilters);
                } else {
                  filterValue
                    ? setFilters({
                        logic: Logic.or,
                        filters: currentFilters,
                      })
                    : setFilters(null);
                }
              }}
            caption={"Применить"}
            />
          </div>
        </div>
        <div className="personalizeFilters">
          <div className={"buttonFilter"}>
            <Button
              icon={"fa fa-filter"}
              caption={"Поиск по департаменту"}
              onClick={() => setDepartmentSearch(true)}
            />
          </div>

          <div className={"buttonFilter"}>
            <Button
              icon={"fa fa-filter"}
              caption={"Поиск по контакту"}
              onClick={() => setAssignedSearch(true)}
            />
          </div>
        </div>
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
                  {props.setTask && (
                    <Button
                      caption="Выбрать"
                      onClick={() => {
                        props.setTask(task.title, task._id);
                      }}
                    />
                  )}
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
      {departmentSearch && (
        <Modal onClose={() => setDepartmentSearch(false)}>
          <DepartmentsModal
            select={(value) => {
              departmentFilter(value);
            }}
          />
        </Modal>
      )}
      {assignedSearch && (
        <Modal onClose={() => setAssignedSearch(false)}>
          <PersonsList
            setUser={(id) => {
              personFilter(id);
            }}
            onClose={() => setAssignedSearch(false)}
          />
        </Modal>
      )}
    </div>
  );
};
