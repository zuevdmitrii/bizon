import * as React from "react";
import {Link} from "react-router-dom";

export const Header = (props: any) => {
    const [modal, setModal] = React.useState(false)
    return (
        <div className={'Bizon__header'}>
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
            <Link to={`/person/2`} className="list__row-wrapper">
                Сотрудник
            </Link>
        </div>
    );
};
