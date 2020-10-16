import * as React from "react";
import { Link } from "react-router-dom";

const pathes: IObjectAny = {
  tasks: [
    {
      title: "Главная",
      path: "/",
    },
    {
      title: "Задачи",
      path: "tasks",
    },
  ],
  task: [
    {
      title: "Главная",
      path: "/",
    },
    {
      title: "Задачи",
      path: "/tasks/",
    },
    {
      title: "Задача",
      path: "task",
    },
  ],
};
export const BreadCrumbs = () => {
  const page = window.location.pathname.split("/")[1] || "";
  const path = pathes[page];
  return (
    <div>
      {path
        ? path.map((item: IObjectAny) => {
            return item.path.includes("/") ? (
              <Link to={`${item.path}`} className="list__row-wrapper">
                {item.title}
              </Link>
            ) : (
              item.title
            );
          })
        : null}
    </div>
  );
};
