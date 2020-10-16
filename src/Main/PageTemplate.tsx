import * as React from "react";
import { Link } from "react-router-dom";
import { BreadCrumbs } from "./BreadCrumbs";

export const PageTemplate = (props: any) => {
  return (
    <div>
      <div className="menu">
        <Link to={`/`} className="list__row-wrapper">
          Главная
        </Link>
        <Link to={`/persons/`} className="list__row-wrapper">
          Сотрудники
        </Link>
        <Link to={`/tasks/`} className="list__row-wrapper">
          Задачи
        </Link>
        <Link to={`/task/2`} className="list__row-wrapper">
          Задача
        </Link>
      </div>
      <div className="bread">
        <BreadCrumbs />
      </div>
      <div>{props.children}</div>
    </div>
  );
};
