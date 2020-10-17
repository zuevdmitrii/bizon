import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Components/Button";
import { Input } from "../Task/Input";
import { useState } from "react";
import "./TasksList.less";
import { ITask, useTasks } from "./useTasks";
import { IDataProviderFilter, IFilter, Logic, Operator } from "../api/IFilter";
import { Modal } from "./Components/Modal";
import { DepartmentsModal } from "./DepartmentsModal";
import { taskGetByDepartment, taskGetByUser } from "../api/TaskApi";
import { PersonsList } from "./PersonsList";
import { TasksTable } from "./TasksTable";

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
      <div className={"list_root"}>
        <div className={"task-list-title-row"}>
          <span className={"task-list-title"}>Задачи</span>
        </div>
        <div className={"task-list-action-row"}>
          <div className={'task-list-action-item'}>
            <Link to={`/task/new/`} className="list__row-wrapper">
              <Button onClick={() => {}} caption={"Создать задачу"} />
            </Link>
          </div>
          <div className={"task-list-action-item"}>
            <Input
              value={filterValue}
              placeholder={"Поиск по задачам..."}
              onChange={(value) => setFilterValue(value)}
            />
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
              caption={"Ок"}
            />
          </div>
        </div>
        <Button
          caption={"Поиск по департаменту"}
          onClick={() => setDepartmentSearch(true)}
        />
        <Button
          caption={"Поиск по контакту"}
          onClick={() => setAssignedSearch(true)}
        />
      </div>

      {tasks && tasks.length ? (
        <div>
          <TasksTable tasks={tasks} setTask={props.setTask} />
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
