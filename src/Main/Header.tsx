import * as React from "react";
import { Link } from "react-router-dom";
import { Exit } from "./Exit";
import "./Header.less";

export const Header = (props: any) => {
  const [modal, setModal] = React.useState(false);
  return (
    <div className={"Bizon__header"}>
      <Link to={`/`} className="list__row-wrapper">
        <img src="/resources/logo.jpg" />
      </Link>
      <Link to={`/tasks/`} className="header__menu">
        Задачи
      </Link>
      <Link to={`/persons/`} className="header__menu">
        Сотрудники
      </Link>
      <Link to={`/statistics/`} className="header__menu">
        Статистика
      </Link>

      <Exit
        logout={() => {
          window.location.reload();
        }}
      />
    </div>
  );
};
